import { NextResponse } from 'next/server';
import { withApiHandler, apiResponseSuccess, apiResponseError } from '@/lib/api-utils';
import { CustomerService } from '@/lib/services/customer.service';
import { customerCreateSchema } from '@/lib/validators/schemas/customer';

// GET /api/customers - Get all customers
export const GET = withApiHandler(async () => {
  try {
    const customers = await CustomerService.getAllCustomers();
    return apiResponseSuccess(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    return apiResponseError('Failed to fetch customers', 500);
  }
});

// POST /api/customers - Create a new customer
export const POST = withApiHandler(async (request) => {
  try {
    const body = await request.json();
    
    // Validate request body
    const validation = customerCreateSchema.safeParse(body);
    if (!validation.success) {
      return apiResponseError(validation.error, 400);
    }

    // Create customer
    const newCustomer = await CustomerService.createCustomer(validation.data);
    return apiResponseSuccess(newCustomer, 201);
  } catch (error) {
    console.error('Error creating customer:', error);
    return apiResponseError('Failed to create customer', 500);
  }
});