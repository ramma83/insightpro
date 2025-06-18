"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, CheckCircle, Info } from "lucide-react";

interface HealthCheckTemplate {
  id: string;
  name: string;
  vendor: string;
  description: string;
  tiers: {
    name: string;
    price: string;
    checks: number;
    estimatedTime: string;
    features: string[];
  }[];
  iconColor: string;
  badgeColor: string;
}

const templates: HealthCheckTemplate[] = [
  {
    id: "checkpoint",
    name: "Check Point Firewall Health Check",
    vendor: "Check Point",
    description: "Comprehensive health assessment for Check Point firewalls including management server status, policy analysis, and security blade validation.",
    iconColor: "text-blue-600",
    badgeColor: "bg-blue-100 text-blue-700",
    tiers: [
      {
        name: "Essential",
        price: "$1,500",
        checks: 12,
        estimatedTime: "30 min",
        features: [
          "Basic operational status",
          "License verification",
          "SIC status check",
          "Policy installation status",
          "Basic HA status"
        ]
      },
      {
        name: "Enhanced", 
        price: "$2,500",
        checks: 24,
        estimatedTime: "1.5 hours",
        features: [
          "All Essential checks",
          "Policy hygiene analysis",
          "Object validation",
          "Logging configuration review",
          "Detailed HA sync status"
        ]
      },
      {
        name: "Elite",
        price: "$4,000", 
        checks: 35,
        estimatedTime: "3 hours",
        features: [
          "All Enhanced checks",
          "Advanced policy analysis",
          "Security blade optimization",
          "VPN configuration review",
          "Performance tuning checks"
        ]
      }
    ]
  },
  {
    id: "paloalto",
    name: "Palo Alto Networks Assessment",
    vendor: "Palo Alto Networks",
    description: "Complete security posture assessment for PAN-OS firewalls and Panorama management platform with best practice recommendations.",
    iconColor: "text-orange-600",
    badgeColor: "bg-orange-100 text-orange-700",
    tiers: [
      {
        name: "Essential",
        price: "$1,500",
        checks: 10,
        estimatedTime: "25 min",
        features: [
          "System health status", 
          "License validation",
          "HA status check",
          "Content updates",
          "Basic policy review"
        ]
      },
      {
        name: "Enhanced",
        price: "$2,500", 
        checks: 22,
        estimatedTime: "1.5 hours",
        features: [
          "All Essential checks",
          "Security profile analysis",
          "App-ID adoption review",
          "User-ID configuration",
          "Threat prevention status"
        ]
      },
      {
        name: "Elite",
        price: "$4,000",
        checks: 32,
        estimatedTime: "2.5 hours", 
        features: [
          "All Enhanced checks",
          "Advanced threat analysis",
          "WildFire optimization",
          "Performance monitoring",
          "Custom security rules review"
        ]
      }
    ]
  },
  {
    id: "fortinet",
    name: "Fortinet Security Assessment",
    vendor: "Fortinet",
    description: "Comprehensive FortiGate security review including Security Fabric integration, IPS effectiveness, and configuration optimization.",
    iconColor: "text-red-600",
    badgeColor: "bg-red-100 text-red-700",
    tiers: [
      {
        name: "Essential",
        price: "$1,200",
        checks: 8,
        estimatedTime: "20 min",
        features: [
          "System status check",
          "FortiGuard licensing",
          "HA cluster status",
          "Basic security profiles",
          "Interface configuration"
        ]
      },
      {
        name: "Enhanced",
        price: "$2,200",
        checks: 18,
        estimatedTime: "1 hour",
        features: [
          "All Essential checks",
          "Security Fabric analysis",
          "IPS signature updates",
          "SSL inspection review",
          "VPN configuration audit"
        ]
      },
      {
        name: "Elite",
        price: "$3,500",
        checks: 28,
        estimatedTime: "2 hours",
        features: [
          "All Enhanced checks",
          "Advanced threat protection",
          "SD-WAN optimization",
          "Custom security rules",
          "Performance analytics"
        ]
      }
    ]
  }
];

interface HealthCheckTemplatesProps {
  searchQuery: string;
  onStartHealthCheck: () => void;
}

export function HealthCheckTemplates({ searchQuery, onStartHealthCheck }: HealthCheckTemplatesProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  console.log("HealthCheckTemplates rendering with search:", searchQuery);

  // Filter templates based on search query
  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectTemplate = (templateId: string) => {
    console.log("Selected template:", templateId);
    setSelectedTemplate(templateId);
  };

  const handleStartHealthCheck = (templateId: string, tier: string) => {
    console.log("Starting health check:", { templateId, tier });
    onStartHealthCheck();
  };

  return (
    <div className="space-y-6">
      {filteredTemplates.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center h-32">
            <p className="text-gray-500">
              {searchQuery ? "No health check templates found matching your search." : "No health check templates available."}
            </p>
          </CardContent>
        </Card>
      ) : (
        filteredTemplates.map((template) => (
          <Card key={template.id} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${template.badgeColor.replace('text-', 'bg-').replace('700', '100')}`}>
                    <CheckCircle className={`h-6 w-6 ${template.iconColor}`} />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{template.name}</CardTitle>
                    <Badge className={template.badgeColor}>
                      {template.vendor}
                    </Badge>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mt-2">{template.description}</p>
            </CardHeader>
            
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {template.tiers.map((tier, index) => (
                  <div key={tier.name} className={`relative rounded-lg border-2 p-4 transition-all duration-200 ${
                    index === 1 
                      ? "border-primary-500 bg-primary-50 transform scale-105" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}>
                    {index === 1 && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-primary-500 text-white">
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{tier.name}</h3>
                      <div className="text-3xl font-bold text-gray-900 mt-2">{tier.price}</div>
                      <p className="text-sm text-gray-500">per assessment</p>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Checks included:</span>
                        <span className="font-medium">{tier.checks}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Estimated time:</span>
                        <span className="font-medium flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-gray-400" />
                          {tier.estimatedTime}
                        </span>
                      </div>
                      
                      <div className="pt-2 border-t border-gray-100">
                        <p className="text-sm font-medium text-gray-900 mb-2">Features:</p>
                        <ul className="space-y-1">
                          {tier.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start text-sm text-gray-600">
                              <CheckCircle className="h-4 w-4 text-success-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <Button 
                      className={`w-full ${
                        index === 1 
                          ? "bg-primary-500 hover:bg-primary-600 text-white" 
                          : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => handleStartHealthCheck(template.id, tier.name)}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Start {tier.name} Check
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}