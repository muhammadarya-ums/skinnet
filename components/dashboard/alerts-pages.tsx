"use client"

import { AlertCircle, AlertTriangle, Info, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Alert {
  id: string
  type: "critical" | "warning" | "info"
  message: string
  timestamp: Date
  action?: string
}

interface AlertsPageProps {
  healthStatus?: "normal" | "warning" | "critical"
}

// 1. TAMBAHKAN 'default'
export default function AlertsPage({ healthStatus = "normal" }: AlertsPageProps) {
  // Data dummy yang akan tampil
  const alerts: Alert[] = [
    {
      id: "1",
      type: healthStatus === "critical" ? "critical" : "info",
      message: healthStatus === "critical" 
        ? "High GSR detected - Potential stress response indicated" 
        : "System monitoring active - all sensors stable",
      timestamp: new Date(Date.now() - 5 * 60000),
      action: healthStatus === "critical" ? "Review immediately" : "Dismiss",
    },
    {
      id: "2",
      type: "warning",
      message: "Skin pH levels elevated to 6.2 - Monitor for changes",
      timestamp: new Date(Date.now() - 15 * 60000),
      action: "View details",
    },
    {
      id: "3",
      type: "info",
      message: "Wearable device battery at 73% - Charging recommended soon",
      timestamp: new Date(Date.now() - 30 * 60000),
      action: "Dismiss",
    },
  ]

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical": return <AlertCircle className="w-5 h-5 text-destructive" />
      case "warning": return <AlertTriangle className="w-5 h-5 text-amber-500" />
      case "info": return <Info className="w-5 h-5 text-blue-500" />
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical": return "bg-red-50 border-red-100"
      case "warning": return "bg-amber-50 border-amber-100"
      case "info": return "bg-blue-50 border-blue-100"
    }
  }

  const getAlertBadgeColor = (type: string) => {
    switch (type) {
      case "critical": return "bg-red-100 text-red-800"
      case "warning": return "bg-amber-100 text-amber-800"
      case "info": return "bg-blue-100 text-blue-800"
    }
  }

  const formatTime = (date: Date) => {
    const minutes = Math.floor((new Date().getTime() - date.getTime()) / 60000)
    if (minutes < 1) return "Just now"
    return `${minutes}m ago`
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Notification Center</h2>
        <span className="text-sm text-muted-foreground">{alerts.length} alerts</span>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <Card key={alert.id} className={`bg-white border shadow-sm ${getAlertColor(alert.type)} transition-colors`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="mt-1">{getAlertIcon(alert.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={`${getAlertBadgeColor(alert.type)} border-0 text-xs font-medium`}>
                        {alert.type.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{formatTime(alert.timestamp)}</span>
                    </div>
                    <p className="text-sm text-foreground font-medium">{alert.message}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {alert.action && (
                    <Button variant="ghost" size="sm" className="text-xs h-8">
                      {alert.action}
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}