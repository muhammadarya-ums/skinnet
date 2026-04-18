"use client"

import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Clock, ShieldCheck, AlertTriangle, AlertCircle, Activity } from "lucide-react"

export interface TimelineEvent {
  id: string
  timestamp: Date
  type: "status_change" | "reading" | "alert"
  status?: "normal" | "warning" | "critical"
  message: string
}

interface TimelineLogProps {
  events: TimelineEvent[]
}

const eventIcons = {
  status_change: {
    normal: { icon: ShieldCheck, class: "text-emerald-600 bg-emerald-50" },
    warning: { icon: AlertTriangle, class: "text-yellow-600 bg-yellow-50" },
    critical: { icon: AlertCircle, class: "text-red-600 bg-red-50" },
  },
  reading: { icon: Activity, class: "text-emerald-600 bg-emerald-50" },
  alert: { icon: AlertCircle, class: "text-red-600 bg-red-50" },
}

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

export function TimelineLog({ events }: TimelineLogProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-400" />
          <h3 className="text-base font-semibold text-slate-900">Activity Log</h3>
        </div>
      </div>
      <div className="p-0">
        <ScrollArea className="h-[280px] px-6">
          <div className="space-y-4 py-4">
            {events.length === 0 ? (
              <div className="text-center py-8">
                <Activity className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-sm text-slate-500">No recent activity</p>
                <p className="text-xs text-slate-400">Connect your device to start logging</p>
              </div>
            ) : (
              events.map((event, index) => {
                let iconConfig
                if (event.type === "status_change" && event.status) {
                  iconConfig = eventIcons.status_change[event.status]
                } else if (event.type === "alert") {
                  iconConfig = eventIcons.alert
                } else {
                  iconConfig = eventIcons.reading
                }
                const Icon = iconConfig.icon

                return (
                  <div key={event.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          "flex items-center justify-center w-8 h-8 rounded-full shrink-0 border border-slate-100",
                          iconConfig.class
                        )}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      {index < events.length - 1 && (
                        <div className="w-px h-full bg-slate-200 mt-2 flex-1" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {event.message}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {formatTime(event.timestamp)}
                      </p>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
