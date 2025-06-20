"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2, Eye, Database, Loader2, Plus } from "lucide-react";
import { CustomerDialog } from "./customer-dialog";
import { ConfirmDialog } from "@/components/common/confirm-dialog";

interface Customer {
  id: string;
  name: string;
  contactPerson: string | null;
  email: string | null;
  phone: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

interface CustomersTableProps {
  searchQuery: string;
}

export function CustomersTable({ searchQuery }: CustomersTableProps) {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  // Fetch customers from API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("/api/customers");
        if (!response.ok) {
          throw new Error("Failed to fetch customers");
        }
        const data = await response.json();
        setCustomers(data.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
        toast.error("Failed to load customers");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Filter customers based on search query
  const filteredCustomers = customers.filter(customer => {
    if (!searchQuery) return true;
    
    const search = searchQuery.toLowerCase();
    return (
      customer.name.toLowerCase().includes(search) ||
      (customer.contactPerson?.toLowerCase().includes(search) ?? false) ||
      (customer.email?.toLowerCase().includes(search) ?? false) ||
      (customer.phone?.toLowerCase().includes(search) ?? false)
    );
  });

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsDialogOpen(true);
  };

  const handleDelete = async (customerId: string) => {
    try {
      setIsDeleting(customerId);
      const response = await fetch(`/api/customers/${customerId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete customer");
      }

      // Update local state
      setCustomers(customers.filter(c => c.id !== customerId));
      toast.success("Customer deleted successfully");
    } catch (error) {
      console.error("Error deleting customer:", error);
      toast.error("Failed to delete customer");
    } finally {
      setIsDeleting(null);
    }
  };

  const handleViewDevices = (customerId: string) => {
    // TODO: Navigate to devices page filtered by customer
    console.log("View devices for customer:", customerId);
  };

  const handleSuccess = () => {
    // Refetch customers after successful operation
    const fetchCustomers = async () => {
      try {
        const response = await fetch("/api/customers");
        if (response.ok) {
          const data = await response.json();
          setCustomers(data.data);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
        toast.error("Failed to refresh customer list");
      }
    };

    fetchCustomers();
    setIsDialogOpen(false);
    setEditingCustomer(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold">Customers</CardTitle>
      </CardHeader>
      <CardHeader className="pt-0">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredCustomers.length} {filteredCustomers.length === 1 ? 'customer' : 'customers'} found
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    <div className="flex items-center justify-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading customers...
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredCustomers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    {searchQuery 
                      ? "No customers found matching your search."
                      : "No customers yet."}
                  </TableCell>
                </TableRow>
              ) : (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      {customer.name}
                    </TableCell>
                    <TableCell>{customer.contactPerson || '-'}</TableCell>
                    <TableCell>
                      {customer.email ? (
                        <a 
                          href={`mailto:${customer.email}`} 
                          className="text-blue-600 hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {customer.email}
                        </a>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell>
                      {customer.phone ? (
                        <a 
                          href={`tel:${customer.phone}`} 
                          className="hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {customer.phone}
                        </a>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(customer.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleEdit(customer)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <ConfirmDialog
                            title="Delete Customer"
                            description={`Are you sure you want to delete ${customer.name}? This action cannot be undone.`}
                            confirmText={isDeleting === customer.id ? "Deleting..." : "Delete"}
                            onConfirm={() => handleDelete(customer.id)}
                          >
                            <DropdownMenuItem 
                              className="text-red-600"
                              onSelect={(e) => e.preventDefault()}
                            >
                              {isDeleting === customer.id ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="mr-2 h-4 w-4" />
                              )}
                              Delete
                            </DropdownMenuItem>
                          </ConfirmDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      
      {/* Edit Customer Dialog */}
      <CustomerDialog 
        customer={editingCustomer || undefined}
        open={isDialogOpen && !!editingCustomer}
        onOpenChange={(open: boolean) => {
          if (!open) {
            setEditingCustomer(null);
            setIsDialogOpen(false);
          } else {
            setIsDialogOpen(true);
          }
        }}
        onSuccess={handleSuccess}
      />
    </Card>
  );
}