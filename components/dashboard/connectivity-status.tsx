"use client"

import { cn } from "@/lib/utils"
import { Wifi, WifiOff, RefreshCw } from "lucide-react"

interface ConnectivityStatusProps {
  status: "online" | "syncing" | "offline"
}

const statusConfig = {
  online: {
    icon: Wifi,
    label: "Online",
    description: "ESP32 Connected",
    dotClass: "bg-emerald-500",
    textClass: "text-emerald-700",
    bgClass: "bg-emerald-50 border-emerald-200",
  },
  syncing: {
    icon: RefreshCw,
    label: "Syncing",
    description: "Updating Data...",
    dotClass: "bg-yellow-500",
    textClass: "text-yellow-700",
    bgClass: "bg-yellow-50 border-yellow-200",
  },
  offline: {
    icon: WifiOff,
    label: "Offline",
    description: "Check Device",
    dotClass: "bg-red-500",
    textClass: "text-red-700",
    bgClass: "bg-red-50 border-red-200",
  },
}

export function ConnectivityStatus({ status }: ConnectivityStatusProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-xl border",
      config.bgClass
    )}>
      <div className="relative">
        <Icon
          className={cn(
            "w-5 h-5",
            config.textClass,
            status === "syncing" && "animate-spin"
          )}
        />
        <span
          className={cn(
            "absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white",
            config.dotClass,
            status === "online" && "animate-pulse"
          )}
        />
      </div>
      <div className="flex flex-col">
        <span className={cn("text-sm font-semibold", config.textClass)}>
          {config.label}
        </span>
        <span className="text-xs text-slate-500">{config.description}</span>
      </div>
    </div>
  )
}
