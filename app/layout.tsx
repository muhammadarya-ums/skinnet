import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono"
})

export const metadata: Metadata = {
  title: 'SkinNet-Bio | Analisis Biometrik Kulit Canggih',
  description: 'Solusi IoT terintegrasi untuk pemantauan kesehatan kulit, stres, dan faktor lingkungan secara real-time menggunakan sensor biometrik presisi tinggi.',
  icons: {
    // Kita arahkan ke satu file saja yang pasti ada
    icon: '/skinnet.png',
    shortcut: '/skinnet.png',
    apple: '/skinnet.png',
  },
}
export const viewport: Viewport = {
  themeColor: '#22C55E',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className="bg-slate-50">
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased bg-slate-50 text-slate-900`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
