"use client"

import { Activity, Menu, Bell, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ConnectivityStatus } from "./connectivity-status"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  LayoutDashboard,
  FileText,
  Settings,
  User,
  HelpCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface MobileHeaderProps {
  deviceStatus: "online" | "syncing" | "offline"
  onGenerateReport: () => void
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Activity, label: "Analytics", active: false },
  { icon: Bell, label: "Alerts", active: false },
  { icon: User, label: "Profile", active: false },
  { icon: Settings, label: "Settings", active: false },
  { icon: HelpCircle, label: "Help", active: false },
]

export function MobileHeader({ deviceStatus, onGenerateReport }: MobileHeaderProps) {
  return (
    <header className="md:hidden flex items-center justify-between p-4 border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-500">
          <Activity className="w-4 h-4 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-base text-slate-900">
            SkinNET Bio
          </h1>
          <p className="text-xs text-slate-500">Biometric Monitor</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden sm:block">
          <ConnectivityStatus status={deviceStatus} />
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900 hover:bg-slate-100">
              <Menu className="w-5 h-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-white border-slate-200">
            <SheetHeader>
              <SheetTitle className="text-left text-slate-900">Menu</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              {/* Back to Home Link */}
              <Link 
                href="/"
                className="flex items-center gap-2 px-3 py-2 text-sm text-slate-500 hover:text-emerald-600 transition-colors rounded-lg hover:bg-slate-50"
              >
                <Home className="w-4 h-4" />
                Back to Home
              </Link>

              <div className="sm:hidden">
                <ConnectivityStatus status={deviceStatus} />
              </div>
              
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.label}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                        item.active
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      <Icon className={cn("w-4 h-4", item.active ? "text-emerald-600" : "text-slate-400")} />
                      {item.label}
                    </button>
                  )
                })}
              </nav>

              <div className="pt-4 border-t border-slate-200">
                <Button
                  onClick={onGenerateReport}
                  className="w-full justify-start gap-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                  variant="outline"
                >
                  <FileText className="w-4 h-4" />
                  Generate Report
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
