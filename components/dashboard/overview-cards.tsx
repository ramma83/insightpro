"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Database, 
  Shield, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users
} from "lucide-react";

const stats = [
  {
    title: "Total Customers",
    value: "42",
    change: "+3 this month",
    changeType: "positive" as const,
    icon: Building2,
  },
  {
    title: "Managed Devices",
    value: "187",
    change: "+12 this month",
    changeType: "positive" as const,
    icon: Database,
  },
  {
    title: "Health Checks",
    value: "1,247",
    change: "+89 this week",
    changeType: "positive" as const,
    icon: Shield,
  },
  {
    title: "Active Jobs",
    value: "7",
    change: "3 running",
    changeType: "neutral" as const,
    icon: Clock,
  },
];

const healthSummary = [
  {
    status: "Healthy",
    count: 124,
    color: "text-success-600",
    bgColor: "bg-success-100",
    icon: CheckCircle,
  },
  {
    status: "Warning",
    count: 43,
    color: "text-warning-600",
    bgColor: "bg-warning-100",
    icon: AlertTriangle,
  },
  {
    status: "Critical",
    count: 8,
    color: "text-danger-600",
    bgColor: "bg-danger-100",
    icon: AlertTriangle,
  },
];

export function OverviewCards() {
  console.log("OverviewCards rendering with stats:", stats);

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-card-hover transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-secondary-900">{stat.value}</div>
                <p className={`text-xs ${
                  stat.changeType === "positive" 
                    ? "text-success-600" 
                    : "text-gray-500"
                }`}>
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Health Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary-500" />
            <span>Security Health Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {healthSummary.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.status} className="flex items-center space-x-3">
                  <div className={`rounded-full p-2 ${item.bgColor}`}>
                    <Icon className={`h-4 w-4 ${item.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.status}</p>
                    <p className="text-2xl font-bold text-gray-700">{item.count}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}