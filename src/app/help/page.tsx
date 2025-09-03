"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, HelpCircle, MessageSquare, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col items-center text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Pusat Bantuan</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-6">
          Temukan informasi dan panduan untuk membantu Anda menggunakan PakeLink dengan lebih baik
        </p>
        
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Cari pertanyaan atau topik..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="faq">
            <HelpCircle className="h-4 w-4 mr-2" />
            FAQ
          </TabsTrigger>
          <TabsTrigger value="guides">
            <BookOpen className="h-4 w-4 mr-2" />
            Panduan
          </TabsTrigger>
          <TabsTrigger value="contact">
            <MessageSquare className="h-4 w-4 mr-2" />
            Kontak
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pertanyaan Umum</CardTitle>
              <CardDescription>
                Jawaban untuk pertanyaan yang sering diajukan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Apa itu PakeLink?</AccordionTrigger>
                  <AccordionContent>
                    PakeLink adalah platform pemendek tautan yang membantu Anda membuat tautan yang panjang menjadi lebih pendek, mudah diingat, dan dapat disesuaikan. Dengan PakeLink, Anda dapat melacak kinerja tautan Anda, melihat berapa banyak klik yang diterima, dan banyak lagi.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>Bagaimana cara membuat tautan pendek?</AccordionTrigger>
                  <AccordionContent>
                    Untuk membuat tautan pendek, cukup masuk ke dashboard Anda, klik tombol "Buat Tautan Baru", masukkan URL asli yang ingin Anda perpendek, dan secara opsional tambahkan nama kustom untuk tautan Anda. Klik "Buat" dan tautan pendek Anda siap digunakan!
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>Apakah PakeLink gratis?</AccordionTrigger>
                  <AccordionContent>
                    Ya, PakeLink menawarkan paket gratis dengan fitur dasar. Kami juga menyediakan paket premium dengan fitur tambahan seperti analitik lanjutan, kustomisasi lebih lanjut, dan banyak lagi.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>Bagaimana cara melihat statistik tautan saya?</AccordionTrigger>
                  <AccordionContent>
                    Anda dapat melihat statistik tautan dengan masuk ke dashboard Anda, memilih tautan yang ingin Anda lihat, dan mengklik "Lihat Statistik". Di sana Anda akan menemukan informasi seperti jumlah klik, lokasi pengunjung, perangkat yang digunakan, dan banyak lagi.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger>Bagaimana cara mengubah atau menghapus tautan?</AccordionTrigger>
                  <AccordionContent>
                    Untuk mengubah atau menghapus tautan, pergi ke dashboard Anda, cari tautan yang ingin Anda ubah, dan klik ikon pensil untuk mengedit atau ikon tempat sampah untuk menghapus. Perubahan akan langsung diterapkan.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="guides" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Panduan Pengguna</CardTitle>
              <CardDescription>
                Panduan langkah demi langkah untuk membantu Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <GuideCard
                  title="Memulai dengan PakeLink"
                  description="Panduan lengkap untuk pengguna baru"
                  href="/help/getting-started"
                />
                <GuideCard
                  title="Membuat Tautan Kustom"
                  description="Cara membuat dan menyesuaikan tautan Anda"
                  href="/help/custom-links"
                />
                <GuideCard
                  title="Analitik dan Laporan"
                  description="Memahami statistik dan data tautan Anda"
                  href="/help/analytics"
                />
                <GuideCard
                  title="Keamanan Akun"
                  description="Tips untuk menjaga keamanan akun Anda"
                  href="/help/security"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hubungi Kami</CardTitle>
              <CardDescription>
                Kami siap membantu jika Anda memiliki pertanyaan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Email Dukungan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Kirim pertanyaan Anda ke tim dukungan kami
                    </p>
                    <Button variant="outline" className="w-full">
                      support@pakelink.com
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Live Chat</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Hubungi kami langsung melalui live chat
                    </p>
                    <Button className="w-full">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Mulai Chat
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface GuideCardProps {
  title: string;
  description: string;
  href: string;
}

function GuideCard({ title, description, href }: GuideCardProps) {
  return (
    <Link href={href} className="block">
      <Card className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="ghost" className="pl-0">
            Baca Panduan
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
