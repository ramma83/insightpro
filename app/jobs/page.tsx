"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  Play, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Pause, 
  StopCircle, 
  Eye,
  Clock,
  CheckCircle,
  AlertTriangle,
  RefreshCw
} from "lucide-react";

// Mock job data
const mockJobs = [
  {
    id: "job-001",
    customer: "Acme Corporation",
    device: "CP-MGT-01",
    type: "Check Point Health Check",
    tier: "Enhanced",
    status: "running",
    progress: 67,
    startedAt: "2024-01-15T14:30:00Z",
    estimatedCompletion: "2024-01-15T16:00:00Z",
    currentStep: "Policy Analysis"
  },
  {
    id: "job-002",
    customer: "Tech Solutions Inc",
    device: "PAN-FW-02", 
    type: "Palo Alto Assessment",
    tier: "Elite",
    status: "completed",
    progress: 100,
    startedAt: "2024-01-15T10:00:00Z",
    completedAt: "2024-01-15T13:30:00Z",
    findings: { critical: 3, warning: 8, info: 15 }
  },
  {
    id: "job-003",
    customer: "Global Enterprises",
    device: "FG-CLUSTER-01",
    type: "Fortinet Security Assessment", 
    tier: "Essential",
    status: "pending",
    progress: 0,
    scheduledFor: "2024-01-16T09:00:00Z"
  },
  {
    id: "job-004",
    customer: "Startup Co",
    device: "CP-GW-03",
    type: "Check Point Health Check",
    tier: "Enhanced", 
    status: "failed",
    progress: 45,
    startedAt: "2024-01-14T16:00:00Z",
    errorMessage: "Connection timeout to device"
  }
];

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [jobs, setJobs] = useState(mockJobs);

  console.log("JobsPage rendering, searchQuery:", searchQuery);

  const filteredJobs = jobs.filter(job =>
    job.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.device.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-success-500" />;
      case "running":
        return <RefreshCw className="h-4 w-4 text-primary-500 animate-spin" />;
      case "pending":
        return <Clock className="h-4 w-4 text-warning-500" />;
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-danger-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "bg-success-100 text-success-700",
      running: "bg-primary-100 text-primary-700",
      pending: "bg-warning-100 text-warning-700",
      failed: "bg-danger-100 text-danger-700"
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants] || "bg-gray-100 text-gray-700"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleViewResults = (jobId: string) => {
    console.log("View results for job:", jobId);
  };

  const handlePauseJob = (jobId: string) => {
    console.log("Pause job:", jobId);
  };

  const handleStopJob = (jobId: string) => {
    console.log("Stop job:", jobId);
  };

  const formatDateTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getRunningJobsCount = () => jobs.filter(j => j.status === "running").length;
  const getPendingJobsCount = () => jobs.filter(j => j.status === "pending").length;
  const getCompletedJobsCount = () => jobs.filter(j => j.status === "completed").length;

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900 flex items-center space-x-2">
              <Play className="h-8 w-8 text-primary-500" />
              <span>Jobs</span>
            </h1>
            <p className="text-gray-600 mt-1">
              Monitor and manage health check jobs and their execution status.
            </p>
          </div>
        </div>

        {/* Job Statistics */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Running</CardTitle>
              <RefreshCw className="h-4 w-4 text-primary-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary-600">{getRunningJobsCount()}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
              <Clock className="h-4 w-4 text-warning-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning-600">{getPendingJobsCount()}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-success-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success-600">{getCompletedJobsCount()}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Jobs</CardTitle>
              <Play className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-700">{jobs.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Jobs Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Jobs ({filteredJobs.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Device</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Started</TableHead>
                    <TableHead className="w-[70px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredJobs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        {searchQuery ? "No jobs found matching your search." : "No jobs yet."}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredJobs.map((job) => (
                      <TableRow key={job.id} className="hover:bg-gray-50">
                        <TableCell className="font-mono text-sm">{job.id}</TableCell>
                        <TableCell className="font-medium">{job.customer}</TableCell>
                        <TableCell>{job.device}</TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm">{job.type}</p>
                            <Badge variant="outline" className="text-xs">
                              {job.tier}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(job.status)}
                            {getStatusBadge(job.status)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span>{job.progress}%</span>
                              {job.currentStep && (
                                <span className="text-gray-500">{job.currentStep}</span>
                              )}
                            </div>
                            <Progress value={job.progress} className="w-20" />
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {job.startedAt ? formatDateTime(job.startedAt) : 
                           job.scheduledFor ? `Scheduled: ${formatDateTime(job.scheduledFor)}` : "-"}
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
                              <DropdownMenuItem onClick={() => handleViewResults(job.id)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              {job.status === "running" && (
                                <>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => handlePauseJob(job.id)}>
                                    <Pause className="mr-2 h-4 w-4" />
                                    Pause
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    className="text-red-600"
                                    onClick={() => handleStopJob(job.id)}
                                  >
                                    <StopCircle className="mr-2 h-4 w-4" />
                                    Stop
                                  </DropdownMenuItem>
                                </>
                              )}
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