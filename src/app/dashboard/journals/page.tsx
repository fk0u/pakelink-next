"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, CheckCircle, Clock, FileEdit, Plus } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import { AddJournalDialog } from "@/components/journals/add-journal-dialog";

// Interface untuk data jurnal kegiatan
interface JournalEntry {
  id: string;
  date: string;
  title: string;
  description: string;
  status: "draft" | "submitted" | "approved" | "rejected";
  feedback?: string;
  activities?: string;
  reflection?: string;
}

// Data sampel untuk jurnal kegiatan
const sampleJournalEntries: JournalEntry[] = [
  {
    id: "journal-1",
    date: "2025-08-28",
    title: "Orientasi Tempat PKL",
    description: "Mengikuti orientasi tempat PKL, pengenalan lingkungan kerja, dan penjelasan tugas.",
    status: "approved",
    feedback: "Bagus, deskripsi lengkap dan informatif.",
  },
  {
    id: "journal-2",
    date: "2025-08-29",
    title: "Pengenalan Tim Kerja",
    description: "Berkenalan dengan tim development dan mempelajari alur kerja proyek.",
    status: "approved",
    feedback: "Teruskan, interaksi dengan tim sangat penting.",
  },
  {
    id: "journal-3",
    date: "2025-08-30",
    title: "Pembelajaran Framework",
    description: "Mempelajari React.js dan Next.js untuk pengembangan aplikasi web.",
    status: "approved",
  },
  {
    id: "journal-4",
    date: "2025-09-01",
    title: "Implementasi Fitur Login",
    description: "Mengerjakan implementasi fitur login dengan autentikasi JWT.",
    status: "submitted",
  },
  {
    id: "journal-5",
    date: "2025-09-02",
    title: "Pengembangan UI Dashboard",
    description: "Membuat komponen UI untuk dashboard dengan Tailwind CSS.",
    status: "draft",
  },
];

export default function JournalsPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [journalEntries, setJournalEntries] = useLocalStorage<JournalEntry[]>("user-journals", sampleJournalEntries);

  // Function to add a new journal entry
  const handleAddJournal = (journal: JournalEntry) => {
    setJournalEntries([journal, ...journalEntries]);
  };

  // Filter entries based on active tab
  const filteredEntries = activeTab === "all" 
    ? journalEntries 
    : journalEntries.filter(entry => entry.status === activeTab);

  // Get appropriate badge for status
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

  // Submit a journal entry
  const handleSubmitJournal = (id: string) => {
    setJournalEntries(
      journalEntries.map(entry =>
        entry.id === id ? { ...entry, status: "submitted" } : entry
      )
    );
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Jurnal Kegiatan PKL</h1>
        <AddJournalDialog onAddJournal={handleAddJournal} />
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-2">
          <TabsTrigger value="all">Semua</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="submitted">Terkirim</TabsTrigger>
          <TabsTrigger value="approved">Disetujui</TabsTrigger>
          <TabsTrigger value="rejected">Ditolak</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab} className="mt-6">
          <div className="grid gap-6">
            {filteredEntries.length > 0 ? (
              filteredEntries.map((entry) => (
                <Card key={entry.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{entry.title}</CardTitle>
                        <CardDescription className="flex items-center text-sm mt-1">
                          <CalendarIcon className="mr-1 h-4 w-4" />
                          {format(new Date(entry.date), "dd MMMM yyyy")}
                        </CardDescription>
                      </div>
                      {getStatusBadge(entry.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <p className="text-gray-700">{entry.description}</p>
                    
                    {entry.feedback && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm font-medium text-blue-900 mb-1">Umpan Balik Pembimbing:</p>
                        <p className="text-sm text-blue-800">{entry.feedback}</p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0">
                    <div className="text-sm text-gray-500 flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      {entry.status === "approved" ? "Disetujui" : 
                       entry.status === "submitted" ? "Menunggu persetujuan" : 
                       entry.status === "rejected" ? "Perlu direvisi" : "Draft"}
                    </div>
                    <div className="flex gap-2">
                      {entry.status === "draft" && (
                        <>
                          <Button size="sm" variant="outline" className="text-xs">
                            <FileEdit className="mr-1 h-3 w-3" />
                            Edit
                          </Button>
                          <Button 
                            size="sm" 
                            className="text-xs"
                            onClick={() => handleSubmitJournal(entry.id)}
                          >
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Kirim
                          </Button>
                        </>
                      )}
                      {entry.status === "rejected" && (
                        <Button size="sm" variant="outline" className="text-xs">
                          <FileEdit className="mr-1 h-3 w-3" />
                          Revisi
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">Tidak ada jurnal untuk ditampilkan</p>
                <Button variant="outline" className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Buat Jurnal Baru
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
