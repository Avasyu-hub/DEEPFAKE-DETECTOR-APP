
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Shield, 
  Bell, 
  Database, 
  Zap,
  Save,
  AlertTriangle,
  CheckCircle,
  Copy
} from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    defaultThreshold: 0.7,
    autoSave: true,
    notifications: true,
    highSensitivity: false,
    maxFileSize: 100,
    retentionDays: 30,
    apiKey: "sk-deepguard-8a4f2b1e9c5d7f3a0b6e8d2c1f4a9b8e"
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // In a real app, save to backend
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(settings.apiKey);
    toast.success("API Key copied to clipboard!");
  };

  const getSensitivityInfo = (threshold) => {
    if (threshold <= 0.3) return { level: 'Low', color: 'bg-green-100 text-green-800' };
    if (threshold <= 0.7) return { level: 'Medium', color: 'bg-yellow-100 text-yellow-800' };
    return { level: 'High', color: 'bg-red-100 text-red-800' };
  };

  const sensitivity = getSensitivityInfo(settings.defaultThreshold);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
            <p className="text-slate-600">Configure your deepfake detection preferences</p>
          </div>
        </div>

        <div className="grid gap-8">
          {/* Detection Settings */}
          <Card className="border-none shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Detection Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="threshold">Default Detection Threshold</Label>
                    <Badge className={sensitivity.color}>
                      {sensitivity.level} Sensitivity
                    </Badge>
                  </div>
                  <Slider
                    value={[settings.defaultThreshold]}
                    onValueChange={(value) => setSettings({...settings, defaultThreshold: value[0]})}
                    max={1}
                    min={0.1}
                    step={0.05}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Less Sensitive</span>
                    <span className="font-medium">{Math.round(settings.defaultThreshold * 100)}%</span>
                    <span>More Sensitive</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="filesize">Max File Size (MB)</Label>
                  <Input
                    id="filesize"
                    type="number"
                    value={settings.maxFileSize}
                    onChange={(e) => setSettings({...settings, maxFileSize: parseInt(e.target.value)})}
                    className="w-full"
                  />
                  <p className="text-xs text-slate-500">Maximum file size for upload</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div>
                    <p className="font-medium">Auto-save Results</p>
                    <p className="text-sm text-slate-500">Automatically save detection results</p>
                  </div>
                  <Switch
                    checked={settings.autoSave}
                    onCheckedChange={(checked) => setSettings({...settings, autoSave: checked})}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div>
                    <p className="font-medium">High Sensitivity Mode</p>
                    <p className="text-sm text-slate-500">Enhanced detection for subtle manipulations</p>
                  </div>
                  <Switch
                    checked={settings.highSensitivity}
                    onCheckedChange={(checked) => setSettings({...settings, highSensitivity: checked})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications & Alerts */}
          <Card className="border-none shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications & Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                <div>
                  <p className="font-medium">Enable Notifications</p>
                  <p className="text-sm text-slate-500">Get notified about detection results</p>
                </div>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={(checked) => setSettings({...settings, notifications: checked})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card className="border-none shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="retention">Data Retention (Days)</Label>
                  <Input
                    id="retention"
                    type="number"
                    value={settings.retentionDays}
                    onChange={(e) => setSettings({...settings, retentionDays: parseInt(e.target.value)})}
                    className="w-full"
                  />
                  <p className="text-xs text-slate-500">How long to keep detection data</p>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="apikey">API Key</Label>
                  <div className="relative">
                    <Input
                      id="apikey"
                      type="text"
                      value={settings.apiKey}
                      readOnly
                      className="w-full pr-10"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-slate-500 hover:bg-slate-100"
                      onClick={handleCopyApiKey}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-slate-500">Your DeepGuard API access key</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="border-none shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">Detection Engine</p>
                    <p className="text-sm text-green-700">Online & Operational</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">API Status</p>
                    <p className="text-sm text-blue-700">Connected</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-purple-900">Model Version</p>
                    <p className="text-sm text-purple-700">v2.1.0 (Latest)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8"
              size="lg"
            >
              {saved ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Saved!
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Save Settings
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
