"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { 
  Users, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2,
  UserPlus,
  Shield,
  Clock,
  CheckCircle
} from "lucide-react";

// Mock user data
const mockUsers = [
  {
    id: "usr-001",
    name: "John Doe",
    email: "john.doe@company.com",
    role: "PS Consultant",
    status: "active",
    lastLogin: "2024-01-15T15:45:32Z",
    createdAt: "2023-08-15T10:00:00Z",
    jobsCompleted: 47,
    reportsGenerated: 23
  },
  {
    id: "usr-002",
    name: "Jane Smith",
    email: "jane.smith@company.com",
    role: "PS Consultant",
    status: "active",
    lastLogin: "2024-01-15T13:20:15Z",
    createdAt: "2023-06-10T14:30:00Z",
    jobsCompleted: 62,
    reportsGenerated: 31
  },
  {
    id: "usr-003",
    name: "Admin User",
    email: "admin@company.com",
    role: "Admin",
    status: "active",
    lastLogin: "2024-01-15T16:10:08Z",
    createdAt: "2023-01-01T09:00:00Z",
    jobsCompleted: 15,
    reportsGenerated: 8
  },
  {
    id: "usr-004",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "PS Manager",
    status: "active",
    lastLogin: "2024-01-14T17:35:42Z",
    createdAt: "2023-09-20T11:15:00Z",
    jobsCompleted: 28,
    reportsGenerated: 19
  },
  {
    id: "usr-005",
    name: "Mike Wilson",
    email: "mike.wilson@company.com",
    role: "PS Consultant",
    status: "inactive",
    lastLogin: "2023-12-20T14:22:18Z",
    createdAt: "2023-03-15T16:45:00Z",
    jobsCompleted: 34,
    reportsGenerated: 18
  }
];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState(mockUsers);

  console.log("UsersPage rendering, searchQuery:", searchQuery);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleBadge = (role: string) => {
    const colors = {
      "Admin": "bg-danger-100 text-danger-700",
      "PS Manager": "bg-primary-100 text-primary-700",
      "PS Consultant": "bg-accent-100 text-accent-700"
    };
    
    return (
      <Badge className={colors[role as keyof typeof colors] || "bg-gray-100 text-gray-700"}>
        {role}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-success-100 text-success-700">Active</Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-700">Inactive</Badge>
    );
  };

  const getStatusIcon = (status: string) => {
    return status === "active" ? (
      <CheckCircle className="h-4 w-4 text-success-500" />
    ) : (
      <Clock className="h-4 w-4 text-gray-400" />
    );
  };

  const handleEdit = (userId: string) => {
    console.log("Edit user:", userId);
  };

  const handleDelete = (userId: string) => {
    console.log("Delete user:", userId);
    setUsers(users.filter(u => u.id !== userId));
  };

  const formatDateTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const formatLastLogin = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInHours < 168) {
      const days = Math.floor(diffInHours / 24);
      return `${days}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getTotalUsers = () => users.length;
  const getActiveUsers = () => users.filter(u => u.status === "active").length;
  const getAdmins = () => users.filter(u => u.role === "Admin").length;
  const getConsultants = () => users.filter(u => u.role === "PS Consultant").length;

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900 flex items-center space-x-2">
              <Users className="h-8 w-8 text-primary-500" />
              <span>Users</span>
            </h1>
            <p className="text-gray-600 mt-1">
              Manage user accounts, roles, and access permissions.
            </p>
          </div>
          <Button className="bg-primary-500 hover:bg-primary-600">
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        {/* User Statistics */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
              <Users className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-700">{getTotalUsers()}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Users</CardTitle>
              <CheckCircle className="h-4 w-4 text-success-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success-600">{getActiveUsers()}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Consultants</CardTitle>
              <Shield className="h-4 w-4 text-accent-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent-600">{getConsultants()}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Administrators</CardTitle>
              <Shield className="h-4 w-4 text-danger-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-danger-600">{getAdmins()}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter by Role
          </Button>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Users ({filteredUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Jobs Completed</TableHead>
                    <TableHead>Reports Generated</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Member Since</TableHead>
                    <TableHead className="w-[70px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="h-24 text-center">
                        {searchQuery ? "No users found matching your search." : "No users yet."}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(user.status)}
                            <span>{user.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-blue-600 hover:underline">
                          {user.email}
                        </TableCell>
                        <TableCell>
                          {getRoleBadge(user.role)}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(user.status)}
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="font-medium">{user.jobsCompleted}</span>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="font-medium">{user.reportsGenerated}</span>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {formatLastLogin(user.lastLogin)}
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {formatDateTime(user.createdAt)}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleEdit(user.id)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => handleDelete(user.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete User
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
      </div>
    </AppShell>
  );
}