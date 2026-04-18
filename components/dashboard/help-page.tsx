"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Search, Mail, MessageSquare } from "lucide-react"

// 1. TAMBAHKAN 'default' agar bisa di-import di page.tsx
export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const faqs = [
    {
      id: "1",
      question: "Bagaimana cara menyambungkan alat ESP32?",
      answer:
        "Untuk menyambungkan SkinNET Bio: 1) Pastikan Bluetooth aktif, 2) Klik tombol 'Connect ESP32' di Dashboard, 3) Pilih perangkat SkinNET Bio. Status akan berubah menjadi 'Online' jika berhasil.",
    },
    {
      id: "2",
      question: "Apa itu GSR (Galvanic Skin Response)?",
      answer:
        "GSR mengukur konduktivitas listrik kulit yang dipengaruhi oleh aktivitas kelenjar keringat. Dalam proyek ini, GSR digunakan untuk mendeteksi respons stres atau indikasi awal infeksi bakteri. Rentang normal: 40-60 kΩ.",
    },
    {
      id: "3",
      question: "Mengapa pH kulit penting untuk deteksi dini?",
      answer:
        "Kulit sehat memiliki pH asam (4.5-6.0). Jika pH naik di atas 6.0, kulit menjadi lingkungan yang baik bagi bakteri seperti MRSA untuk berkembang. Alat ini memantau perubahan pH tersebut secara real-time.",
    },
    {
      id: "4",
      question: "Apa yang harus dilakukan jika muncul 'Critical Alert'?",
      answer:
        "Critical Alert muncul jika sensor mendeteksi parameter di luar batas aman. 1) Cek posisi sensor pada kulit, 2) Pastikan alat tidak longgar, 3) Jika gejala fisik muncul, segera konsultasikan ke tim medis.",
    },
  ]

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Cari bantuan atau FAQ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-white border-border"
        />
      </div>

      {/* FAQ Section */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Pusat Bantuan SkinNET Bio</h2>
        <Card className="bg-white border-border shadow-sm">
          <CardContent className="pt-6">
            {filteredFaqs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id} className="border-border">
                    <AccordionTrigger className="hover:no-underline hover:bg-slate-50 px-2 py-3 rounded text-left">
                      <span className="text-sm font-medium text-foreground">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground pb-3 px-2">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                Tidak ada hasil untuk "{searchQuery}"
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Contact Section */}
      <Card className="bg-blue-50/50 border-blue-100 shadow-none">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            Butuh Bantuan Lebih Lanjut?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-slate-600">
            Jika kamu mengalami kendala teknis pada hardware ESP32 atau dashboard ini, silakan hubungi tim pengembang.
          </p>
          
          <div className="flex flex-col gap-2 pt-2">
            <Button className="w-full sm:w-fit bg-blue-600 hover:bg-blue-700 text-white">
              <Mail className="w-4 h-4 mr-2" />
              Hubungi Pengembang
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}