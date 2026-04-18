"use client"

import React, { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Info } from "lucide-react"

interface BiometricCardProps {
  title: string
  value: number
  unit: string
  trend: number[]
  status: "normal" | "elevated" | "critical"
  infoText: string
  icon: React.ReactNode
}

const statusLabels = {
  normal: { label: "Dalam Rentang", class: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  elevated: { label: "Sedikit Tinggi", class: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  critical: { label: "Kritis", class: "bg-red-50 text-red-700 border-red-200" },
}

function Sparkline({ data, status, title }: { data: number[]; status: "normal" | "elevated" | "critical"; title: string }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const height = 40
  const width = 120

  const strokeColor = status === "normal" 
    ? "#22c55e"  // emerald-500
    : status === "elevated" 
    ? "#eab308"  // yellow-500
    : "#ef4444"  // red-500

  if (!isMounted) {
    return <div style={{ width: 120, height: 40 }} />
  }

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width
      const y = height - ((value - min) / range) * height
      return `${x},${y}`
    })
    .join(" ")

  const areaPath = `M0,${height} L${data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width
      const y = height - ((value - min) / range) * height
      return `${x},${y}`
    })
    .join(" L")} L${width},${height} Z`

  const gradientId = `gradient-${status}-${title.replace(/\s+/g, '').toLowerCase()}`

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={strokeColor} stopOpacity="0.2" />
          <stop offset="100%" stopColor={strokeColor} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradientId})`} />
      <polyline
        points={points}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={width}
        cy={height - ((data[data.length - 1] - min) / range) * height}
        r="4"
        fill={strokeColor}
      />
    </svg>
  )
}

export function BiometricCard({
  title,
  value,
  unit,
  trend,
  status,
  infoText,
  icon,
}: BiometricCardProps) {
  const statusConfig = statusLabels[status]

  return (
    <TooltipProvider>
      <div className="relative overflow-hidden bg-white rounded-xl border border-slate-200 p-6 hover:border-slate-300 transition-all hover:shadow-md">
        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100">
                {icon}
              </div>
              <span className="text-sm font-medium text-slate-600">
                {title}
              </span>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                  <Info className="w-4 h-4 text-slate-400" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-xs bg-white border-slate-200 text-slate-700 shadow-lg">
                <p>{infoText}</p>
              </TooltipContent>
            </Tooltip>
          </div>
          
          <div className="flex items-end justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold tracking-tight text-emerald-600">
                {value.toFixed(1)}
              </span>
              <span className="text-lg text-slate-400 font-medium">{unit}</span>
            </div>
            <Sparkline data={trend} status={status} title={title} />
          </div>
          
          <div className="mt-4">
            <div
              className={cn(
                "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border",
                statusConfig.class
              )}
            >
              {statusConfig.label}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
