"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Thermometer,
  Wind,
  Droplet,
  Zap,
  Menu,
  X,
  Fingerprint,
  Cpu,
  Bluetooth,
  Activity,
  ChevronRight,
  Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { AuthModal } from "@/components/landing/auth-modal"
import { DeviceStatusIndicator } from "@/components/landing/device-status"
// IMPORT HELPER BLUETOOTH
import { connectBluetooth } from "../helpers/bluetooth"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const sensorCards = [
  {
    title: "Analisis Termal",
    sensor: "MLX90614",
    description: "Termometer infrared berkualitas medis untuk pemantauan suhu tubuh dengan akurasi ±0.2°C.",
    icon: Thermometer,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600"
  },
  {
    title: "Deteksi Kimia",
    sensor: "CCS811",
    description: "Sensor gas TVOC canggih untuk analisis kualitas udara dan deteksi senyawa organik volatil.",
    icon: Wind,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600"
  },
  {
    title: "Pemantauan pH Kulit",
    sensor: "TCS3200",
    description: "Pemantauan keasaman kulit non-invasif menggunakan teknologi analisis pH berbasis warna.",
    icon: Droplet,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600"
  },
  {
    title: "Pelacakan Stres",
    sensor: "Modul GSR",
    description: "Sensor Galvanic Skin Response untuk tingkat hidrasi dan deteksi stres secara real-time.",
    icon: Zap,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600"
  }
]

const techStack = [
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "Tailwind CSS", icon: "🎨" },
  { name: "ESP32", icon: "🔌" },
  { name: "Web Bluetooth", icon: "📡" }
]

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  // LOGIKA KONEKSI BLUETOOTH
  const handleConnect = async () => {
    const char = await connectBluetooth();
    if (char) {
      // Jika berhasil connect, arahkan ke dashboard
      window.location.href = "/dashboard";
    } else {
      // Opsional: tampilkan toast error jika gagal
      console.log("Gagal menghubungkan perangkat.");
    }
  }

  const handleGuestAccess = () => {
    window.location.href = "/dashboard"
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
      <DeviceStatusIndicator />

      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-500">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">SkinNET Bio</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#penelitian" className="text-slate-600 hover:text-emerald-600 transition-colors">Penelitian</a>
              <a href="#sensor" className="text-slate-600 hover:text-emerald-600 transition-colors">Sensor</a>
              <a href="#teknologi" className="text-slate-600 hover:text-emerald-600 transition-colors">Teknologi</a>
              <Button 
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                Mulai Sekarang
              </Button>
            </div>

            <button 
              className="md:hidden text-slate-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                Pemantauan Biometrik Generasi Baru
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-slate-900"
            >
              Inovasi Teknologi Medis:
              <br />
              <span className="text-emerald-600">Transformasi Digital Perawatan Luka Diabetes</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto"
            >
              Solusi IoT terintegrasi untuk memantau suhu, tingkat pH, dan kondisi lingkungan guna mendukung proses penyembuhan yang lebih terukur.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg"
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-lg shadow-lg shadow-emerald-500/25"
              >
                <Fingerprint className="h-5 w-5 mr-2" />
                Login Member
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                onClick={handleGuestAccess}
                className="border-slate-300 text-slate-700 hover:bg-slate-100 px-8 py-6 text-lg"
              >
                Coba sebagai Tamu
                <ChevronRight className="h-5 w-5 ml-1" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 relative"
          >
            <div className="relative max-w-4xl mx-auto">
              <div className="relative bg-white rounded-2xl border border-slate-200 shadow-xl p-8 overflow-hidden">
                <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "pH Kulit", value: "5.5", unit: "pH", status: "Dalam Rentang" },
                    { label: "Suhu", value: "36.5", unit: "°C", status: "Dalam Rentang" },
                    { label: "Level Gas", value: "45", unit: "ppm", status: "Dalam Rentang" },
                    { label: "GSR", value: "45.8", unit: "kΩ", status: "Dalam Rentang" }
                  ].map((metric, i) => (
                    <motion.div 
                      key={metric.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm"
                    >
                      <p className="text-slate-500 text-sm mb-1">{metric.label}</p>
                      <p className="text-3xl font-bold text-emerald-600">
                        {metric.value}
                        <span className="text-sm text-slate-400 ml-1 font-normal">{metric.unit}</span>
                      </p>
                      <span className="inline-block mt-2 px-2 py-0.5 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-full border border-emerald-200">
                        {metric.status}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sensors Section */}
      <section id="sensor" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <span className="text-emerald-600 text-sm font-medium tracking-wider uppercase">Teknologi Sensor</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-slate-900">
            Sensor Biometrik <span className="text-emerald-600">Presisi Tinggi</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {sensorCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${card.iconBg} ${card.iconColor} mb-4`}>
                <card.icon className="h-6 w-6" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-semibold text-slate-900">{card.title}</h3>
                <span className="px-2 py-0.5 rounded text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200">
                  {card.sensor}
                </span>
              </div>
              <p className="text-slate-600">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section (Bluetooth Hub) */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl border border-emerald-200 p-12 overflow-hidden"
          >
            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500 text-white mb-6">
                <Cpu className="h-8 w-8" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900">Siap Memantau Kesehatan Kulit?</h2>
              <p className="text-slate-600 text-lg mb-8 max-w-xl mx-auto">
                Hubungkan perangkat ESP32 Anda dan mulai lacak data biometrik secara real-time.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {/* TOMBOL YANG SUDAH TERKONEKSI */}
                <Button 
                  size="lg"
                  onClick={handleConnect}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 shadow-lg shadow-emerald-500/25"
                >
                  <Bluetooth className="h-5 w-5 mr-2" />
                  Hubungkan Perangkat
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={handleGuestAccess}
                  className="border-slate-300 text-slate-700 hover:bg-white"
                >
                  Lihat Demo Dashboard
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  )
}