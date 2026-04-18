"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ConnectivityStatus } from "./connectivity-status"
import {
  LayoutDashboard,
  Settings,
  Bell,
  User,
  HelpCircle,
  Activity,
  FileText,
  Home,
} from "lucide-react"
import Link from "next/link"

interface NavItem {
  label: string
  icon: React.ElementType
  tab: string
}

const navItems: NavItem[] = [
  { label: "Ringkasan", icon: LayoutDashboard, tab: "dashboard" },
  { label: "Analitik", icon: Activity, tab: "analytics" },
  { label: "Peringatan", icon: Bell, tab: "alerts" },
  { label: "Profil", icon: User, tab: "profile" },
  { label: "Pengaturan", icon: Settings, tab: "settings" },
  { label: "Bantuan", icon: HelpCircle, tab: "help" },
]

interface DashboardSidebarProps {
  deviceStatus: "online" | "syncing" | "offline"
  onGenerateReport: () => void
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function DashboardSidebar({ 
  deviceStatus, 
  onGenerateReport, 
  activeTab, 
  setActiveTab 
}: DashboardSidebarProps) {
  return (
    <div className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-slate-200 p-4 space-y-6 sticky top-0">
      {/* Header / Logo Section */}
      <div className="flex items-center gap-2 px-2">
        <div className="relative w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
          <Activity className="w-5 h-5 text-white" />
        </div>
        <span className="text-lg font-bold tracking-tight text-slate-900">
          SkinNET Bio
        </span>
      </div>

      {/* Back to Home Link */}
      <Link 
        href="/"
        className="flex items-center gap-2 px-3 py-2 text-sm text-slate-500 hover:text-emerald-600 transition-colors rounded-lg hover:bg-slate-50"
      >
        <Home className="w-4 h-4" />
        Kembali ke Beranda
      </Link>

      {/* Connectivity Status */}
      <div className="px-2">
        <ConnectivityStatus status={deviceStatus} />
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.tab

          return (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.tab)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon className={cn("w-4 h-4", isActive ? "text-emerald-600" : "text-slate-400")} />
              {item.label}
            </button>
          )
        })}
      </nav>

      {/* Footer / Report Section */}
      <div className="pt-4 border-t border-slate-200 px-2">
        <Button 
          onClick={onGenerateReport}
          className="w-full justify-start gap-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
          variant="outline"
        >
          <FileText className="w-4 h-4" />
          Buat Laporan
        </Button>
      </div>
    </div>
  )
}
