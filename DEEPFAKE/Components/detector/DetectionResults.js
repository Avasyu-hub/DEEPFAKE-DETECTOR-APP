import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  AlertTriangle, 
  CheckCircle, 
  Eye, 
  BarChart3, 
  Clock,
  Layers,
  Target,
  Zap
} from "lucide-react";

import HeatmapOverlay from './HeatmapOverlay';

export default function DetectionResults({ results }) {
  const [showHeatmap, setShowHeatmap] = useState(true);
  
  const confidencePercentage = Math.round(results.confidence_score * 100);
  const threatLevel = results.is_deepfake ? 'high' : 'low';
  
  const getThreatColor = (level) => {
    switch (level) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Results Card */}
      <Card className="border-none shadow-xl overflow-hidden">
        <CardHeader className={`${results.is_deepfake ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-green-500 to-green-600'} text-white`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {results.is_deepfake ? (
                <AlertTriangle className="w-8 h-8" />
              ) : (
                <CheckCircle className="w-8 h-8" />
              )}
              <div>
                <CardTitle className="text-2xl">
                  {results.is_deepfake ? 'Deepfake Detected' : 'Authentic Media'}
                </CardTitle>
                <p className="text-white/90">
                  {results.is_deepfake ? 'Potential manipulation found' : 'No manipulation detected'}
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-lg px-4 py-2">
              {confidencePercentage}% Confidence
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Media Preview with Heatmap */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Media Analysis</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowHeatmap(!showHeatmap)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {showHeatmap ? 'Hide' : 'Show'} Heatmap
                </Button>
              </div>
              
              <div className="relative bg-slate-100 rounded-lg overflow-hidden aspect-video">
                {results.file_type === 'image' ? (
                  <img
                    src={results.file_url}
                    alt="Analysis subject"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={results.file_url}
                    controls
                    className="w-full h-full object-cover"
                  />
                )}
                
                {showHeatmap && (
                  <HeatmapOverlay data={results.heatmap_data} />
                )}
              </div>
              
              <p className="text-sm text-slate-600">{results.filename}</p>
            </div>

            {/* Analysis Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Detection Metrics</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Confidence Score</span>
                      <span className="text-sm font-bold">{confidencePercentage}%</span>
                    </div>
                    <Progress 
                      value={confidencePercentage} 
                      className={`h-3 ${results.is_deepfake ? 'text-red-600' : 'text-green-600'}`}
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Threshold Used</span>
                      <span className="text-sm">{Math.round(results.threshold_used * 100)}%</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Processing Time</span>
                      <span className="text-sm">{results.processing_time}s</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg border ${getThreatColor(threatLevel)}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="w-4 h-4" />
                    <span className="font-medium text-sm">Threat Level</span>
                  </div>
                  <span className="text-lg font-bold capitalize">{threatLevel}</span>
                </div>
                
                <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
                  <div className="flex items-center gap-2 mb-1">
                    <Layers className="w-4 h-4 text-slate-600" />
                    <span className="font-medium text-sm text-slate-700">Face Regions</span>
                  </div>
                  <span className="text-lg font-bold text-slate-900">
                    {results.analysis_details?.face_regions || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Details */}
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Technical Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-blue-700 mb-1">Quality Score</p>
              <p className="text-lg font-bold text-blue-900">
                {Math.round((results.analysis_details?.quality_score || 0) * 100)}%
              </p>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Zap className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-purple-700 mb-1">Suspicious Areas</p>
              <p className="text-lg font-bold text-purple-900">
                {results.analysis_details?.suspicious_areas || 0}
              </p>
            </div>
            
            <div className="text-center p-4 bg-emerald-50 rounded-lg">
              <Target className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <p className="text-sm text-emerald-700 mb-1">Resolution</p>
              <p className="text-lg font-bold text-emerald-900">
                {results.analysis_details?.resolution || 'Unknown'}
              </p>
            </div>
            
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Layers className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="text-sm text-orange-700 mb-1">Format</p>
              <p className="text-lg font-bold text-orange-900">
                {results.analysis_details?.format || 'Unknown'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}