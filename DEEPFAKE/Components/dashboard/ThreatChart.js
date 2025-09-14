import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from "date-fns";

export default function ThreatChart({ detections, isLoading }) {
  const generateChartData = () => {
    if (!detections.length) return [];

    // Group detections by day
    const dayGroups = {};
    detections.forEach(detection => {
      const day = format(new Date(detection.created_date), 'MMM dd');
      if (!dayGroups[day]) {
        dayGroups[day] = { authentic: 0, deepfakes: 0 };
      }
      if (detection.is_deepfake) {
        dayGroups[day].deepfakes += 1;
      } else {
        dayGroups[day].authentic += 1;
      }
    });

    return Object.entries(dayGroups).map(([day, counts]) => ({
      day,
      authentic: counts.authentic,
      deepfakes: counts.deepfakes,
      total: counts.authentic + counts.deepfakes
    })).slice(-7).reverse();
  };

  const chartData = generateChartData();

  return (
    <Card className="border-none shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Detection Trends (Last 7 Days)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isLoading && chartData.length > 0 ? (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="day" 
                  tick={{ fontSize: 12 }}
                  className="text-slate-600"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  className="text-slate-600"
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="authentic" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  name="Authentic"
                />
                <Line 
                  type="monotone" 
                  dataKey="deepfakes" 
                  stroke="#ef4444" 
                  strokeWidth={3}
                  dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                  name="Deepfakes"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-80 flex items-center justify-center text-slate-500">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Not enough data for trends</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}