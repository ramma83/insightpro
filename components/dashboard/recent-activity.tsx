"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Activity,
  CheckCircle,
  AlertTriangle,
  Clock,
  FileText,
  Play,
  ArrowRight
} from "lucide-react";

const recentJobs = [
  {
    id: "1",
    customer: "Acme Corp",
    device: "CP-MGT-01",
    type: "Check Point Health Check",
    tier: "Enhanced",
    status: "completed",
    completedAt: "2 hours ago",
    findings: { critical: 2, warning: 5, info: 12 }
  },
  {
    id: "2", 
    customer: "Tech Solutions Inc",
    device: "PAN-FW-02",
    type: "Palo Alto Assessment",
    tier: "Elite",
    status: "running",
    startedAt: "15 minutes ago",
    progress: 65
  },
  {
    id: "3",
    customer: "Global Enterprises",
    device: "FG-CLUSTER-01",
    type: "Fortinet Health Check",
    tier: "Essential",
    status: "pending",
    scheduledFor: "Tomorrow 9:00 AM"
  },
];

const recentReports = [
  {
    id: "1",
    customer: "Acme Corp",
    title: "Q4 Security Assessment",
    generatedAt: "1 hour ago",
    format: "PDF",
    size: "2.4 MB"
  },
  {
    id: "2",
    customer: "Tech Solutions Inc", 
    title: "Firewall Configuration Review",
    generatedAt: "3 hours ago",
    format: "Word",
    size: "1.8 MB"
  },
];

export function RecentActivity() {
  console.log("RecentActivity rendering");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-success-500" />;
      case "running":
        return <Play className="h-4 w-4 text-primary-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-warning-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "bg-success-100 text-success-700",
      running: "bg-primary-100 text-primary-700", 
      pending: "bg-warning-100 text-warning-700"
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants] || "bg-gray-100 text-gray-700"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Recent Jobs */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-primary-500" />
            <span>Recent Health Checks</span>
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-primary-600 hover:text-primary-700">
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentJobs.map((job) => (
            <div key={job.id} className="flex items-start space-x-3 rounded-lg border border-gray-100 p-3 hover:bg-gray-50 transition-colors">
              <div className="mt-1">
                {getStatusIcon(job.status)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {job.customer}
                  </p>
                  {getStatusBadge(job.status)}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {job.device} • {job.type} ({job.tier})
                </p>
                {job.status === "completed" && job.findings && (
                  <div className="flex items-center space-x-3 mt-2">
                    <span className="text-xs text-danger-600">
                      {job.findings.critical} Critical
                    </span>
                    <span className="text-xs text-warning-600">
                      {job.findings.warning} Warning
                    </span>
                    <span className="text-xs text-gray-500">
                      {job.findings.info} Info
                    </span>
                  </div>
                )}
                {job.status === "running" && job.progress && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Progress</span>
                      <span className="text-gray-700">{job.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                      <div 
                        className="bg-primary-500 h-1.5 rounded-full transition-all duration-300" 
                        style={{ width: `${job.progress}%` }}
                      />
                    </div>
                  </div>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  {job.completedAt || job.startedAt || job.scheduledFor}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary-500" />
            <span>Recent Reports</span>
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-primary-600 hover:text-primary-700">
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentReports.map((report) => (
            <div key={report.id} className="flex items-center space-x-3 rounded-lg border border-gray-100 p-3 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="bg-primary-100 rounded-lg p-2">
                <FileText className="h-4 w-4 text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {report.title}
                </p>
                <p className="text-xs text-gray-500">
                  {report.customer} • {report.format} • {report.size}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Generated {report.generatedAt}
                </p>
              </div>
              <Button variant="ghost" size="sm">
                Download
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}