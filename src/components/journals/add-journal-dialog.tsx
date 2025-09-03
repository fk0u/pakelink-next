"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

// Journal interface
interface Journal {
  id: string;
  date: string;
  title: string;
  description: string;
  activities: string;
  reflection: string;
  status: "draft" | "submitted" | "approved" | "rejected";
  feedback?: string;
  attachments?: string[];
}

interface AddJournalDialogProps {
  onAddJournal: (journal: Journal) => void;
}

export function AddJournalDialog({ onAddJournal }: AddJournalDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    title: "",
    description: "",
    activities: "",
    reflection: ""
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newJournal: Journal = {
      id: crypto.randomUUID(),
      date: formData.date,
      title: formData.title,
      description: formData.description,
      activities: formData.activities,
      reflection: formData.reflection,
      status: "draft"
    };
    
    onAddJournal(newJournal);
    
    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      title: "",
      description: "",
      activities: "",
      reflection: ""
    });
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Jurnal Kegiatan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Tambah Jurnal Kegiatan Baru</DialogTitle>
          <DialogDescription>
            Tuliskan jurnal kegiatan PKL Anda hari ini. Klik simpan setelah selesai.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date">Tanggal</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="title">Judul Kegiatan</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Judul singkat kegiatan"
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Deskripsi Singkat</Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                placeholder="Deskripsi singkat kegiatan hari ini"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="activities">Detail Kegiatan</Label>
              <Textarea
                id="activities"
                name="activities"
                value={formData.activities}
                onChange={handleInputChange}
                required
                placeholder="Tuliskan detail kegiatan yang dilakukan"
                className="min-h-[100px]"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="reflection">Refleksi & Pembelajaran</Label>
              <Textarea
                id="reflection"
                name="reflection"
                value={formData.reflection}
                onChange={handleInputChange}
                placeholder="Tuliskan refleksi dan pembelajaran dari kegiatan hari ini"
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Batal</Button>
            </DialogClose>
            <Button type="submit">Simpan Jurnal</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
