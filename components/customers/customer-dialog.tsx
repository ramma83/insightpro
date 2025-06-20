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
  DialogTrigger,
} from "@/components/ui/dialog";
import { CustomerForm } from "./customer-form";
import { Plus } from "lucide-react";

interface CustomerDialogProps {
  customer?: any;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
  children: React.ReactNode;
}

export function CustomerDialog({ 
  customer, 
  open: externalOpen, 
  onOpenChange: externalOnOpenChange, 
  onSuccess, 
  children 
}: CustomerDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = externalOpen !== undefined;
  const open = isControlled ? externalOpen : internalOpen;
  
  const handleOpenChange = (newOpen: boolean) => {
    if (externalOnOpenChange) {
      externalOnOpenChange(newOpen);
    } else {
      setInternalOpen(newOpen);
    }
  };
  const isEditing = !!customer?.id;

  const handleSuccess = () => {
    onSuccess?.();
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Customer" : "Add New Customer"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the customer details below."
              : "Fill in the form below to add a new customer."}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <CustomerForm
            initialData={customer}
            onSuccess={handleSuccess}
            onCancel={() => handleOpenChange(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
