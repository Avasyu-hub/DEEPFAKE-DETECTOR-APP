import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, FileImage, FileVideo, ExternalLink, AlertTriangle, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

export default function RecentDetections({ detections, isLoading }) {
  const recentDetections = detections.slice(0, 8);

  return (
    <Card className="border-none shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Recent Detections
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded" />
                  <div>
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            ))}
          </div>
        ) : recentDetections.length > 0 ? (
          <div className="space-y-4">
            {recentDetections.map((detection) => (
              <div key={detection.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    {detection.file_type === 'video' ? (
                      <FileVideo className="w-10 h-10 text-blue-500" />
                    ) : (
                      <FileImage className="w-10 h-10 text-green-500" />
                    )}
                    {detection.is_deepfake ? (
                      <AlertTriangle className="w-4 h-4 text-red-500 absolute -top-1 -right-1" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-green-500 absolute -top-1 -right-1" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 truncate max-w-[200px]">
                      {detection.filename}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <span>{format(new Date(detection.created_date), "MMM d, HH:mm")}</span>
                      <span>•</span>
                      <span>{Math.round(detection.confidence_score * 100)}% confidence</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge 
                    className={detection.is_deepfake 
                      ? "bg-red-100 text-red-800 border-red-200" 
                      : "bg-green-100 text-green-800 border-green-200"
                    }
                  >
                    {detection.is_deepfake ? 'Deepfake' : 'Authentic'}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(detection.file_url, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">
            <Clock className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No recent detections</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}