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
import { MoreHorizontal, Edit, Trash2, Play, Shield, Wifi, WifiOff } from "lucide-react";

// Mock data for devices
const mockDevices = [
  {
    id: "1",
    name: "CP-MGT-01",
    customer: "Acme Corporation",
    vendor: "Check Point",
    systemType: "Management Server",
    ipAddress: "192.168.1.100",
    connectionStatus: "connected",
    lastChecked: "2024-01-15T10:30:00Z",
    version: "R81.20",
    notes: "Primary management server"
  },
  {
    id: "2", 
    name: "PAN-FW-02",
    customer: "Tech Solutions Inc",
    vendor: "Palo Alto Networks",
    systemType: "Firewall",
    ipAddress: "10.0.1.50",
    connectionStatus: "connected",
    lastChecked: "2024-01-14T15:45:00Z",
    version: "10.2.3",
    notes: "Main perimeter firewall"
  },
  {
    id: "3",
    name: "FG-CLUSTER-01",
    customer: "Global Enterprises",
    vendor: "Fortinet",
    systemType: "Firewall Cluster",
    ipAddress: "172.16.0.10",
    connectionStatus: "disconnected",
    lastChecked: "2024-01-10T09:15:00Z",
    version: "7.4.1",
    notes: "HA cluster configuration"
  },
  {
    id: "4",
    name: "CP-GW-03",
    customer: "Acme Corporation", 
    vendor: "Check Point",
    systemType: "Security Gateway",
    ipAddress: "192.168.1.101",
    connectionStatus: "connected",
    lastChecked: "2024-01-15T11:00:00Z",
    version: "R81.20",
    notes: "Secondary gateway"
  }
];

interface DevicesTableProps {
  searchQuery: string;
}

export function DevicesTable({ searchQuery }: DevicesTableProps) {
  const [devices, setDevices] = useState(mockDevices);

  console.log("DevicesTable rendering with search:", searchQuery);

  // Filter devices based on search query
  const filteredDevices = devices.filter(device =>
    device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.ipAddress.includes(searchQuery)
  );

  const handleEdit = (deviceId: string) => {
    console.log("Edit device:", deviceId);
    // TODO: Implement edit functionality
  };

  const handleDelete = (deviceId: string) => {
    console.log("Delete device:", deviceId);
    // TODO: Implement delete functionality with confirmation
    setDevices(devices.filter(d => d.id !== deviceId));
  };

  const handleRunHealthCheck = (deviceId: string) => {
    console.log("Run health check for device:", deviceId);
    // TODO: Navigate to health check configuration
  };

  const getVendorBadge = (vendor: string) => {
    const colors = {
      "Check Point": "bg-blue-100 text-blue-700",
      "Palo Alto Networks": "bg-orange-100 text-orange-700", 
      "Fortinet": "bg-red-100 text-red-700"
    };
    
    return (
      <Badge className={colors[vendor as keyof typeof colors] || "bg-gray-100 text-gray-700"}>
        {vendor}
      </Badge>
    );
  };

  const getConnectionStatus = (status: string) => {
    if (status === "connected") {
      return (
        <div className="flex items-center space-x-1 text-success-600">
          <Wifi className="h-4 w-4" />
          <span className="text-sm">Connected</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center space-x-1 text-danger-600">
          <WifiOff className="h-4 w-4" />
          <span className="text-sm">Disconnected</span>
        </div>
      );
    }
  };

  const formatLastChecked = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>All Devices ({filteredDevices.length})</span>
          <Badge variant="outline" className="text-sm">
            {devices.filter(d => d.connectionStatus === "connected").length} Connected
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device Name</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>System Type</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Last Checked</TableHead>
                <TableHead className="w-[70px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDevices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center">
                    {searchQuery ? "No devices found matching your search." : "No devices yet."}
                  </TableCell>
                </TableRow>
              ) : (
                filteredDevices.map((device) => (
                  <TableRow key={device.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      {device.name}
                    </TableCell>
                    <TableCell>{device.customer}</TableCell>
                    <TableCell>
                      {getVendorBadge(device.vendor)}
                    </TableCell>
                    <TableCell>{device.systemType}</TableCell>
                    <TableCell className="font-mono text-sm">
                      {device.ipAddress}
                    </TableCell>
                    <TableCell>
                      {getConnectionStatus(device.connectionStatus)}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {device.version}
                    </TableCell>
                    <TableCell className="text-gray-500">
                      {formatLastChecked(device.lastChecked)}
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
                          <DropdownMenuItem onClick={() => handleRunHealthCheck(device.id)}>
                            <Shield className="mr-2 h-4 w-4" />
                            Run Health Check
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleRunHealthCheck(device.id)}>
                            <Play className="mr-2 h-4 w-4" />
                            Test Connection
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleEdit(device.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDelete(device.id)}
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