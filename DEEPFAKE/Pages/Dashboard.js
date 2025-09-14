import React, { useState, useEffect } from "react";
import { Detection } from "@/entities/Detection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, FileText, AlertTriangle, CheckCircle, TrendingUp, Clock } from "lucide-react";
import { format } from "date-fns";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

import StatsGrid from "../components/dashboard/StatsGrid";
import RecentDetections from "../components/dashboard/RecentDetections";
import ThreatChart from "../components/dashboard/ThreatChart";

export default function DashboardPage() {
  const [detections, setDetections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    deepfakes: 0,
    authentic: 0,
    avgConfidence: 0
  });

  useEffect(() => {
    loadDetections();
  }, []);

  const loadDetections = async () => {
    setIsLoading(true);
    try {
      const data = await Detection.list('-created_date', 50);
      setDetections(data);
      
      // Calculate stats
      const total = data.length;
      const deepfakes = data.filter(d => d.is_deepfake).length;
      const authentic = total - deepfakes;
      const avgConfidence = total > 0 
        ? data.reduce((sum, d) => sum + d.confidence_score, 0) / total 
        : 0;

      setStats({ total, deepfakes, authentic, avgConfidence });
    } catch (error) {
      console.error("Failed to load detections:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Detection Dashboard</h1>
            <p className="text-slate-600">Monitor deepfake detection analytics and trends</p>
          </div>
        </div>

        <StatsGrid stats={stats} isLoading={isLoading} />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ThreatChart detections={detections} isLoading={isLoading} />
            <RecentDetections detections={detections} isLoading={isLoading} />
          </div>
          
          <div className="space-y-8">
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Detection Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!isLoading && detections.length > 0 ? (
                  <div className="space-y-6">
                    <div className="relative h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Authentic', value: stats.authentic, fill: '#10b981' },
                              { name: 'Deepfake', value: stats.deepfakes, fill: '#ef4444' }
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {[
                              { name: 'Authentic', value: stats.authentic, fill: '#10b981' },
                              { name: 'Deepfake', value: stats.deepfakes, fill: '#ef4444' }
                            ].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium">Authentic Media</span>
                        </div>
                        <span className="font-bold">{stats.authentic}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-sm font-medium">Deepfakes</span>
                        </div>
                        <span className="font-bold">{stats.deepfakes}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>No detections yet</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-900">AI Engine</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Online</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-900">Detection Model</span>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">v2.1.0</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                      <span className="font-medium text-purple-900">Accuracy Rate</span>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800">95.7%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}