"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Clock, FileCheck, FileText, Building2, Plus, Check, X } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Interface untuk data pengajuan PKL
interface Application {
  id: string;
  companyName: string;
  position: string;
  address: string;
  date: string;
  status: "draft" | "pending" | "approved" | "rejected";
  notes?: string;
}

// Data sampel untuk pengajuan PKL
const sampleApplications: Application[] = [
  {
    id: "app-1",
    companyName: "PT Teknologi Maju",
    position: "Web Developer",
    address: "Jl. Diponegoro No. 123, Samarinda",
    date: "2025-07-15",
    status: "approved",
    notes: "Diterima untuk program PKL selama 3 bulan."
  },
  {
    id: "app-2",
    companyName: "CV Digital Kreatif",
    position: "UI/UX Designer",
    address: "Jl. Gajah Mada No. 45, Samarinda",
    date: "2025-07-10",
    status: "rejected",
    notes: "Posisi sudah terisi penuh. Silakan coba perusahaan lain."
  },
  {
    id: "app-3",
    companyName: "PT Data Solusi",
    position: "IT Support",
    address: "Jl. Ahmad Yani No. 88, Samarinda",
    date: "2025-07-20",
    status: "pending",
    notes: "Menunggu konfirmasi dari pihak perusahaan."
  },
  {
    id: "app-4",
    companyName: "Startup Inovasi",
    position: "Mobile Developer",
    address: "Jl. Juanda No. 12, Samarinda",
    date: "2025-07-25",
    status: "draft"
  }
];

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [applications] = useState<Application[]>(sampleApplications);

  const filteredApplications = activeTab === "all" 
    ? applications 
    : applications.filter(app => app.status === activeTab);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="outline" className="bg-gray-100">Draft</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Menunggu</Badge>;
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
        <h1 className="text-3xl font-bold">Pengajuan Tempat PKL</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Buat Pengajuan
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Buat Pengajuan PKL Baru</DialogTitle>
              <DialogDescription>
                Fitur ini akan tersedia segera. Silakan hubungi guru pembimbing untuk membuat pengajuan PKL baru.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline">
                Tutup
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Semua</TabsTrigger>
          <TabsTrigger value="pending">Menunggu</TabsTrigger>
          <TabsTrigger value="approved">Disetujui</TabsTrigger>
          <TabsTrigger value="rejected">Ditolak</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab} className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {filteredApplications.length > 0 ? (
              filteredApplications.map((app) => (
                <Card key={app.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{app.companyName}</CardTitle>
                        <CardDescription className="mt-1">
                          {app.position}
                        </CardDescription>
                      </div>
                      {getStatusBadge(app.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <Building2 className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Alamat</p>
                          <p className="text-sm text-gray-500">{app.address}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <FileText className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Tanggal Pengajuan</p>
                          <p className="text-sm text-gray-500">{app.date}</p>
                        </div>
                      </div>
                      {app.notes && (
                        <div className="flex items-start">
                          <FileCheck className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Catatan</p>
                            <p className="text-sm text-gray-500">{app.notes}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm">
                      {app.status === "approved" ? (
                        <span className="flex items-center text-green-600">
                          <Check className="h-4 w-4 mr-1" />
                          Disetujui
                        </span>
                      ) : app.status === "rejected" ? (
                        <span className="flex items-center text-red-600">
                          <X className="h-4 w-4 mr-1" />
                          Ditolak
                        </span>
                      ) : app.status === "pending" ? (
                        <span className="flex items-center text-yellow-600">
                          <Clock className="h-4 w-4 mr-1" />
                          Menunggu
                        </span>
                      ) : (
                        <span className="flex items-center text-gray-600">
                          <FileText className="h-4 w-4 mr-1" />
                          Draft
                        </span>
                      )}
                    </div>
                    <Button variant="outline" size="sm">
                      Lihat Detail
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="md:col-span-2 p-12 text-center">
                <p className="text-gray-500">Tidak ada pengajuan ditemukan.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
