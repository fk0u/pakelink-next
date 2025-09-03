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
import { Plus } from "lucide-react";
// Use crypto.randomUUID() instead of uuid package

// Company interface
interface Company {
  id: string;
  name: string;
  logo?: string;
  address: string;
  city: string;
  category: string;
  phone?: string;
  website?: string;
  totalStudents: number;
  currentStudents: number;
  status: "active" | "inactive" | "pending";
  rating?: number;
  contactPerson?: {
    name: string;
    position: string;
    phone?: string;
    email?: string;
  };
}

interface AddCompanyDialogProps {
  onAddCompany: (company: Company) => void;
}

export function AddCompanyDialog({ onAddCompany }: AddCompanyDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    category: "",
    phone: "",
    website: "",
    contactPersonName: "",
    contactPersonPosition: "",
    contactPersonPhone: "",
    contactPersonEmail: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newCompany: Company = {
      id: crypto.randomUUID(),
      name: formData.name,
      address: formData.address,
      city: formData.city,
      category: formData.category,
      phone: formData.phone,
      website: formData.website,
      totalStudents: 0,
      currentStudents: 0,
      status: "pending",
      contactPerson: {
        name: formData.contactPersonName,
        position: formData.contactPersonPosition,
        phone: formData.contactPersonPhone,
        email: formData.contactPersonEmail,
      },
    };
    
    onAddCompany(newCompany);
    
    // Reset form
    setFormData({
      name: "",
      address: "",
      city: "",
      category: "",
      phone: "",
      website: "",
      contactPersonName: "",
      contactPersonPosition: "",
      contactPersonPhone: "",
      contactPersonEmail: "",
    });
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Tempat PKL
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Tambah Tempat PKL Baru</DialogTitle>
          <DialogDescription>
            Lengkapi informasi tempat PKL yang ingin Anda tambahkan. Klik simpan setelah selesai.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="name">Nama Perusahaan / Instansi</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="address">Alamat</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="city">Kota</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Kategori / Bidang</Label>
                <Input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="phone">Telepon</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="pt-2">
              <h4 className="text-sm font-medium mb-2">Kontak Person</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="contactPersonName">Nama</Label>
                  <Input
                    id="contactPersonName"
                    name="contactPersonName"
                    value={formData.contactPersonName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contactPersonPosition">Jabatan</Label>
                  <Input
                    id="contactPersonPosition"
                    name="contactPersonPosition"
                    value={formData.contactPersonPosition}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="grid gap-2">
                  <Label htmlFor="contactPersonPhone">Telepon</Label>
                  <Input
                    id="contactPersonPhone"
                    name="contactPersonPhone"
                    value={formData.contactPersonPhone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contactPersonEmail">Email</Label>
                  <Input
                    id="contactPersonEmail"
                    name="contactPersonEmail"
                    value={formData.contactPersonEmail}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Batal</Button>
            </DialogClose>
            <Button type="submit">Simpan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
