import { NextResponse } from 'next/server';
import { withApiHandler, apiResponseSuccess, apiResponseError } from '@/lib/api-utils';
import { CustomerService } from '@/lib/services/customer.service';
import { customerUpdateSchema } from '@/lib/validators/schemas/customer';

// GET /api/customers/[id] - Get a single customer
export const GET = withApiHandler(async (request, { params }) => {
  try {
    const { id } = params;
    
    const customer = await CustomerService.getCustomerById(id);
    if (!customer) {
      return apiResponseError('Customer not found', 404);
    }
    
    return apiResponseSuccess(customer);
  } catch (error) {
    console.error('Error fetching customer:', error);
    return apiResponseError('Failed to fetch customer', 500);
  }
});

// PUT /api/customers/[id] - Update a customer
export const PUT = withApiHandler(async (request, { params }) => {
  try {
    const { id } = params;
    
    // Check if customer exists
    const exists = await CustomerService.customerExists(id);
    if (!exists) {
      return apiResponseError('Customer not found', 404);
    }
    
    const body = await request.json();
    
    // Validate request body
    const validation = customerUpdateSchema.safeParse(body);
    if (!validation.success) {
      return apiResponseError(validation.error, 400);
    }

    // Update customer
    const updatedCustomer = await CustomerService.updateCustomer(id, validation.data);
    return apiResponseSuccess(updatedCustomer);
  } catch (error) {
    console.error('Error updating customer:', error);
    return apiResponseError('Failed to update customer', 500);
  }
});

// DELETE /api/customers/[id] - Delete a customer
export const DELETE = withApiHandler(async (request, { params }) => {
  try {
    const { id } = params;
    
    // Check if customer exists
    const exists = await CustomerService.customerExists(id);
    if (!exists) {
      return apiResponseError('Customer not found', 404);
    }
    
    // Delete customer
    await CustomerService.deleteCustomer(id);
    return apiResponseSuccess({ success: true });
  } catch (error) {
    console.error('Error deleting customer:', error);
    return apiResponseError('Failed to delete customer', 500);
  }
});
