import { db } from '@/lib/db';
import { customers } from '@/lib/db/schema';
import { and, eq } from 'drizzle-orm';
import { CustomerCreateInput, CustomerUpdateInput } from '@/lib/validators/schemas/customer';

export class CustomerService {
  static async getAllCustomers() {
    return db.select().from(customers).all();
  }

  static async getCustomerById(id: string) {
    const [customer] = await db
      .select()
      .from(customers)
      .where(eq(customers.id, id))
      .limit(1);
    
    return customer || null;
  }

  static async createCustomer(data: CustomerCreateInput) {
    const [newCustomer] = await db
      .insert(customers)
      .values({
        id: crypto.randomUUID(),
        ...data,
      })
      .returning();
    
    return newCustomer;
  }

  static async updateCustomer(id: string, data: CustomerUpdateInput) {
    const [updatedCustomer] = await db
      .update(customers)
      .set(data)
      .where(eq(customers.id, id))
      .returning();
    
    return updatedCustomer || null;
  }

  static async deleteCustomer(id: string) {
    const [deletedCustomer] = await db
      .delete(customers)
      .where(eq(customers.id, id))
      .returning();
    
    return deletedCustomer || null;
  }

  static async customerExists(id: string) {
    const [customer] = await db
      .select({ id: customers.id })
      .from(customers)
      .where(eq(customers.id, id))
      .limit(1);
    
    return !!customer;
  }
}
