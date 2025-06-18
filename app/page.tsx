"use client";

import { AppShell } from "@/components/layout/app-shell";
import { OverviewCards } from "@/components/dashboard/overview-cards";
import { RecentActivity } from "@/components/dashboard/recent-activity";

export default function Dashboard() {
  console.log("Dashboard page rendering");

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's an overview of your professional services platform.
          </p>
        </div>

        {/* Overview Cards */}
        <OverviewCards />

        {/* Recent Activity */}
        <RecentActivity />
      </div>
    </AppShell>
  );
}
