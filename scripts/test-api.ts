#!/usr/bin/env ts-node

import inquirer from 'inquirer';
import axios, { AxiosError } from 'axios';
import chalk from 'chalk';

// Configuration
const API_BASE_URL = 'http://localhost:3002/api';
let authToken: string | null = null;

// Helper functions
const printDivider = () => console.log('\n' + '-'.repeat(60) + '\n');

const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    console.error(chalk.red(`Error: ${axiosError.response?.status} - ${axiosError.message}`));
    if (axiosError.response?.data) {
      console.error('Response:', axiosError.response.data);
    }
  } else {
    console.error(chalk.red('Error:'), error);
  }
};

// Phase 1: Authentication
async function testAuthentication() {
  console.log(chalk.blue.bold('\n🔐 Testing Authentication'));
  
  // This is a placeholder for actual authentication tests
  // TODO: Implement once authentication is set up
  console.log(chalk.yellow('Authentication tests will be implemented in Phase 5'));
  
  await promptForReturn();
}

// Phase 2: Customer Management

async function listCustomers(showMenu = false) {
  try {
    console.log(chalk.blue.bold('📋 Listing all customers'));
    const response = await axios.get(`${API_BASE_URL}/customers`);
    const customers = response.data.data;
    
    if (customers.length === 0) {
      console.log(chalk.yellow('No customers found.'));
      return [];
    }
    
    console.log('\n' + chalk.underline('ID'.padEnd(38)) + '  ' + chalk.underline('Name'.padEnd(20)) + '  ' + chalk.underline('Contact'));
    customers.forEach((customer: any, index: number) => {
      console.log(`${index + 1}. ${customer.id}  ${customer.name.padEnd(20)}  ${customer.contactPerson || 'N/A'}`);
    });
    
    return customers;
  } catch (error) {
    handleError(error);
    return [];
  }
}

async function selectCustomer(promptMessage = 'Select a customer:'): Promise<string | null> {
  const customers = await listCustomers();
  if (customers.length === 0) {
    await promptForReturn();
    return null;
  }

  const { selectedIndex } = await inquirer.prompt([{
    type: 'input',
    name: 'selectedIndex',
    message: promptMessage,
    validate: (input: string) => {
      const num = parseInt(input);
      return (!isNaN(num) && num > 0 && num <= customers.length) || `Please enter a number between 1 and ${customers.length}`;
    }
  }]);

  return customers[parseInt(selectedIndex) - 1].id;
}

async function createCustomer() {
  try {
    console.log(chalk.blue.bold('➕ Creating a new customer'));
    
    interface CustomerInput {
      name: string;
      contactPerson: string;
      email: string;
      phone: string;
      notes: string;
    }

    const customerData = await inquirer.prompt<CustomerInput>([
      { 
        type: 'input',
        name: 'name', 
        message: 'Company name:' 
      },
      { 
        type: 'input',
        name: 'contactPerson', 
        message: 'Contact person:' 
      },
      { 
        type: 'input',
        name: 'email', 
        message: 'Email:', 
        validate: (input: string) => 
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input) || 'Please enter a valid email' 
      },
      { 
        type: 'input',
        name: 'phone', 
        message: 'Phone:' 
      },
      { 
        type: 'input',
        name: 'notes', 
        message: 'Notes:' 
      }
    ]);

    const response = await axios.post(`${API_BASE_URL}/customers`, customerData);
    currentCustomerId = response.data.data.id;
    console.log(chalk.green('✅ Customer created successfully!'));
    console.log(response.data.data);
  } catch (error) {
    handleError(error);
  }
}

async function updateCustomer() {
  try {
    const customerId = await selectCustomer('Enter the number of the customer to update:');
    if (!customerId) return;
    
    // Get current customer data
    const currentCustomer = (await axios.get(`${API_BASE_URL}/customers/${customerId}`)).data.data;
    
    const customerData = await inquirer.prompt([
      { 
        type: 'input',
        name: 'name', 
        message: 'Company name:',
        default: currentCustomer.name
      },
      { 
        type: 'input',
        name: 'contactPerson', 
        message: 'Contact person:',
        default: currentCustomer.contactPerson || ''
      },
      { 
        type: 'input',
        name: 'email', 
        message: 'Email:',
        default: currentCustomer.email || '',
        validate: (input: string) => 
          !input || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input) || 'Please enter a valid email'
      },
      { 
        type: 'input',
        name: 'phone', 
        message: 'Phone:',
        default: currentCustomer.phone || ''
      },
      { 
        type: 'input',
        name: 'notes', 
        message: 'Notes:',
        default: currentCustomer.notes || ''
      }
    ]);

    const response = await axios.put(
      `${API_BASE_URL}/customers/${customerId}`, 
      customerData
    );
    
    console.log(chalk.green('✅ Customer updated successfully!'));
    console.log(response.data.data);
  } catch (error) {
    handleError(error);
  } finally {
    await promptForReturn();
  }
}

async function deleteCustomer() {
  try {
    const customerId = await selectCustomer('Enter the number of the customer to delete:');
    if (!customerId) return;
    
    // Get customer details for confirmation
    const customer = (await axios.get(`${API_BASE_URL}/customers/${customerId}`)).data.data;
    
    console.log('\n' + chalk.red('WARNING: This action cannot be undone!'));
    console.log(`You are about to delete: ${chalk.bold(customer.name)} (${customer.email || 'no email'})`);
    
    const { confirm } = await inquirer.prompt([{
      type: 'confirm',
      name: 'confirm',
      message: 'Are you sure you want to delete this customer?',
      default: false
    }]);

    if (!confirm) {
      console.log(chalk.yellow('Deletion cancelled.'));
      return;
    }

    await axios.delete(`${API_BASE_URL}/customers/${customerId}`);
    console.log(chalk.green('✅ Customer deleted successfully!'));
  } catch (error) {
    handleError(error);
  } finally {
    await promptForReturn();
  }
}

// Phase 3: Device Management (Placeholder)
async function testDeviceManagement() {
  console.log(chalk.blue.bold('\n📱 Device Management'));
  console.log(chalk.yellow('Device management tests will be implemented in Phase 3'));
  await promptForReturn();
}

// Phase 4: Health Checks (Placeholder)
async function testHealthChecks() {
  console.log(chalk.blue.bold('\n🩺 Health Checks'));
  console.log(chalk.yellow('Health check tests will be implemented in Phase 4'));
  await promptForReturn();
}

// Helper function to wait for user input
async function promptForReturn() {
  await inquirer.prompt([
    { 
      type: 'input', 
      name: 'continue', 
      message: 'Press Enter to continue...' 
    }
  ]);
}

// Main menu
async function showMainMenu() {
  while (true) {
    printDivider();
    console.log(chalk.cyan.bold('🚀 InsightPro API Tester'));
    
    const { action } = await inquirer.prompt([{
      type: 'list',
      name: 'action',
      message: 'Select an action (use arrow keys or type number):',
      choices: [
        { name: '1. 🔐 Test Authentication', value: 'auth' },
        new inquirer.Separator('─── Customer Management ───'),
        { name: '2. 👥 List all customers', value: 'list' },
        { name: '3. ➕ Create new customer', value: 'create' },
        { name: '4. ✏️  Update customer', value: 'update' },
        { name: '5. 🗑️  Delete customer', value: 'delete' },
        new inquirer.Separator('─── Other Options ───'),
        { name: '6. 📱 Test Device Management', value: 'devices' },
        { name: '7. 💊 Test Health Checks', value: 'health' },
        new inquirer.Separator(),
        { name: '0. ❌ Exit', value: 'exit' }
      ],
      pageSize: 20
    }]);

    switch (action) {
      case 'auth':
        await testAuthentication();
        await promptForReturn();
        break;
      case 'list':
        await listCustomers(true);
        await promptForReturn();
        break;
      case 'create':
        await createCustomer();
        await promptForReturn();
        break;
      case 'update':
        await updateCustomer();
        break;
      case 'delete':
        await deleteCustomer();
        break;
      case 'devices':
        await testDeviceManagement();
        await promptForReturn();
        break;
      case 'health':
        await testHealthChecks();
        await promptForReturn();
        break;
      case 'exit':
        console.log(chalk.blue('👋 Goodbye!'));
        process.exit(0);
    }
  }
}

// Function to check if API server is running
async function checkServerConnection(retries = 3, delay = 2000): Promise<boolean> {
  for (let i = 0; i < retries; i++) {
    try {
      await axios.get(`${API_BASE_URL}/customers`);
      return true;
    } catch (error: any) {
      // If we get a 200 or 404 with the customers endpoint, the server is running
      if (error.response && (error.response.status === 200 || error.response.status === 404)) {
        return true;
      }
      
      if (i < retries - 1) {
        console.log(chalk.yellow(`⏳ Waiting for API server to start... (${i + 1}/${retries})`));
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  return false;
}

// Start the application
async function startApp() {
  console.clear();
  console.log(chalk.cyan.bold('🔍 Starting InsightPro API Tester...'));
  
  try {
    console.log(chalk.blue('🔄 Checking API server connection...'));
    const isServerRunning = await checkServerConnection();
    
    if (!isServerRunning) {
      console.error(chalk.red('❌ Could not connect to the API server. Please make sure it\'s running.'));
      console.log(chalk.yellow('\nTo start the development server, run:'));
      console.log(chalk.cyan('  npm run dev\n'));
      process.exit(1);
    }
    
    console.log(chalk.green('✅ Connected to API server successfully!\n'));
    await showMainMenu();
    
  } catch (error) {
    console.error(chalk.red('\n❌ An unexpected error occurred:'));
    console.error(error);
    process.exit(1);
  }
}

// Start the application
startApp().catch(console.error);
