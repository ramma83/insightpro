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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface AddDeviceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface DeviceFormData {
  name: string;
  customer: string;
  vendor: string;
  systemType: string;
  ipAddress: string;
  notes: string;
}

const vendors = [
  { value: "checkpoint", label: "Check Point" },
  { value: "paloalto", label: "Palo Alto Networks" },
  { value: "fortinet", label: "Fortinet" },
];

const systemTypes = {
  checkpoint: [
    "Management Server",
    "Security Gateway", 
    "Cluster Member",
    "VSX Gateway"
  ],
  paloalto: [
    "Panorama",
    "Firewall",
    "HA Pair",
    "Virtual System"
  ],
  fortinet: [
    "FortiManager",
    "FortiGate",
    "Firewall Cluster",
    "Virtual Domain"
  ]
};

// Mock customers - in real app this would come from API
const mockCustomers = [
  "Acme Corporation",
  "Tech Solutions Inc", 
  "Global Enterprises",
  "Startup Co"
];

export function AddDeviceDialog({ open, onOpenChange }: AddDeviceDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<DeviceFormData>({
    name: "",
    customer: "",
    vendor: "",
    systemType: "",
    ipAddress: "",
    notes: "",
  });

  console.log("AddDeviceDialog rendering, open:", open);

  const handleInputChange = (field: keyof DeviceFormData, value: string) => {
    console.log(`Form field ${field} changed to:`, value);
    setFormData(prev => ({ 
      ...prev, 
      [field]: value,
      // Clear system type when vendor changes
      ...(field === "vendor" && { systemType: "" })
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting device form:", formData);
    
    // Basic validation
    if (!formData.name || !formData.customer || !formData.vendor || !formData.systemType || !formData.ipAddress) {
      toast.error("Please fill in all required fields");
      return;
    }

    // IP address validation (basic)
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!ipRegex.test(formData.ipAddress)) {
      toast.error("Please enter a valid IP address or FQDN");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Device created successfully:", formData);
      toast.success("Device added successfully!");
      
      // Reset form
      setFormData({
        name: "",
        customer: "",
        vendor: "",
        systemType: "",
        ipAddress: "",
        notes: "",
      });
      
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating device:", error);
      toast.error("Failed to add device. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    console.log("Add device dialog cancelled");
    setFormData({
      name: "",
      customer: "",
      vendor: "",
      systemType: "",
      ipAddress: "",
      notes: "",
    });
    onOpenChange(false);
  };

  const getSystemTypeOptions = () => {
    if (!formData.vendor) return [];
    return systemTypes[formData.vendor as keyof typeof systemTypes] || [];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Device</DialogTitle>
          <DialogDescription>
            Register a new target device for security assessments. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Device Name *
                </Label>
                <Input
                  id="name"
                  placeholder="e.g., CP-MGT-01"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="customer">
                  Customer *
                </Label>
                <Select value={formData.customer} onValueChange={(value) => handleInputChange("customer", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCustomers.map((customer) => (
                      <SelectItem key={customer} value={customer}>
                        {customer}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vendor">
                  Vendor *
                </Label>
                <Select value={formData.vendor} onValueChange={(value) => handleInputChange("vendor", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vendor" />
                  </SelectTrigger>
                  <SelectContent>
                    {vendors.map((vendor) => (
                      <SelectItem key={vendor.value} value={vendor.value}>
                        {vendor.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="systemType">
                  System Type *
                </Label>
                <Select 
                  value={formData.systemType} 
                  onValueChange={(value) => handleInputChange("systemType", value)}
                  disabled={!formData.vendor}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select system type" />
                  </SelectTrigger>
                  <SelectContent>
                    {getSystemTypeOptions().map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ipAddress">
                IP Address / FQDN *
              </Label>
              <Input
                id="ipAddress"
                placeholder="e.g., 192.168.1.100 or mgmt.company.com"
                value={formData.ipAddress}
                onChange={(e) => handleInputChange("ipAddress", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">
                Notes
              </Label>
              <Textarea
                id="notes"
                placeholder="Additional notes about this device"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-primary-500 hover:bg-primary-600"
            >
              {isLoading ? "Creating..." : "Add Device"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}