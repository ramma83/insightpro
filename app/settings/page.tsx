"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { 
  Settings, 
  Save, 
  Shield, 
  Bell, 
  Mail, 
  Database,
  Palette,
  Globe,
  Lock,
  Upload
} from "lucide-react";

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    // General Settings
    companyName: "Professional Services Inc.",
    timezone: "America/New_York",
    dateFormat: "MM/dd/yyyy",
    language: "en",
    
    // Security Settings
    sessionTimeout: "60",
    requireTwoFactor: false,
    passwordMinLength: "8",
    passwordExpiration: "90",
    
    // Notification Settings
    emailNotifications: true,
    jobCompletionNotification: true,
    reportGenerationNotification: true,
    systemAlertsNotification: true,
    
    // Report Settings
    defaultReportFormat: "PDF",
    automaticReportGeneration: false,
    includeExecutiveSummary: true,
    brandingEnabled: true,
    
    // Database Settings
    backupFrequency: "daily",
    retentionPeriod: "365",
    logLevel: "info"
  });

  console.log("SettingsPage rendering with settings:", settings);

  const handleSettingChange = (key: string, value: string | boolean) => {
    console.log(`Setting ${key} changed to:`, value);
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    console.log("Saving settings:", settings);
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (type: string) => {
    console.log("Upload file for:", type);
    // TODO: Implement file upload functionality
    toast.info(`${type} upload functionality coming soon`);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900 flex items-center space-x-2">
              <Settings className="h-8 w-8 text-primary-500" />
              <span>Settings</span>
            </h1>
            <p className="text-gray-600 mt-1">
              Configure system settings and preferences for your organization.
            </p>
          </div>
          <Button 
            onClick={handleSave}
            disabled={isLoading}
            className="bg-primary-500 hover:bg-primary-600"
          >
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? "Saving..." : "Save Settings"}
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-primary-500" />
                <span>General Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={settings.companyName}
                  onChange={(e) => handleSettingChange("companyName", e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={settings.timezone} onValueChange={(value) => handleSettingChange("timezone", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select value={settings.dateFormat} onValueChange={(value) => handleSettingChange("dateFormat", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/dd/yyyy">MM/dd/yyyy</SelectItem>
                      <SelectItem value="dd/MM/yyyy">dd/MM/yyyy</SelectItem>
                      <SelectItem value="yyyy-MM-dd">yyyy-MM-dd</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select value={settings.language} onValueChange={(value) => handleSettingChange("language", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="h-5 w-5 text-primary-500" />
                <span>Security Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleSettingChange("sessionTimeout", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="passwordMinLength">Password Min Length</Label>
                  <Input
                    id="passwordMinLength"
                    type="number"
                    value={settings.passwordMinLength}
                    onChange={(e) => handleSettingChange("passwordMinLength", e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="passwordExpiration">Password Expiration (days)</Label>
                <Input
                  id="passwordExpiration"
                  type="number"
                  value={settings.passwordExpiration}
                  onChange={(e) => handleSettingChange("passwordExpiration", e.target.value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require Two-Factor Authentication</Label>
                  <div className="text-sm text-gray-500">
                    Require 2FA for all user accounts
                  </div>
                </div>
                <Switch
                  checked={settings.requireTwoFactor}
                  onCheckedChange={(checked) => handleSettingChange("requireTwoFactor", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-primary-500" />
                <span>Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <div className="text-sm text-gray-500">
                    Enable email notifications
                  </div>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Job Completion</Label>
                  <div className="text-sm text-gray-500">
                    Notify when health checks complete
                  </div>
                </div>
                <Switch
                  checked={settings.jobCompletionNotification}
                  onCheckedChange={(checked) => handleSettingChange("jobCompletionNotification", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Report Generation</Label>
                  <div className="text-sm text-gray-500">
                    Notify when reports are generated
                  </div>
                </div>
                <Switch
                  checked={settings.reportGenerationNotification}
                  onCheckedChange={(checked) => handleSettingChange("reportGenerationNotification", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>System Alerts</Label>
                  <div className="text-sm text-gray-500">
                    Notify about system issues
                  </div>
                </div>
                <Switch
                  checked={settings.systemAlertsNotification}
                  onCheckedChange={(checked) => handleSettingChange("systemAlertsNotification", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Report Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5 text-primary-500" />
                <span>Report Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="defaultReportFormat">Default Report Format</Label>
                <Select value={settings.defaultReportFormat} onValueChange={(value) => handleSettingChange("defaultReportFormat", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PDF">PDF</SelectItem>
                    <SelectItem value="Word">Microsoft Word</SelectItem>
                    <SelectItem value="HTML">HTML</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Automatic Report Generation</Label>
                  <div className="text-sm text-gray-500">
                    Generate reports automatically after job completion
                  </div>
                </div>
                <Switch
                  checked={settings.automaticReportGeneration}
                  onCheckedChange={(checked) => handleSettingChange("automaticReportGeneration", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Include Executive Summary</Label>
                  <div className="text-sm text-gray-500">
                    Include executive summary in reports
                  </div>
                </div>
                <Switch
                  checked={settings.includeExecutiveSummary}
                  onCheckedChange={(checked) => handleSettingChange("includeExecutiveSummary", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Custom Branding</Label>
                  <div className="text-sm text-gray-500">
                    Enable custom branding for reports
                  </div>
                </div>
                <Switch
                  checked={settings.brandingEnabled}
                  onCheckedChange={(checked) => handleSettingChange("brandingEnabled", checked)}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>Company Logo</Label>
                <Button variant="outline" onClick={() => handleFileUpload("logo")}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Logo
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Database Settings */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-primary-500" />
                <span>Database & Backup Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">Backup Frequency</Label>
                  <Select value={settings.backupFrequency} onValueChange={(value) => handleSettingChange("backupFrequency", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="retentionPeriod">Retention Period (days)</Label>
                  <Input
                    id="retentionPeriod"
                    type="number"
                    value={settings.retentionPeriod}
                    onChange={(e) => handleSettingChange("retentionPeriod", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="logLevel">Log Level</Label>
                  <Select value={settings.logLevel} onValueChange={(value) => handleSettingChange("logLevel", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="error">Error</SelectItem>
                      <SelectItem value="warn">Warning</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="debug">Debug</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}