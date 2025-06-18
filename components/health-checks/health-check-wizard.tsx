"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { 
  ChevronRight, 
  ChevronLeft, 
  Building2, 
  Database, 
  Shield, 
  Play,
  CheckCircle,
  Clock
} from "lucide-react";

interface HealthCheckWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface WizardData {
  customer: string;
  device: string;
  vendor: string;
  template: string;
  tier: string;
}

// Mock data
const mockCustomers = [
  { id: "1", name: "Acme Corporation" },
  { id: "2", name: "Tech Solutions Inc" },
  { id: "3", name: "Global Enterprises" },
  { id: "4", name: "Startup Co" }
];

const mockDevices = [
  { id: "1", name: "CP-MGT-01", customer: "1", vendor: "Check Point", type: "Management Server" },
  { id: "2", name: "PAN-FW-02", customer: "2", vendor: "Palo Alto Networks", type: "Firewall" },
  { id: "3", name: "FG-CLUSTER-01", customer: "3", vendor: "Fortinet", type: "Firewall Cluster" },
  { id: "4", name: "CP-GW-03", customer: "1", vendor: "Check Point", type: "Security Gateway" }
];

const healthCheckTemplates = {
  "Check Point": {
    name: "Check Point Firewall Health Check",
    tiers: [
      { name: "Essential", price: "$1,500", checks: 12, time: "30 min" },
      { name: "Enhanced", price: "$2,500", checks: 24, time: "1.5 hours" },
      { name: "Elite", price: "$4,000", checks: 35, time: "3 hours" }
    ]
  },
  "Palo Alto Networks": {
    name: "Palo Alto Networks Assessment", 
    tiers: [
      { name: "Essential", price: "$1,500", checks: 10, time: "25 min" },
      { name: "Enhanced", price: "$2,500", checks: 22, time: "1.5 hours" },
      { name: "Elite", price: "$4,000", checks: 32, time: "2.5 hours" }
    ]
  },
  "Fortinet": {
    name: "Fortinet Security Assessment",
    tiers: [
      { name: "Essential", price: "$1,200", checks: 8, time: "20 min" },
      { name: "Enhanced", price: "$2,200", checks: 18, time: "1 hour" },
      { name: "Elite", price: "$3,500", checks: 28, time: "2 hours" }
    ]
  }
};

export function HealthCheckWizard({ open, onOpenChange }: HealthCheckWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [wizardData, setWizardData] = useState<WizardData>({
    customer: "",
    device: "",
    vendor: "",
    template: "",
    tier: "",
  });

  console.log("HealthCheckWizard rendering, open:", open, "currentStep:", currentStep);

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const getAvailableDevices = () => {
    if (!wizardData.customer) return [];
    return mockDevices.filter(device => device.customer === wizardData.customer);
  };

  const getSelectedDevice = () => {
    return mockDevices.find(device => device.id === wizardData.device);
  };

  const getHealthCheckTemplate = () => {
    const device = getSelectedDevice();
    if (!device) return null;
    return healthCheckTemplates[device.vendor as keyof typeof healthCheckTemplates];
  };

  const handleNext = () => {
    console.log("Moving to next step, current data:", wizardData);
    
    if (currentStep === 1 && !wizardData.customer) {
      toast.error("Please select a customer");
      return;
    }
    if (currentStep === 2 && !wizardData.device) {
      toast.error("Please select a device");
      return;
    }
    if (currentStep === 3 && !wizardData.tier) {
      toast.error("Please select a service tier");
      return;
    }
    
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleFieldChange = (field: keyof WizardData, value: string) => {
    console.log(`Wizard field ${field} changed to:`, value);
    setWizardData(prev => ({ 
      ...prev, 
      [field]: value,
      // Reset dependent fields
      ...(field === "customer" && { device: "", vendor: "", template: "", tier: "" }),
      ...(field === "device" && { vendor: "", template: "", tier: "" })
    }));

    // Auto-populate vendor and template when device is selected
    if (field === "device") {
      const selectedDevice = mockDevices.find(d => d.id === value);
      if (selectedDevice) {
        setWizardData(prev => ({
          ...prev,
          device: value,
          vendor: selectedDevice.vendor,
          template: healthCheckTemplates[selectedDevice.vendor as keyof typeof healthCheckTemplates]?.name || "",
          tier: ""
        }));
      }
    }
  };

  const handleStartHealthCheck = async () => {
    console.log("Starting health check with data:", wizardData);
    setIsLoading(true);

    try {
      // Simulate API call to start health check
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Health check started successfully!");
      console.log("Health check job created");
      
      // Reset wizard
      setWizardData({
        customer: "",
        device: "",
        vendor: "",
        template: "",
        tier: "",
      });
      setCurrentStep(1);
      onOpenChange(false);
      
    } catch (error) {
      console.error("Error starting health check:", error);
      toast.error("Failed to start health check. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    console.log("Health check wizard cancelled");
    setWizardData({
      customer: "",
      device: "",
      vendor: "",
      template: "",
      tier: "",
    });
    setCurrentStep(1);
    onOpenChange(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-primary-600">
              <Building2 className="h-5 w-5" />
              <h3 className="text-lg font-medium">Select Customer</h3>
            </div>
            <p className="text-gray-600">Choose the customer for this health check assessment.</p>
            
            <div className="space-y-2">
              <Label>Customer *</Label>
              <Select value={wizardData.customer} onValueChange={(value) => handleFieldChange("customer", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a customer" />
                </SelectTrigger>
                <SelectContent>
                  {mockCustomers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-primary-600">
              <Database className="h-5 w-5" />
              <h3 className="text-lg font-medium">Select Target Device</h3>
            </div>
            <p className="text-gray-600">Choose the device to assess from the selected customer.</p>
            
            <div className="space-y-2">
              <Label>Device *</Label>
              <Select value={wizardData.device} onValueChange={(value) => handleFieldChange("device", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a device" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableDevices().map((device) => (
                    <SelectItem key={device.id} value={device.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{device.name}</span>
                        <Badge variant="outline" className="ml-2">
                          {device.vendor}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {getSelectedDevice() && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm"><strong>Type:</strong> {getSelectedDevice()?.type}</p>
                <p className="text-sm"><strong>Vendor:</strong> {getSelectedDevice()?.vendor}</p>
              </div>
            )}
          </div>
        );
        
      case 3:
        const template = getHealthCheckTemplate();
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-primary-600">
              <Shield className="h-5 w-5" />
              <h3 className="text-lg font-medium">Select Service Tier</h3>
            </div>
            <p className="text-gray-600">Choose the depth of assessment for this health check.</p>
            
            {template && (
              <div className="space-y-4">
                <div className="p-3 bg-primary-50 rounded-lg">
                  <h4 className="font-medium text-primary-900">{template.name}</h4>
                </div>
                
                <div className="space-y-3">
                  {template.tiers.map((tier) => (
                    <div
                      key={tier.name}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        wizardData.tier === tier.name
                          ? "border-primary-500 bg-primary-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => handleFieldChange("tier", tier.name)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">{tier.name}</h5>
                          <p className="text-sm text-gray-600">{tier.checks} checks • {tier.time}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">{tier.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
        
      case 4:
        const selectedDevice = getSelectedDevice();
        const selectedTemplate = getHealthCheckTemplate();
        const selectedTier = selectedTemplate?.tiers.find(t => t.name === wizardData.tier);
        const selectedCustomer = mockCustomers.find(c => c.id === wizardData.customer);
        
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-primary-600">
              <CheckCircle className="h-5 w-5" />
              <h3 className="text-lg font-medium">Review & Confirm</h3>
            </div>
            <p className="text-gray-600">Review your health check configuration before starting.</p>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Customer:</span>
                  <span className="font-medium">{selectedCustomer?.name}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Device:</span>
                  <span className="font-medium">{selectedDevice?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Vendor:</span>
                  <Badge>{selectedDevice?.vendor}</Badge>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Tier:</span>
                  <span className="font-medium">{wizardData.tier}</span>
                </div>
                {selectedTier && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Checks:</span>
                      <span>{selectedTier.checks} security checks</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated Time:</span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {selectedTier.time}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="font-medium">Total Cost:</span>
                      <span className="font-bold text-primary-600">{selectedTier.price}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Health Check Assessment</DialogTitle>
          <DialogDescription>
            Configure a new security health check assessment using our step-by-step wizard.
          </DialogDescription>
        </DialogHeader>
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
        
        {/* Step Content */}
        <div className="py-6">
          {renderStepContent()}
        </div>
        
        {/* Footer */}
        <DialogFooter className="flex justify-between">
          <div className="flex space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={isLoading}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
            )}
          </div>
          
          <div>
            {currentStep < totalSteps ? (
              <Button
                onClick={handleNext}
                disabled={isLoading}
                className="bg-primary-500 hover:bg-primary-600"
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleStartHealthCheck}
                disabled={isLoading}
                className="bg-success-500 hover:bg-success-600"
              >
                {isLoading ? (
                  "Starting..."
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Start Health Check
                  </>
                )}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}