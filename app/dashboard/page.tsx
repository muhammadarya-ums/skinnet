"use client"

import { useState, useEffect, useCallback } from "react"
import { useBluetooth } from "@/hooks/use-bluetooth" 
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { MobileHeader } from "@/components/dashboard/mobile-header"
import { StatusHero, type HealthStatus } from "@/components/dashboard/status-hero"
import { BiometricCard } from "@/components/dashboard/biometric-card"
import { TimelineLog, type TimelineEvent } from "@/components/dashboard/timeline-log"
import { Button } from "@/components/ui/button"
import { Droplet, Wind, Thermometer, Zap } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Views
import AnalyticsView from "@/components/dashboard/analytics-page"
import AlertsView from "@/components/dashboard/alerts-pages"
import ProfileView from "@/components/dashboard/profiles-page"
import SettingsView from "@/components/dashboard/settings-page"
import HelpView from "@/components/dashboard/help-page"

export default function DashboardPage() {
  const { connectBluetooth, disconnectBluetooth, receivedData, isScanning, device } = useBluetooth();

  const [activeTab, setActiveTab] = useState("dashboard")
  const [healthStatus, setHealthStatus] = useState<HealthStatus>("normal")
  const [events, setEvents] = useState<TimelineEvent[]>([])
  const [showReportDialog, setShowReportDialog] = useState(false)
  
  const [phValue, setPhValue] = useState(5.5)
  const [gasValue, setGasValue] = useState(45)
  const [tempValue, setTempValue] = useState(36.5)
  const [gsrValue, setGsrValue] = useState(45.8)
  
  const [phTrend] = useState(Array(30).fill(5.5))
  const [gasTrend] = useState(Array(30).fill(45))
  const [tempTrend] = useState(Array(30).fill(36.5))
  const [gsrTrend] = useState(Array(30).fill(45.8))

  useEffect(() => {
    if (receivedData) {
      const parts = receivedData.split(',')
      if (parts.length === 4) {
        const [p, g, t, i] = parts.map(Number)
        setPhValue(p); setGasValue(g); setTempValue(t); setGsrValue(i);
      }
    }
  }, [receivedData])

  const getPhStatus = (v: number) => (v >= 4.5 && v <= 6.0 ? "normal" : "critical")
  const getGasStatus = (v: number) => (v <= 60 ? "normal" : "critical")
  const getTempStatus = (v: number) => (v >= 35.5 && v <= 37.5 ? "normal" : "critical")
  const getGsrStatus = (v: number) => (v >= 40 && v <= 60 ? "normal" : "critical")

  const handleGenerateReport = useCallback(() => setShowReportDialog(true), [])

  // Update health status based on sensor readings
  useEffect(() => {
    const statuses = [
      getPhStatus(phValue),
      getGasStatus(gasValue),
      getTempStatus(tempValue),
      getGsrStatus(gsrValue)
    ]
    if (statuses.includes("critical")) {
      setHealthStatus("critical")
    } else {
      setHealthStatus("normal")
    }
  }, [phValue, gasValue, tempValue, gsrValue])

  const renderMainContent = () => {
    switch (activeTab) {
      case "analytics":
        return <AnalyticsView temp={tempValue} gas={gasValue} gsr={gsrValue} />;
      case "alerts":
        return <AlertsView healthStatus={healthStatus} />;
      case "profile":
        return <ProfileView />;
      case "settings":
        return <SettingsView />;
      case "help":
        return <HelpView />;
      case "dashboard":
      default:
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <StatusHero status={healthStatus} />
              <Button 
                onClick={device ? disconnectBluetooth : connectBluetooth}
                variant={device ? "destructive" : "default"}
                disabled={isScanning}
                className={!device && !isScanning ? "bg-emerald-500 hover:bg-emerald-600 text-white" : ""}
              >
                {isScanning ? "Memindai..." : device ? "Disconnect ESP32" : "Hubungkan ESP32"}
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <BiometricCard 
                title="pH Kulit" 
                value={phValue} 
                unit="pH" 
                trend={phTrend} 
                status={getPhStatus(phValue)} 
                icon={<Droplet className="text-emerald-600" />} 
                infoText="Menunjukkan tingkat keasaman kulit. pH > 6.0 meningkatkan risiko bakteri."
              />
              <BiometricCard 
                title="Gas" 
                value={gasValue} 
                unit="ppm" 
                trend={gasTrend} 
                status={getGasStatus(gasValue)} 
                icon={<Wind className="text-emerald-600" />} 
                infoText="Mendeteksi senyawa volatil. Nilai tinggi dapat mengindikasikan infeksi."
              />
              <BiometricCard 
                title="Suhu" 
                value={tempValue} 
                unit="°C" 
                trend={tempTrend} 
                status={getTempStatus(tempValue)} 
                icon={<Thermometer className="text-emerald-600" />} 
                infoText="Suhu permukaan kulit. Suhu tinggi dapat menandakan peradangan."
              />
              <BiometricCard 
                title="GSR" 
                value={gsrValue} 
                unit="kΩ" 
                trend={gsrTrend} 
                status={getGsrStatus(gsrValue)} 
                icon={<Zap className="text-emerald-600" />} 
                infoText="Galvanic Skin Response mengukur konduktivitas listrik kulit."
              />
            </div>
            
            <TimelineLog events={events} />
          </div> 
        );
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <DashboardSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        deviceStatus={device ? "online" : isScanning ? "syncing" : "offline"} 
        onGenerateReport={handleGenerateReport}
      />
      
      <div className="flex-1 flex flex-col">
        <MobileHeader 
          deviceStatus={device ? "online" : "offline"} 
          onGenerateReport={handleGenerateReport}
        />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {renderMainContent()}
        </main>
      </div>

      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="bg-white border-slate-200 text-slate-900">
          <DialogHeader>
            <DialogTitle>Buat Laporan Kesehatan</DialogTitle>
          </DialogHeader>
          <div className="py-4 text-sm text-slate-500">
            Laporan kesehatan sedang disiapkan berdasarkan data sensor biometrik Anda.
          </div>
          <Button 
            onClick={() => setShowReportDialog(false)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white"
          >
            Unduh PDF
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
