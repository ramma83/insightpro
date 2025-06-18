"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Shield, Filter } from "lucide-react";
import { HealthCheckWizard } from "@/components/health-checks/health-check-wizard";
import { HealthCheckTemplates } from "@/components/health-checks/health-check-templates";

export default function HealthChecksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  console.log("HealthChecksPage rendering, searchQuery:", searchQuery);

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900 flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary-500" />
              <span>Health Checks</span>
            </h1>
            <p className="text-gray-600 mt-1">
              Configure and run security health assessments across vendor platforms.
            </p>
          </div>
          <Button 
            onClick={() => setIsWizardOpen(true)}
            className="bg-primary-500 hover:bg-primary-600"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Health Check
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search health check templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter by Vendor
          </Button>
        </div>

        {/* Health Check Templates */}
        <HealthCheckTemplates searchQuery={searchQuery} onStartHealthCheck={() => setIsWizardOpen(true)} />

        {/* Health Check Wizard */}
        <HealthCheckWizard 
          open={isWizardOpen} 
          onOpenChange={setIsWizardOpen} 
        />
      </div>
    </AppShell>
  );
}