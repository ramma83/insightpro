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
  Activity, 
  Search, 
  Filter, 
  Calendar,
  User,
  Database,
  FileText,
  LogIn,
  LogOut,
  UserPlus,
  Settings,
  Shield
} from "lucide-react";

// Mock audit log data
const mockAuditLogs = [
  {
    id: "log-001",
    timestamp: "2024-01-15T15:45:32Z",
    user: "john.doe@company.com",
    action: "login",
    resource: "System",
    resourceId: null,
    details: "Successful login from 192.168.1.100",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    status: "success"
  },
  {
    id: "log-002",
    timestamp: "2024-01-15T15:30:15Z",
    user: "jane.smith@company.com",
    action: "report_generated",
    resource: "Report",
    resourceId: "rpt-001",
    details: "Generated PDF report for Acme Corporation health check",
    ipAddress: "192.168.1.105",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    status: "success"
  },
  {
    id: "log-003",
    timestamp: "2024-01-15T14:22:08Z",
    user: "john.doe@company.com",
    action: "health_check_started",
    resource: "Job",
    resourceId: "job-001",
    details: "Started Enhanced health check for device CP-MGT-01",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    status: "success"
  },
  {
    id: "log-004",
    timestamp: "2024-01-15T13:15:42Z",
    user: "admin@company.com",
    action: "user_created",
    resource: "User",
    resourceId: "usr-005",
    details: "Created new user account for sarah.johnson@company.com",
    ipAddress: "192.168.1.90",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    status: "success"
  },
  {
    id: "log-005",
    timestamp: "2024-01-15T12:45:18Z",
    user: "jane.smith@company.com",
    action: "device_added",
    resource: "Device",
    resourceId: "dev-007",
    details: "Added new Fortinet device FG-CLUSTER-02 for Global Enterprises",
    ipAddress: "192.168.1.105",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    status: "success"
  },
  {
    id: "log-006",
    timestamp: "2024-01-15T11:30:55Z",
    user: "john.doe@company.com",
    action: "login_failed",
    resource: "System",
    resourceId: null,
    details: "Failed login attempt - invalid password",
    ipAddress: "203.0.113.15",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    status: "failed"
  }
];

export default function AuditPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [logs, setLogs] = useState(mockAuditLogs);

  console.log("AuditPage rendering, searchQuery:", searchQuery);

  const filteredLogs = logs.filter(log =>
    log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.ipAddress.includes(searchQuery)
  );

  const getActionIcon = (action: string) => {
    switch (action) {
      case "login":
        return <LogIn className="h-4 w-4 text-success-500" />;
      case "logout":
        return <LogOut className="h-4 w-4 text-gray-500" />;
      case "login_failed":
        return <LogIn className="h-4 w-4 text-danger-500" />;
      case "user_created":
      case "user_updated":
      case "user_deleted":
        return <UserPlus className="h-4 w-4 text-primary-500" />;
      case "device_added":
      case "device_updated":
      case "device_deleted":
        return <Database className="h-4 w-4 text-accent-500" />;
      case "health_check_started":
      case "health_check_completed":
        return <Shield className="h-4 w-4 text-warning-500" />;
      case "report_generated":
      case "report_downloaded":
        return <FileText className="h-4 w-4 text-blue-500" />;
      case "settings_updated":
        return <Settings className="h-4 w-4 text-gray-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    return status === "success" ? (
      <Badge className="bg-success-100 text-success-700">Success</Badge>
    ) : (
      <Badge className="bg-danger-100 text-danger-700">Failed</Badge>
    );
  };

  const formatDateTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatAction = (action: string) => {
    return action.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getTotalLogs = () => logs.length;
  const getSuccessfulActions = () => logs.filter(l => l.status === "success").length;
  const getFailedActions = () => logs.filter(l => l.status === "failed").length;
  const getUniqueUsers = () => new Set(logs.map(l => l.user)).size;

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900 flex items-center space-x-2">
              <Activity className="h-8 w-8 text-primary-500" />
              <span>Audit Logs</span>
            </h1>
            <p className="text-gray-600 mt-1">
              Monitor and track all user activities and system events.
            </p>
          </div>
        </div>

        {/* Audit Statistics */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Events</CardTitle>
              <Activity className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-700">{getTotalLogs()}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Successful</CardTitle>
              <Activity className="h-4 w-4 text-success-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success-600">{getSuccessfulActions()}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Failed</CardTitle>
              <Activity className="h-4 w-4 text-danger-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-danger-600">{getFailedActions()}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Users</CardTitle>
              <User className="h-4 w-4 text-primary-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary-600">{getUniqueUsers()}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter Actions
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Button variant="outline" size="sm">
            <User className="mr-2 h-4 w-4" />
            Filter Users
          </Button>
        </div>

        {/* Audit Logs Table */}
        <Card>
          <CardHeader>
            <CardTitle>Audit Trail ({filteredLogs.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Resource</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        {searchQuery ? "No audit logs found matching your search." : "No audit logs yet."}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLogs.map((log) => (
                      <TableRow key={log.id} className="hover:bg-gray-50">
                        <TableCell className="text-sm font-mono">
                          {formatDateTime(log.timestamp)}
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <span className="truncate max-w-xs" title={log.user}>
                              {log.user}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getActionIcon(log.action)}
                            <span className="text-sm">{formatAction(log.action)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {log.resource}
                            {log.resourceId && (
                              <div className="text-xs text-gray-500 font-mono">
                                {log.resourceId}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="max-w-md">
                          <div className="truncate text-sm" title={log.details}>
                            {log.details}
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {log.ipAddress}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(log.status)}
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