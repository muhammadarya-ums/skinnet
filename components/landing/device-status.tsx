"use client"

import { motion } from "framer-motion"
import { Bluetooth } from "lucide-react"

export function DeviceStatusIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-full border border-slate-200 shadow-lg">
        <div className="relative">
          {/* Blinking green dot */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-emerald-400/50"
          />
          <div className="relative w-3 h-3 rounded-full bg-emerald-500" />
        </div>
        <span className="text-sm text-slate-600 font-medium">Ready to Connect</span>
        <Bluetooth className="h-4 w-4 text-emerald-500" />
      </div>
    </motion.div>
  )
}
