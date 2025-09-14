import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Shield, 
  Upload, 
  BarChart3, 
  Settings, 
  Eye,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Detector",
    url: createPageUrl("Detector"),
    icon: Eye,
  },
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: BarChart3,
  },
  {
    title: "Settings",
    url: createPageUrl("Settings"),
    icon: Settings,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <Sidebar className="border-r border-slate-200 bg-slate-900">
          <SidebarHeader className="border-b border-slate-700 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-white text-lg">DeepGuard</h2>
                <p className="text-xs text-slate-400">AI Detection Suite</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-2">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-medium text-slate-400 uppercase tracking-wider px-2 py-3">
                Detection Tools
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`hover:bg-slate-800 hover:text-blue-400 transition-all duration-200 rounded-lg mb-1 text-slate-300 ${
                          location.pathname === item.url ? 'bg-slate-800 text-blue-400 border border-blue-500/20' : ''
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-3 py-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-medium text-slate-400 uppercase tracking-wider px-2 py-3">
                Security Status
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-3 py-2 space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-slate-300">System Online</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span className="text-slate-300">High Sensitivity</span>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-3 mt-4">
                    <p className="text-xs text-slate-400 mb-1">Detection Accuracy</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full w-[95%] bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full"></div>
                      </div>
                      <span className="text-sm font-semibold text-emerald-400">95%</span>
                    </div>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-slate-700 p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                <span className="text-slate-300 font-medium text-sm">U</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white text-sm truncate">Security Analyst</p>
                <p className="text-xs text-slate-400 truncate">Deepfake Detection</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white border-b border-slate-200 px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-slate-100 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-semibold">DeepGuard</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto bg-slate-50">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
