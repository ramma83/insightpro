"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Building2, Filter } from "lucide-react";
import { CustomersTable } from "@/components/customers/customers-table";
import { CustomerDialog } from "@/components/customers/customer-dialog";

export default function CustomersPage() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Handle URL parameter for opening the add dialog
  useEffect(() => {
    const addParam = searchParams.get('add');
    if (addParam === '1') {
      setIsAddDialogOpen(true);
      // Remove the query parameter from the URL without refreshing the page
      const url = new URL(window.location.href);
      url.searchParams.delete('add');
      window.history.replaceState({}, '', url);
    }
  }, [searchParams]);

  const handleSuccess = () => {
    setIsAddDialogOpen(false);
    setRefreshKey(prev => prev + 1); // Force table to refresh
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-primary-500 flex-shrink-0" />
              <h1 className="text-2xl font-bold text-secondary-900 sm:text-3xl">
                Customers
              </h1>
            </div>
            <p className="text-sm text-gray-600 sm:text-base">
              Manage your professional services customers and their information.
            </p>
          </div>
          <div className="flex justify-end">
            {/* Moved Add Customer button to filter bar */}
          </div>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center justify-end space-x-3">
            <Button variant="outline" size="sm" className="whitespace-nowrap">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-primary-500 hover:bg-primary-600 whitespace-nowrap"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
            <CustomerDialog 
              open={isAddDialogOpen}
              onOpenChange={setIsAddDialogOpen}
              onSuccess={handleSuccess}
            >
              <div />
            </CustomerDialog>
          </div>
        </div>

        {/* Customers Table */}
        <CustomersTable 
        key={refreshKey} // Force re-render when refreshKey changes
        searchQuery={searchQuery} 
      />

      </div>
    </AppShell>
  );
}