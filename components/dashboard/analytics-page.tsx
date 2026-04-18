"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, AreaChart, Area, RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Thermometer, Zap, Wind } from "lucide-react"

interface AnalyticsProps {
  temp: number
  gas: number
  gsr: number
}

interface ChartDataPoint {
  time: string
  temperature: number
  gsr: number
  gas: number
}

// 1. TAMBAHKAN 'default' SETELAH 'export'
export default function AnalyticsPage({ temp, gas, gsr }: AnalyticsProps) {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])
  const [healthScore, setHealthScore] = useState({ score: 82, trend: "↑ +2%" })

  // 2. LOGIC: Update chart saat ada data sensor baru masuk dari props
  useEffect(() => {
    const now = new Date()
    const timeLabel = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    
    const newDataPoint = {
      time: timeLabel,
      temperature: temp,
      gsr: gsr,
      gas: gas
    }

    setChartData(prev => {
      const updated = [...prev, newDataPoint]
      if (updated.length > 20) return updated.slice(1) // Simpan 20 data terakhir saja
      return updated
    })

    // Update Health Score sederhana berdasarkan data sensor
    const score = Math.round(100 - (gas / 10) - (Math.abs(36.5 - temp) * 5))
    setHealthScore({ score: Math.max(0, score), trend: score > 80 ? "Condition: Good" : "Condition: Check Device" })
    
  }, [temp, gas, gsr]) // Beraksi setiap kali data sensor berubah

  const kpis = [
    {
      label: "Current Temperature",
      value: `${temp.toFixed(1)}°C`,
      change: temp > 37.5 ? "Elevated" : "Normal",
      icon: <Thermometer className="w-5 h-5" />,
    },
    {
      label: "GSR Impedance",
      value: `${gsr.toFixed(1)} kΩ`,
      change: "Active Reading",
      icon: <Zap className="w-5 h-5" />,
    },
    {
      label: "Gas Level",
      value: `${gas.toFixed(0)} ppm`,
      change: gas > 60 ? "Alert" : "Clean",
      icon: <Wind className="w-5 h-5" />,
    },
  ]

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {kpis.map((kpi, idx) => (
          <Card key={idx} className="bg-white border-border shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.label}</CardTitle>
                <div className="text-primary">{kpi.icon}</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
              <p className={`text-xs mt-2 ${kpi.change === 'Normal' || kpi.change === 'Clean' ? 'text-emerald-500' : 'text-amber-500'}`}>
                {kpi.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 bg-white border-border shadow-sm">
          <CardHeader><CardTitle className="text-base">Temperature Trend</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                <YAxis domain={[30, 45]} hide />
                <Tooltip />
                <Area type="monotone" dataKey="temperature" stroke="#6366f1" fill="url(#tempGradient)" strokeWidth={2} isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1 bg-white border-border shadow-sm">
          <CardHeader><CardTitle className="text-base">GSR & Gas Levels</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData}>
                <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                <YAxis hide />
                <Tooltip />
                <Line type="monotone" dataKey="gsr" stroke="#10b981" strokeWidth={2} dot={false} isAnimationActive={false} />
                <Line type="monotone" dataKey="gas" stroke="#f59e0b" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white border-border shadow-sm">
          <CardHeader><CardTitle className="text-base">AI Health Score</CardTitle></CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-4">
            <div className="relative w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" barSize={10} 
                   data={[{ name: "Health", value: healthScore.score, fill: "#10b981" }]}>
                  <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                  <RadialBar background dataKey="value" angleAxisId={0} cornerRadius={10} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">{healthScore.score}</span>
                <span className="text-xs text-muted-foreground">Index</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">{healthScore.trend}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}