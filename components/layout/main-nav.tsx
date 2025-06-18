"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  Database,
  FileText,
  Home,
  Play,
  Settings,
  Shield,
  Users,
  Activity,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Customers", href: "/customers", icon: Building2 },
  { name: "Devices", href: "/devices", icon: Database },
  { name: "Health Checks", href: "/health-checks", icon: Shield },
  { name: "Jobs", href: "/jobs", icon: Play, badge: "3" },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Audit Logs", href: "/audit", icon: Activity },
  { name: "Users", href: "/users", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function MainNav() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  console.log("MainNav rendering, current pathname:", pathname);

  return (
    <div className={cn(
      "flex h-screen flex-col border-r border-gray-200 bg-white shadow-sm transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary-500" />
            <span className="text-xl font-bold text-secondary-900">PS Tool</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 p-0"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary-50 text-primary-600 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                collapsed && "justify-center px-2"
              )}
            >
              <Icon className={cn("h-5 w-5", collapsed ? "" : "mr-3")} />
              {!collapsed && (
                <>
                  <span className="flex-1">{item.name}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto bg-accent-100 text-accent-700">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200 p-4">
        {!collapsed && (
          <div className="text-xs text-gray-500">
            <p className="font-medium">Professional Services</p>
            <p>Security Health Platform</p>
          </div>
        )}
      </div>
    </div>
  );
}