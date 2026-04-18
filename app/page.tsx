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

  const handleGuestAccess = () => {
    window.location.href = "/dashboard"
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
      {/* Device Status Indicator */}
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
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-500">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">
                SkinNET Bio
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#penelitian" className="text-slate-600 hover:text-emerald-600 transition-colors">
                Penelitian
              </a>
              <a href="#sensor" className="text-slate-600 hover:text-emerald-600 transition-colors">
                Sensor
              </a>
              <a href="#teknologi" className="text-slate-600 hover:text-emerald-600 transition-colors">
                Teknologi
              </a>
              <Button 
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                Mulai Sekarang
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-slate-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-200"
          >
            <div className="px-4 py-4 space-y-3">
              <a href="#penelitian" className="block text-slate-600 hover:text-emerald-600 py-2">Penelitian</a>
              <a href="#sensor" className="block text-slate-600 hover:text-emerald-600 py-2">Sensor</a>
              <a href="#teknologi" className="block text-slate-600 hover:text-emerald-600 py-2">Teknologi</a>
              <Button 
                onClick={() => setIsAuthModalOpen(true)}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                Mulai Sekarang
              </Button>
            </div>
          </motion.div>
        )}
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
              Analisis Biometrik Kulit
              <br />
              <span className="text-emerald-600">
                Canggih di Ujung Jari Anda
              </span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto"
            >
              Solusi IoT terintegrasi untuk pemantauan kesehatan kulit, stres, 
              dan faktor lingkungan secara real-time menggunakan sensor biometrik presisi tinggi.
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
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

          {/* Hero Visual - Dashboard Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 relative"
          >
            <div className="relative max-w-4xl mx-auto">
              <div className="relative bg-white rounded-2xl border border-slate-200 shadow-xl p-8 overflow-hidden">
                {/* Mock Dashboard Preview */}
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

      {/* Research Section */}
      <section id="penelitian" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-emerald-600 text-sm font-medium tracking-wider uppercase">Misi Kami</span>
              <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-6 text-slate-900">
                Menjembatani IoT dan 
                <span className="text-emerald-600"> Perawatan Dermatologi</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Kulit adalah organ terbesar tubuh kita, namun kesehatannya sering diabaikan. SkinNet-Bio menjembatani 
                kesenjangan antara IoT dan pemantauan dermatologi proaktif, memungkinkan deteksi dini 
                kondisi kulit dan stresor lingkungan.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed">
                Penelitian kami berfokus pada penginderaan biometrik non-invasif untuk memberikan wawasan kesehatan 
                berkelanjutan tanpa mengganggu kehidupan sehari-hari Anda.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-8">
                {/* Biometric Scan Visual */}
                <div className="aspect-square relative flex items-center justify-center">
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute w-64 h-64 rounded-full bg-emerald-200/50"
                  />
                  <motion.div 
                    animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="absolute w-48 h-48 rounded-full bg-emerald-300/50"
                  />
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute w-56 h-56 rounded-full border-2 border-emerald-400/30 border-dashed"
                  />
                  <div className="relative bg-white rounded-full p-6 shadow-lg">
                    <Fingerprint className="h-20 w-20 text-emerald-500" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sensors Section */}
      <section id="sensor" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-emerald-600 text-sm font-medium tracking-wider uppercase">Teknologi Sensor</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-slate-900">
              Sensor Biometrik 
              <span className="text-emerald-600"> Presisi Tinggi</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
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
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="teknologi" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-emerald-600 text-sm font-medium tracking-wider uppercase">Dibangun Dengan</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-slate-900">
              Teknologi 
              <span className="text-emerald-600"> Modern</span>
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="flex items-center gap-3 px-6 py-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-sm transition-all"
              >
                <span className="text-2xl">{tech.icon}</span>
                <span className="text-slate-700 font-medium">{tech.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
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
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900">
                Siap Memantau Kesehatan Kulit Anda?
              </h2>
              <p className="text-slate-600 text-lg mb-8 max-w-xl mx-auto">
                Hubungkan perangkat ESP32 Anda dan mulai lacak data biometrik Anda secara real-time.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  size="lg"
                  onClick={() => setIsAuthModalOpen(true)}
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

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500">
                <Activity className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-900">SkinNET Bio</span>
            </div>
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} SkinNet-Bio. Analisis Biometrik Kulit Canggih.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-slate-500 hover:text-emerald-600 text-sm transition-colors">Privasi</a>
              <a href="#" className="text-slate-500 hover:text-emerald-600 text-sm transition-colors">Syarat</a>
              <a href="#" className="text-slate-500 hover:text-emerald-600 text-sm transition-colors">Kontak</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  )
}
