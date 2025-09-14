import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FileText, AlertTriangle, CheckCircle, BarChart3 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const StatCard = ({ title, value, icon: Icon, color, trend, isLoading }) => (
  <Card className="border-none shadow-xl overflow-hidden">
    <div className={`absolute top-0 right-0 w-20 h-20 transform translate-x-6 -translate-y-6 ${color} rounded-full opacity-10`} />
    <CardContent className="p-6 relative">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600 mb-2">{title}</p>
          {isLoading ? (
            <Skeleton className="h-8 w-16" />
          ) : (
            <p className="text-3xl font-bold text-slate-900">{value}</p>
          )}
          {trend && (
            <p className="text-xs text-slate-500 mt-1">{trend}</p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${color} bg-opacity-20`}>
          <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function StatsGrid({ stats, isLoading }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Analyzed"
        value={stats.total}
        icon={FileText}
        color="bg-blue-500"
        trend="All time"
        isLoading={isLoading}
      />
      <StatCard
        title="Deepfakes Found"
        value={stats.deepfakes}
        icon={AlertTriangle}
        color="bg-red-500"
        trend={`${stats.total > 0 ? Math.round((stats.deepfakes / stats.total) * 100) : 0}% of total`}
        isLoading={isLoading}
      />
      <StatCard
        title="Authentic Media"
        value={stats.authentic}
        icon={CheckCircle}
        color="bg-green-500"
        trend={`${stats.total > 0 ? Math.round((stats.authentic / stats.total) * 100) : 0}% verified`}
        isLoading={isLoading}
      />
      <StatCard
        title="Avg Confidence"
        value={`${Math.round(stats.avgConfidence * 100)}%`}
        icon={BarChart3}
        color="bg-purple-500"
        trend="Detection accuracy"
        isLoading={isLoading}
      />
    </div>
  );
}