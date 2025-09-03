"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReportGrid, sampleReports, Report } from "@/components/reports/report-card";
import { CalendarCheck, FileText, Plus } from "lucide-react";
import { useAuthStore, UserRole } from "@/lib/store";
import { useState } from "react";

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("all");
  
  // Handler untuk berbagai aksi laporan
  const handleViewReport = (report: Report) => {
    console.log("View report:", report);
    // Implementasi lihat laporan
  };
  
  const handleDownloadReport = (report: Report) => {
    console.log("Download report:", report);
    // Implementasi unduh laporan
  };
  
  // Filter laporan berdasarkan tab yang aktif
  const filteredReports = sampleReports.filter((report) => {
    if (activeTab === "all") return true;
    return report.status === activeTab;
  });
  
  // Mengubah sampel data untuk hanya menampilkan laporan siswa saat ini
  const studentReports = filteredReports.filter(report => 
    report.student?.id === "student-1" // Asumsikan student-1 adalah ID user saat ini
  );
  
  return (
    <div className="flex-1 space-y-4 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Laporan PKL</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Buat Laporan Baru
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-7">
        {/* Sidebar filter - dengan proporsi 2 dari 7 kolom (mendekati golden ratio) */}
        <Card className="md:col-span-2">
          <CardContent className="p-4 space-y-4">
            <div className="space-y-1">
              <h3 className="text-sm font-medium">Status</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant={activeTab === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveTab("all")}
                  className="justify-start h-9"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Semua
                </Button>
                <Button 
                  variant={activeTab === "pending" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveTab("pending")}
                  className="justify-start h-9"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Menunggu
                </Button>
                <Button 
                  variant={activeTab === "approved" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveTab("approved")}
                  className="justify-start h-9"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Disetujui
                </Button>
                <Button 
                  variant={activeTab === "rejected" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveTab("rejected")}
                  className="justify-start h-9"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Ditolak
                </Button>
                <Button 
                  variant={activeTab === "draft" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveTab("draft")}
                  className="justify-start h-9"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Draft
                </Button>
              </div>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-sm font-medium">Jenis Laporan</h3>
              <div className="space-y-2">
                <Button 
                  variant="outline"
                  size="sm"
                  className="w-full justify-start h-9"
                >
                  Semua Jenis
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  className="w-full justify-start h-9"
                >
                  Laporan Mingguan
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  className="w-full justify-start h-9"
                >
                  Laporan Bulanan
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  className="w-full justify-start h-9"
                >
                  Laporan Akhir
                </Button>
              </div>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-sm font-medium">Template</h3>
              <div className="space-y-2">
                <Button 
                  variant="outline"
                  size="sm"
                  className="w-full justify-start h-9"
                >
                  <CalendarCheck className="mr-2 h-4 w-4" />
                  Template Mingguan
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  className="w-full justify-start h-9"
                >
                  <CalendarCheck className="mr-2 h-4 w-4" />
                  Template Bulanan
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  className="w-full justify-start h-9"
                >
                  <CalendarCheck className="mr-2 h-4 w-4" />
                  Template Akhir
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Konten utama - dengan proporsi 5 dari 7 kolom (mendekati golden ratio) */}
        <div className="md:col-span-5">
          <Tabs defaultValue="grid" className="space-y-4">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="grid">Grid</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
              </TabsList>
              <div className="text-sm text-muted-foreground">
                {studentReports.length} laporan ditemukan
              </div>
            </div>
            <TabsContent value="grid" className="space-y-4">
              <ReportGrid
                reports={studentReports}
                userRole={UserRole.STUDENT}
                onView={handleViewReport}
                onDownload={handleDownloadReport}
              />
            </TabsContent>
            <TabsContent value="list" className="space-y-4">
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" />
                <h3 className="mt-4 text-lg font-medium">Tampilan List</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Fitur ini akan segera hadir
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
