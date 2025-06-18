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
  FileText, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Download, 
  Eye,
  Share,
  Plus,
  Calendar
} from "lucide-react";

// Mock reports data
const mockReports = [
  {
    id: "rpt-001",
    title: "Q4 Security Assessment - Acme Corp",
    customer: "Acme Corporation",
    device: "CP-MGT-01",
    type: "Check Point Health Check",
    tier: "Enhanced",
    format: "PDF",
    size: "2.4 MB",
    generatedAt: "2024-01-15T15:30:00Z",
    generatedBy: "John Doe",
    status: "generated",
    downloadCount: 3
  },
  {
    id: "rpt-002",
    title: "Firewall Configuration Review",
    customer: "Tech Solutions Inc",
    device: "PAN-FW-02",
    type: "Palo Alto Assessment",
    tier: "Elite",
    format: "Word",
    size: "1.8 MB",
    generatedAt: "2024-01-15T13:45:00Z",
    generatedBy: "Jane Smith",
    status: "generated",
    downloadCount: 1
  },
  {
    id: "rpt-003",
    title: "Security Health Summary",
    customer: "Global Enterprises",
    device: "FG-CLUSTER-01",
    type: "Fortinet Security Assessment",
    tier: "Essential",
    format: "HTML",
    size: "856 KB",
    generatedAt: "2024-01-14T11:20:00Z",
    generatedBy: "John Doe",
    status: "generated",
    downloadCount: 7
  },
  {
    id: "rpt-004",
    title: "Executive Summary Draft",
    customer: "Startup Co",
    device: "CP-GW-03",
    type: "Check Point Health Check",
    tier: "Enhanced",
    format: "PDF",
    size: "1.2 MB",
    generatedAt: "2024-01-13T16:10:00Z",
    generatedBy: "Jane Smith",
    status: "draft",
    downloadCount: 0
  }
];

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [reports, setReports] = useState(mockReports);

  console.log("ReportsPage rendering, searchQuery:", searchQuery);

  const filteredReports = reports.filter(report =>
    report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFormatBadge = (format: string) => {
    const colors = {
      "PDF": "bg-red-100 text-red-700",
      "Word": "bg-blue-100 text-blue-700",
      "HTML": "bg-green-100 text-green-700"
    };
    
    return (
      <Badge className={colors[format as keyof typeof colors] || "bg-gray-100 text-gray-700"}>
        {format}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    return status === "generated" ? (
      <Badge className="bg-success-100 text-success-700">Generated</Badge>
    ) : (
      <Badge className="bg-warning-100 text-warning-700">Draft</Badge>
    );
  };

  const handleDownload = (reportId: string) => {
    console.log("Download report:", reportId);
  };

  const handleView = (reportId: string) => {
    console.log("View report:", reportId);
  };

  const handleShare = (reportId: string) => {
    console.log("Share report:", reportId);
  };

  const formatDateTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getTotalReports = () => reports.length;
  const getDrafts = () => reports.filter(r => r.status === "draft").length;
  const getGenerated = () => reports.filter(r => r.status === "generated").length;
  const getTotalDownloads = () => reports.reduce((sum, r) => sum + r.downloadCount, 0);

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900 flex items-center space-x-2">
              <FileText className="h-8 w-8 text-primary-500" />
              <span>Reports</span>
            </h1>
            <p className="text-gray-600 mt-1">
              Generate, manage, and share professional security assessment reports.
            </p>
          </div>
          <Button className="bg-primary-500 hover:bg-primary-600">
            <Plus className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>

        {/* Report Statistics */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Reports</CardTitle>
              <FileText className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-700">{getTotalReports()}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Generated</CardTitle>
              <FileText className="h-4 w-4 text-success-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success-600">{getGenerated()}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Drafts</CardTitle>
              <FileText className="h-4 w-4 text-warning-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning-600">{getDrafts()}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Downloads</CardTitle>
              <Download className="h-4 w-4 text-primary-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary-600">{getTotalDownloads()}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
        </div>

        {/* Reports Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Reports ({filteredReports.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Title</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Generated</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Downloads</TableHead>
                    <TableHead className="w-[70px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="h-24 text-center">
                        {searchQuery ? "No reports found matching your search." : "No reports yet."}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredReports.map((report) => (
                      <TableRow key={report.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium max-w-xs">
                          <div className="truncate" title={report.title}>
                            {report.title}
                          </div>
                          <div className="text-xs text-gray-500">
                            {report.device} • {report.tier}
                          </div>
                        </TableCell>
                        <TableCell>{report.customer}</TableCell>
                        <TableCell>
                          <div className="text-sm">{report.type}</div>
                        </TableCell>
                        <TableCell>
                          {getFormatBadge(report.format)}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">{report.size}</TableCell>
                        <TableCell className="text-sm">
                          <div>{formatDateTime(report.generatedAt)}</div>
                          <div className="text-xs text-gray-500">by {report.generatedBy}</div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(report.status)}
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="text-sm font-medium">{report.downloadCount}</span>
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
                              <DropdownMenuItem onClick={() => handleView(report.id)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Report
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDownload(report.id)}>
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleShare(report.id)}>
                                <Share className="mr-2 h-4 w-4" />
                                Share Link
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