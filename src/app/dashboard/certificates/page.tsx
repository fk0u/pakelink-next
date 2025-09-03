"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Download, FileText, CalendarCheck, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

// Interface untuk data sertifikat
interface Certificate {
  id: string;
  title: string;
  companyName: string;
  startDate: string;
  endDate: string;
  issueDate: string;
  status: "pending" | "issued";
  downloadUrl?: string;
}

// Data sampel untuk sertifikat
const sampleCertificate: Certificate = {
  id: "cert-1",
  title: "Sertifikat Praktik Kerja Lapangan",
  companyName: "PT Teknologi Maju",
  startDate: "2025-08-01",
  endDate: "2025-10-31",
  issueDate: "2025-11-05",
  status: "issued",
  downloadUrl: "#"
};

export default function CertificatesPage() {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd MMMM yyyy", { locale: id });
  };

  const certificate = sampleCertificate;
  
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Sertifikat PKL</h1>
      
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-primary" />
                  {certificate.title}
                </CardTitle>
                <CardDescription className="mt-1">
                  {certificate.companyName}
                </CardDescription>
              </div>
              <Badge variant="outline" className={certificate.status === "issued" 
                ? "bg-green-100 text-green-800" 
                : "bg-yellow-100 text-yellow-800"
              }>
                {certificate.status === "issued" ? "Diterbitkan" : "Menunggu"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center text-sm font-medium text-gray-700">
                    <Calendar className="h-4 w-4 mr-1" />
                    Tanggal Mulai PKL
                  </div>
                  <p className="text-sm">{formatDate(certificate.startDate)}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-sm font-medium text-gray-700">
                    <CalendarCheck className="h-4 w-4 mr-1" />
                    Tanggal Selesai PKL
                  </div>
                  <p className="text-sm">{formatDate(certificate.endDate)}</p>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center text-sm font-medium text-gray-700">
                  <FileText className="h-4 w-4 mr-1" />
                  Deskripsi
                </div>
                <p className="text-sm">
                  Sertifikat ini diberikan sebagai bukti bahwa Anda telah menyelesaikan program Praktik Kerja Lapangan (PKL)
                  di {certificate.companyName} selama periode {formatDate(certificate.startDate)} hingga {formatDate(certificate.endDate)}.
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-md">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center text-sm font-medium text-gray-700">
                      <Clock className="h-4 w-4 mr-1" />
                      Status Sertifikat
                    </div>
                    <p className="text-sm">
                      {certificate.status === "issued" 
                        ? `Diterbitkan pada ${formatDate(certificate.issueDate)}`
                        : "Belum diterbitkan - Menunggu penyelesaian program PKL"}
                    </p>
                  </div>
                  {certificate.status === "issued" && (
                    <Button size="sm" className="flex items-center">
                      <Download className="h-4 w-4 mr-1" />
                      Unduh Sertifikat
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <p className="text-sm text-gray-500">
              Nomor Sertifikat: SMKN7-PKL-2025-{certificate.id}
            </p>
            <Button variant="outline" size="sm">
              Verifikasi
            </Button>
          </CardFooter>
        </Card>
        
        <div className="mt-8 p-6 border border-dashed rounded-md border-gray-300">
          <div className="text-center">
            <Award className="h-12 w-12 mx-auto text-gray-400 mb-3" />
            <h3 className="text-lg font-medium mb-1">Belum Ada Sertifikat Lainnya</h3>
            <p className="text-sm text-gray-500 mb-4">
              Sertifikat tambahan akan muncul di sini setelah Anda menyelesaikan program PKL.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
