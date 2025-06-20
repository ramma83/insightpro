import { v4 as uuidv4 } from 'uuid'; // Import UUID generator
import { db } from '@/lib/db';
import { customers } from '@/lib/db/schema';
import { withApiHandler, apiResponseSuccess, apiResponseError } from '@/lib/api-utils';
import { customerCreateSchema } from '@/lib/validators/customer';

// GET handler remains the same...
export const GET = withApiHandler(async (request) => {
  const allCustomers = await db.select().from(customers).all();
  return apiResponseSuccess(allCustomers);
});

// This function handles POST requests to /api/customers
export const POST = withApiHandler(async (request) => {
  const body = await request.json();
  
  // Validate the request body
  const validation = customerCreateSchema.safeParse(body);
  if (!validation.success) {
    return apiResponseError(validation.error, 400);
  }

  const newCustomerData = {
    id: uuidv4(), // Generate a unique ID
    ...validation.data,
  };

  // Insert into the database
  const [newCustomer] = await db
    .insert(customers)
    .values(newCustomerData)
    .returning();

  return apiResponseSuccess(newCustomer, 201); // 201 Created
});