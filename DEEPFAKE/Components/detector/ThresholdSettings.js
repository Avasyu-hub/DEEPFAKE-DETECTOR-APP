import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Settings, Shield, AlertTriangle } from "lucide-react";

export default function ThresholdSettings({ threshold, onThresholdChange }) {
  const getSensitivityLevel = (value) => {
    if (value <= 0.3) return { level: 'Low', color: 'bg-green-100 text-green-800', icon: Shield };
    if (value <= 0.7) return { level: 'Medium', color: 'bg-yellow-100 text-yellow-800', icon: Settings };
    return { level: 'High', color: 'bg-red-100 text-red-800', icon: AlertTriangle };
  };

  const sensitivity = getSensitivityLevel(threshold);
  const SensitivityIcon = sensitivity.icon;

  return (
    <Card className="border-none shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Detection Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-medium text-slate-700">Detection Threshold</label>
            <Badge className={sensitivity.color}>
              <SensitivityIcon className="w-3 h-3 mr-1" />
              {sensitivity.level}
            </Badge>
          </div>
          
          <div className="space-y-3">
            <Slider
              value={[threshold]}
              onValueChange={(value) => onThresholdChange(value[0])}
              max={1}
              min={0.1}
              step={0.05}
              className="w-full"
            />
            
            <div className="flex justify-between text-xs text-slate-500">
              <span>Less Sensitive</span>
              <span className="font-medium text-slate-700">
                {Math.round(threshold * 100)}%
              </span>
              <span>More Sensitive</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-4 space-y-3">
          <h4 className="font-medium text-slate-900">Threshold Guide</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-slate-600"><strong>Low (10-30%):</strong> Fewer false positives</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span className="text-slate-600"><strong>Medium (31-70%):</strong> Balanced detection</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span className="text-slate-600"><strong>High (71-100%):</strong> Maximum sensitivity</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}