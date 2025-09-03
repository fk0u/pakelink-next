"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserRole } from "@/lib/store";
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  FileText,
  Upload,
  XCircle,
} from "lucide-react";

// Tipe data untuk status laporan
export type ReportStatus = "pending" | "approved" | "rejected" | "draft";

// Interface untuk data laporan
export interface Report {
  id: string;
  title: string;
  date: Date;
  status: ReportStatus;
  type: string;
  student?: {
    id: string;
    name: string;
    avatar?: string;
    nisn?: string;
    class?: string;
  };
  supervisors?: {
    school?: {
      id: string;
      name: string;
      avatar?: string;
    };
    company?: {
      id: string;
      name: string;
      avatar?: string;
      company?: string;
    };
  };
  reviewedAt?: Date;
  attachmentUrl?: string;
}

// Komponen status badge
export function ReportStatusBadge({ status }: { status: ReportStatus }) {
  switch (status) {
    case "approved":
      return (
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
          <CheckCircle2 className="mr-1 h-3 w-3" />
          Disetujui
        </Badge>
      );
    case "rejected":
      return (
        <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
          <XCircle className="mr-1 h-3 w-3" />
          Ditolak
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
          <Clock className="mr-1 h-3 w-3" />
          Menunggu
        </Badge>
      );
    case "draft":
      return (
        <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300">
          <FileText className="mr-1 h-3 w-3" />
          Draft
        </Badge>
      );
    default:
      return null;
  }
}

// Props untuk ReportCard
interface ReportCardProps {
  report: Report;
  userRole: UserRole;
  onView?: (report: Report) => void;
  onApprove?: (report: Report) => void;
  onReject?: (report: Report) => void;
  onDownload?: (report: Report) => void;
  className?: string;
}

// Komponen ReportCard
export function ReportCard({
  report,
  userRole,
  onView,
  onApprove,
  onReject,
  onDownload,
  className,
}: ReportCardProps) {
  const isStudent = userRole === UserRole.STUDENT;
  const isSupervisor =
    userRole === UserRole.SCHOOL_SUPERVISOR ||
    userRole === UserRole.COMPANY_SUPERVISOR;
  const canApprove = isSupervisor && report.status === "pending";

  // Format tanggal dalam bahasa Indonesia
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base font-semibold">{report.title}</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <CalendarCheck className="h-3.5 w-3.5" />
              {formatDate(report.date)}
              <span className="mx-1">•</span>
              {report.type}
            </CardDescription>
          </div>
          <ReportStatusBadge status={report.status} />
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        {report.student && (
          <div className="flex items-center gap-2 my-2">
            <Avatar className="h-8 w-8">
              {report.student.avatar ? (
                <AvatarImage src={report.student.avatar} alt={report.student.name} />
              ) : null}
              <AvatarFallback className="text-xs">
                {report.student.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{report.student.name}</p>
              <p className="text-xs text-muted-foreground">
                {report.student.class} {report.student.nisn ? `• NISN: ${report.student.nisn}` : ""}
              </p>
            </div>
          </div>
        )}

        {report.reviewedAt && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
            <Clock className="h-3.5 w-3.5" />
            Diverifikasi pada {formatDate(report.reviewedAt)}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0 flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          className="h-8"
          onClick={() => onView?.(report)}
        >
          <Eye className="mr-1 h-4 w-4" />
          Lihat
        </Button>
        {canApprove && (
          <>
            <Button
              variant="default"
              size="sm"
              className="h-8"
              onClick={() => onApprove?.(report)}
            >
              <CheckCircle2 className="mr-1 h-4 w-4" />
              Setujui
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="h-8"
              onClick={() => onReject?.(report)}
            >
              <XCircle className="mr-1 h-4 w-4" />
              Tolak
            </Button>
          </>
        )}
        {report.attachmentUrl && (
          <Button
            variant="outline"
            size="sm"
            className="h-8 ml-auto"
            onClick={() => onDownload?.(report)}
          >
            <Download className="mr-1 h-4 w-4" />
            Unduh
          </Button>
        )}
        {isStudent && report.status === "draft" && (
          <Button
            variant="default"
            size="sm"
            className="h-8 ml-auto"
          >
            <Upload className="mr-1 h-4 w-4" />
            Kirim
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

// Props untuk ReportGrid
interface ReportGridProps {
  reports: Report[];
  userRole: UserRole;
  onView?: (report: Report) => void;
  onApprove?: (report: Report) => void;
  onReject?: (report: Report) => void;
  onDownload?: (report: Report) => void;
  className?: string;
}

// Komponen ReportGrid - Grid laporan dengan golden ratio
export function ReportGrid({
  reports,
  userRole,
  onView,
  onApprove,
  onReject,
  onDownload,
  className,
}: ReportGridProps) {
  // Gunakan golden ratio untuk membuat layout grid yang harmonis
  // Jumlah kolom berdasarkan fibonacci: 1, 2, 3, 5, 8, 13, ...
  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => (
          <ReportCard
            key={report.id}
            report={report}
            userRole={userRole}
            onView={onView}
            onApprove={onApprove}
            onReject={onReject}
            onDownload={onDownload}
          />
        ))}
      </div>
      {reports.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FileText className="h-12 w-12 text-gray-300 dark:text-gray-600" />
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">
            Belum ada laporan
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Laporan PKL akan muncul di sini setelah dikirimkan.
          </p>
          {userRole === UserRole.STUDENT && (
            <Button className="mt-4">
              <Upload className="mr-2 h-4 w-4" />
              Buat Laporan Baru
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

// Data contoh untuk laporan
export const sampleReports: Report[] = [
  {
    id: "report-1",
    title: "Laporan Mingguan PKL - Minggu 1",
    date: new Date(2023, 7, 10),
    status: "approved",
    type: "Laporan Mingguan",
    student: {
      id: "student-1",
      name: "Arief Pratama",
      class: "XII RPL 2",
      nisn: "0012345678",
    },
    supervisors: {
      school: {
        id: "supervisor-1",
        name: "Budi Santoso",
      },
      company: {
        id: "supervisor-2",
        name: "Dian Anggraini",
        company: "PT Teknologi Nusantara",
      },
    },
    reviewedAt: new Date(2023, 7, 12),
    attachmentUrl: "/reports/report-1.pdf",
  },
  {
    id: "report-2",
    title: "Laporan Mingguan PKL - Minggu 2",
    date: new Date(2023, 7, 17),
    status: "pending",
    type: "Laporan Mingguan",
    student: {
      id: "student-1",
      name: "Arief Pratama",
      class: "XII RPL 2",
      nisn: "0012345678",
    },
    attachmentUrl: "/reports/report-2.pdf",
  },
  {
    id: "report-3",
    title: "Laporan Bulanan PKL - Agustus",
    date: new Date(2023, 7, 31),
    status: "draft",
    type: "Laporan Bulanan",
    student: {
      id: "student-1",
      name: "Arief Pratama",
      class: "XII RPL 2",
      nisn: "0012345678",
    },
  },
  {
    id: "report-4",
    title: "Laporan Mingguan PKL - Minggu 1",
    date: new Date(2023, 7, 10),
    status: "rejected",
    type: "Laporan Mingguan",
    student: {
      id: "student-2",
      name: "Diana Putri",
      class: "XII RPL 1",
      nisn: "0012345679",
    },
    supervisors: {
      school: {
        id: "supervisor-1",
        name: "Budi Santoso",
      },
    },
    reviewedAt: new Date(2023, 7, 13),
    attachmentUrl: "/reports/report-4.pdf",
  },
];
