"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { MoreHorizontal, Edit, Trash2, Eye, Database } from "lucide-react";

// Mock data - in a real app this would come from an API
const mockCustomers = [
  {
    id: "1",
    name: "Acme Corporation",
    contactPerson: "John Smith",
    email: "john.smith@acme.com",
    phone: "+1 (555) 123-4567",
    devices: 12,
    lastActivity: "2024-01-15",
    status: "active"
  },
  {
    id: "2", 
    name: "Tech Solutions Inc",
    contactPerson: "Sarah Johnson",
    email: "sarah.j@techsolutions.com",
    phone: "+1 (555) 987-6543",
    devices: 8,
    lastActivity: "2024-01-10",
    status: "active"
  },
  {
    id: "3",
    name: "Global Enterprises",
    contactPerson: "Michael Brown",
    email: "m.brown@globalent.com", 
    phone: "+1 (555) 456-7890",
    devices: 24,
    lastActivity: "2023-12-28",
    status: "inactive"
  },
  {
    id: "4",
    name: "Startup Co",
    contactPerson: "Emma Wilson",
    email: "emma@startup.co",
    phone: "+1 (555) 321-0987",
    devices: 3,
    lastActivity: "2024-01-12",
    status: "active"
  }
];

interface CustomersTableProps {
  searchQuery: string;
}

export function CustomersTable({ searchQuery }: CustomersTableProps) {
  const [customers, setCustomers] = useState(mockCustomers);

  console.log("CustomersTable rendering with search:", searchQuery);

  // Filter customers based on search query
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (customerId: string) => {
    console.log("Edit customer:", customerId);
    // TODO: Implement edit functionality
  };

  const handleDelete = (customerId: string) => {
    console.log("Delete customer:", customerId);
    // TODO: Implement delete functionality with confirmation
    setCustomers(customers.filter(c => c.id !== customerId));
  };

  const handleViewDevices = (customerId: string) => {
    console.log("View devices for customer:", customerId);
    // TODO: Navigate to devices page filtered by customer
  };

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-success-100 text-success-700">Active</Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-700">Inactive</Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>All Customers ({filteredCustomers.length})</span>
          <Badge variant="outline" className="text-sm">
            {customers.filter(c => c.status === "active").length} Active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Devices</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[70px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    {searchQuery ? "No customers found matching your search." : "No customers yet."}
                  </TableCell>
                </TableRow>
              ) : (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      {customer.name}
                    </TableCell>
                    <TableCell>{customer.contactPerson}</TableCell>
                    <TableCell className="text-blue-600 hover:underline">
                      {customer.email}
                    </TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Database className="h-4 w-4 text-gray-400" />
                        <span>{customer.devices}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-500">
                      {new Date(customer.lastActivity).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(customer.status)}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleViewDevices(customer.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewDevices(customer.id)}>
                            <Database className="mr-2 h-4 w-4" />
                            Manage Devices
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleEdit(customer.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDelete(customer.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
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
    </Card>
  );
}