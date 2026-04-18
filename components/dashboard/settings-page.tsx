"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Zap, Bell, Moon, Database } from "lucide-react"

interface SettingOption {
  id: string
  label: string
  description: string
  icon: React.ReactNode
}

// TAMBAHKAN 'default' di sini agar import di page.tsx berhasil
export default function SettingsPage() {
  const [settings, setSettings] = useState({
    aiProcessing: true,
    pushNotifications: true,
    darkMode: false,
    samplingRate: "high",
  })

  const handleToggle = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }))
  }

  const handleSamplingChange = (value: string) => {
    setSettings((prev) => ({
      ...prev,
      samplingRate: value,
    }))
  }

  const settingCategories: Record<string, SettingOption[]> = {
    Processing: [
      {
        id: "aiProcessing",
        label: "Real-time AI Processing",
        description: "Gunakan model ANN untuk deteksi anomali pada sensor secara langsung.",
        icon: <Zap className="w-5 h-5" />,
      },
    ],
    Notifications: [
      {
        id: "pushNotifications",
        label: "Push Notifications",
        description: "Dapatkan peringatan instan jika terdeteksi indikasi infeksi.",
        icon: <Bell className="w-5 h-5" />,
      },
    ],
    Appearance: [
      {
        id: "darkMode",
        label: "Dark Mode",
        description: "Ubah tampilan dashboard menjadi mode gelap.",
        icon: <Moon className="w-5 h-5" />,
      },
    ],
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Toggle Settings */}
      {Object.entries(settingCategories).map(([category, options]) => (
        <div key={category}>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
            {category}
          </h3>
          <Card className="bg-white border-border shadow-sm">
            {options.map((option, idx) => (
              <div
                key={option.id}
                className={`p-4 flex items-center justify-between ${
                  idx !== options.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-primary">{option.icon}</div>
                  <div>
                    <Label className="text-sm font-medium text-foreground cursor-pointer">
                      {option.label}
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
                  </div>
                </div>
                <Switch
                  checked={settings[option.id as keyof typeof settings] as boolean}
                  onCheckedChange={() => handleToggle(option.id)}
                />
              </div>
            ))}
          </Card>
        </div>
      ))}

      {/* Data Settings */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
          Data Management
        </h3>
        <Card className="bg-white border-border shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-primary" />
              <div>
                <CardTitle className="text-sm">Data Sampling Rate</CardTitle>
                <CardDescription className="text-xs">
                  Semakin tinggi rate, semakin akurat namun baterai ESP32 lebih cepat habis.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Select value={settings.samplingRate} onValueChange={handleSamplingChange}>
              <SelectTrigger className="w-full bg-white border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low (1 sample/minute)</SelectItem>
                <SelectItem value="medium">Medium (2 samples/minute)</SelectItem>
                <SelectItem value="high">High (4 samples/minute)</SelectItem>
                <SelectItem value="ultra">Ultra (10 samples/minute)</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* Information Section */}
      <Card className="bg-slate-50 border-slate-200 shadow-none">
        <CardHeader>
          <CardTitle className="text-sm text-slate-700">Penyimpanan & Privasi</CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-muted-foreground space-y-2">
          <p>
            Semua data biometrik (pH, Suhu, GSR, Gas) dienkripsi dan disimpan secara lokal pada sesi aktif ini. 
          </p>
          <p>
            Sistem saat ini menggunakan mode simulasi cerdas untuk optimasi daya tahan sensor.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}