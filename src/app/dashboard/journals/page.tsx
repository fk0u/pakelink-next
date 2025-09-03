"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, CheckCircle, Clock, FileEdit, Plus } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { id } from "date-fns/locale";

// Interface untuk data jurnal kegiatan
interface JournalEntry {
  id: string;
  date: string;
  title: string;
  description: string;
  status: "draft" | "submitted" | "approved" | "rejected";
  feedback?: string;
}

// Data sampel untuk jurnal kegiatan
const sampleJournalEntries: JournalEntry[] = [
  {
    id: "journal-1",
    date: "2025-08-28",
    title: "Orientasi Tempat PKL",
    description: "Mengikuti orientasi tempat PKL, pengenalan lingkungan kerja, dan penjelasan tugas yang akan dilakukan selama program PKL.",
    status: "approved",
    feedback: "Bagus, deskripsi lengkap dan informatif.",
  },
  {
    id: "journal-2",
    date: "2025-08-29",
    title: "Pengenalan Tim Kerja",
    description: "Berkenalan dengan tim development, mengenal struktur organisasi, dan mempelajari alur kerja proyek yang sedang berjalan.",
    status: "approved",
    feedback: "Teruskan, interaksi dengan tim sangat penting.",
  },
  {
    id: "journal-3",
    date: "2025-08-30",
    title: "Pembelajaran Framework",
    description: "Mempelajari React.js dan Next.js sebagai framework yang digunakan di perusahaan untuk pengembangan aplikasi web.",
    status: "approved",
  },
  {
    id: "journal-4",
    date: "2025-09-01",
    title: "Implementasi Fitur Login",
    description: "Mengerjakan implementasi fitur login dengan autentikasi JWT dan integrasi dengan backend API.",
    status: "submitted",
  },
  {
    id: "journal-5",
    date: "2025-09-02",
    title: "Pengembangan UI Dashboard",
    description: "Membuat komponen UI untuk dashboard dengan menggunakan Tailwind CSS dan Shadcn UI.",
    status: "draft",
  },
];

export default function JournalsPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(sampleJournalEntries);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newEntry, setNewEntry] = useState<Partial<JournalEntry>>({
    date: format(new Date(), "yyyy-MM-dd"),
    title: "",
    description: "",
    status: "draft"
  });

  const filteredEntries = activeTab === "all" 
    ? journalEntries 
    : journalEntries.filter(entry => entry.status === activeTab);

  const handleAddEntry = () => {
    if (newEntry.title && newEntry.description) {
      const entry: JournalEntry = {
        id: `journal-${Date.now()}`,
        date: newEntry.date || format(new Date(), "yyyy-MM-dd"),
        title: newEntry.title,
        description: newEntry.description,
        status: "draft"
      };
      
      setJournalEntries([entry, ...journalEntries]);
      setNewEntry({
        date: format(new Date(), "yyyy-MM-dd"),
        title: "",
        description: "",
        status: "draft"
      });
      setIsAddDialogOpen(false);
    }
  };

  const handleSubmitEntry = (id: string) => {
    setJournalEntries(
      journalEntries.map(entry => 
        entry.id === id ? { ...entry, status: "submitted" } : entry
      )
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="outline" className="bg-gray-100">Draft</Badge>;
      case "submitted":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Terkirim</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-green-100 text-green-800">Disetujui</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-100 text-red-800">Ditolak</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Jurnal Kegiatan PKL</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Jurnal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Jurnal Kegiatan</DialogTitle>
              <DialogDescription>
                Isi form berikut untuk menambahkan jurnal kegiatan PKL Anda.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="date">Tanggal</Label>
                <div className="flex">
                  <Input
                    id="date"
                    type="date"
                    value={newEntry.date}
                    onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                  />
                  <div className="ml-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setNewEntry({ ...newEntry, date: format(new Date(), "yyyy-MM-dd") })}
                    >
                      Hari Ini
                    </Button>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Judul Kegiatan</Label>
                <Input
                  id="title"
                  placeholder="Masukkan judul kegiatan"
                  value={newEntry.title}
                  onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi Kegiatan</Label>
                <Textarea
                  id="description"
                  placeholder="Jelaskan kegiatan yang Anda lakukan..."
                  rows={5}
                  value={newEntry.description}
                  onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleAddEntry}>Simpan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Semua</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="submitted">Terkirim</TabsTrigger>
          <TabsTrigger value="approved">Disetujui</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab} className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {filteredEntries.length > 0 ? (
              filteredEntries.map((entry) => (
                <Card key={entry.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{entry.title}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          {format(new Date(entry.date), "dd MMMM yyyy", { locale: id })}
                        </CardDescription>
                      </div>
                      {getStatusBadge(entry.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{entry.description}</p>
                    {entry.feedback && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-md">
                        <p className="text-xs font-semibold text-blue-700">Feedback Pembimbing:</p>
                        <p className="text-sm mt-1">{entry.feedback}</p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <p className="text-xs text-gray-500">
                      {entry.status === "approved" ? (
                        <span className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                          Disetujui
                        </span>
                      ) : entry.status === "submitted" ? (
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-blue-600" />
                          Menunggu persetujuan
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <FileEdit className="h-4 w-4 mr-1 text-gray-600" />
                          Draft
                        </span>
                      )}
                    </p>
                    <div className="space-x-2">
                      {entry.status === "draft" && (
                        <>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button size="sm" onClick={() => handleSubmitEntry(entry.id)}>
                            Kirim
                          </Button>
                        </>
                      )}
                      {entry.status === "submitted" && (
                        <Button variant="outline" size="sm" disabled>
                          Sedang Diproses
                        </Button>
                      )}
                      {entry.status === "approved" && (
                        <Button variant="outline" size="sm">
                          Lihat Detail
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="md:col-span-2 p-12 text-center">
                <p className="text-gray-500">Tidak ada jurnal ditemukan.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
