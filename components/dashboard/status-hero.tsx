"use client"

import { cn } from "@/lib/utils"
import { ShieldCheck, AlertTriangle, AlertCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export type HealthStatus = "normal" | "warning" | "critical"

interface StatusHeroProps {
  status: HealthStatus
}

const statusConfig = {
  normal: {
    icon: ShieldCheck,
    title: "All Clear",
    message: "Your skin health indicators are within normal range. Keep up the great care!",
    bgClass: "bg-gradient-to-br from-emerald-50 to-emerald-100",
    borderClass: "border-emerald-200",
    iconBgClass: "bg-emerald-100",
    iconClass: "text-emerald-600",
    textClass: "text-emerald-700",
    badgeClass: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  warning: {
    icon: AlertTriangle,
    title: "Elevated Readings",
    message: "Some indicators are slightly elevated. Monitor closely and maintain hygiene protocols.",
    bgClass: "bg-gradient-to-br from-yellow-50 to-yellow-100",
    borderClass: "border-yellow-200",
    iconBgClass: "bg-yellow-100",
    iconClass: "text-yellow-600",
    textClass: "text-yellow-700",
    badgeClass: "bg-yellow-100 text-yellow-700 border-yellow-200",
  },
  critical: {
    icon: AlertCircle,
    title: "Attention Required",
    message: "Readings indicate potential concern. Please consult your healthcare provider immediately.",
    bgClass: "bg-gradient-to-br from-red-50 to-red-100",
    borderClass: "border-red-200",
    iconBgClass: "bg-red-100",
    iconClass: "text-red-600",
    textClass: "text-red-700",
    badgeClass: "bg-red-100 text-red-700 border-red-200",
  },
}

export function StatusHero({ status }: StatusHeroProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border p-6 md:p-8 transition-all duration-500 shadow-sm",
        config.bgClass,
        config.borderClass
      )}
    >
      {/* Decorative background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={cn("absolute top-0 right-0 w-64 h-64 rounded-full transform translate-x-1/2 -translate-y-1/2 opacity-30", config.iconBgClass)} />
        <div className={cn("absolute bottom-0 left-0 w-48 h-48 rounded-full transform -translate-x-1/2 translate-y-1/2 opacity-20", config.iconBgClass)} />
      </div>

      <div className="relative flex flex-col md:flex-row md:items-center gap-6">
        <div
          className={cn(
            "flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl",
            "bg-white shadow-sm border",
            config.borderClass
          )}
        >
          <Icon className={cn("w-8 h-8 md:w-10 md:h-10", config.iconClass)} />
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className={cn("text-2xl md:text-3xl font-bold", config.textClass)}>
              {config.title}
            </h2>
            <span
              className={cn(
                "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide border",
                config.badgeClass
              )}
            >
              {status}
            </span>
          </div>
          <p className="text-slate-600 text-sm md:text-base max-w-2xl leading-relaxed">
            {config.message}
          </p>
        </div>

        {status === "critical" && (
          <Button
            size="lg"
            className="bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/25 md:ml-auto"
          >
            <Phone className="w-4 h-4 mr-2" />
            Call Doctor
          </Button>
        )}
      </div>
    </div>
  )
}
