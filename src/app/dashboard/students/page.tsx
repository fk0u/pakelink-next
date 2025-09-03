"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/dashboard/data-table";
import { useAuthStore, UserRole } from "@/lib/store";
import { 
  Building2, 
  Calendar, 
  DownloadCloud, 
  FileText, 
  Filter, 
  MapPin, 
  MoreHorizontal, 
  Plus, 
  Search, 
  User
} from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

// Interface untuk data siswa
interface Student {
  id: string;
  name: string;
  nisn: string;
  class: string;
  status: "active" | "pending" | "completed" | "cancelled";
  company?: {
    name: string;
    address: string;
  };
  supervisors?: {
    school?: {
      name: string;
    };
    company?: {
      name: string;
    };
  };
  startDate?: Date;
  endDate?: Date;
}

// Data sampel untuk siswa
const sampleStudents: Student[] = [
  {
    id: "student-1",
    name: "Ahmad Rizky",
    nisn: "0011223344",
    class: "XII RPL 1",
    status: "active",
    company: {
      name: "PT Teknologi Nusantara",
      address: "Jl. Sudirman No. 123, Jakarta Pusat",
    },
    supervisors: {
      school: {
        name: "Budi Santoso",
      },
      company: {
        name: "Dian Anggraini",
      },
    },
    startDate: new Date(2023, 6, 1),
    endDate: new Date(2023, 11, 30),
  },
  {
    id: "student-2",
    name: "Siti Nurhaliza",
    nisn: "0011223345",
    class: "XII RPL 1",
    status: "active",
    company: {
      name: "Dinas Komunikasi dan Informatika",
      address: "Jl. Ahmad Yani No. 10, Samarinda",
    },
    supervisors: {
      school: {
        name: "Budi Santoso",
      },
      company: {
        name: "Hendra Wijaya",
      },
    },
    startDate: new Date(2023, 6, 1),
    endDate: new Date(2023, 11, 30),
  },
  {
    id: "student-3",
    name: "Rudi Hermawan",
    nisn: "0011223346",
    class: "XII RPL 2",
    status: "pending",
    company: {
      name: "CV Media Kreasi",
      address: "Jl. Pahlawan No. 45, Samarinda",
    },
    supervisors: {
      school: {
        name: "Eko Prasetyo",
      },
    },
    startDate: new Date(2023, 6, 15),
    endDate: new Date(2023, 12, 15),
  },
  {
    id: "student-4",
    name: "Dewi Anggraini",
    nisn: "0011223347",
    class: "XII RPL 2",
    status: "completed",
    company: {
      name: "PT Samarinda Digital",
      address: "Jl. Gajah Mada No. 22, Samarinda",
    },
    supervisors: {
      school: {
        name: "Eko Prasetyo",
      },
      company: {
        name: "Faisal Rahman",
      },
    },
    startDate: new Date(2023, 0, 10),
    endDate: new Date(2023, 5, 10),
  },
  {
    id: "student-5",
    name: "Bayu Setiawan",
    nisn: "0011223348",
    class: "XII TKJ 1",
    status: "cancelled",
    company: {
      name: "PT Telkom Indonesia",
      address: "Jl. Juanda No. 5, Samarinda",
    },
    supervisors: {
      school: {
        name: "Fitri Handayani",
      },
    },
    startDate: new Date(2023, 6, 1),
    endDate: new Date(2023, 8, 1),
  },
];

// Komponen Status Badge
function StatusBadge({ status }: { status: Student["status"] }) {
  const variantMap = {
    active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    completed: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  };

  const labelMap = {
    active: "Aktif",
    pending: "Menunggu",
    completed: "Selesai",
    cancelled: "Dibatalkan",
  };

  return (
    <Badge className={variantMap[status]}>
      {labelMap[status]}
    </Badge>
  );
}

// Format tanggal
function formatDate(date?: Date) {
  if (!date) return "-";
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function StudentsPage() {
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");

  // Definisi kolom untuk tabel siswa
  const columns: ColumnDef<Student>[] = [
    {
      accessorKey: "name",
      header: "Siswa",
      cell: ({ row }) => {
        const student = row.original;
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="text-xs">
                {student.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{student.name}</div>
              <div className="text-sm text-muted-foreground">
                NISN: {student.nisn}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "class",
      header: "Kelas",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      accessorKey: "company",
      header: "Tempat PKL",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">
            {row.original.company?.name || "-"}
          </div>
          <div className="text-sm text-muted-foreground flex items-center">
            <MapPin className="mr-1 h-3 w-3" />
            {row.original.company?.address || "-"}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "duration",
      header: "Periode",
      cell: ({ row }) => (
        <div className="text-sm">
          <div className="flex items-center">
            <Calendar className="mr-1 h-3.5 w-3.5 text-gray-500" />
            {formatDate(row.original.startDate)} - {formatDate(row.original.endDate)}
          </div>
        </div>
      ),
    },
    {
      id: "actions",
      cell: () => (
        <div className="flex justify-end">
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      ),
    },
  ];

  // Filter siswa berdasarkan pencarian
  const filteredStudents = sampleStudents.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.nisn.includes(searchQuery) ||
    student.class.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (student.company?.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Summary card data
  const summaryData = {
    total: sampleStudents.length,
    active: sampleStudents.filter(s => s.status === "active").length,
    pending: sampleStudents.filter(s => s.status === "pending").length,
    completed: sampleStudents.filter(s => s.status === "completed").length,
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Siswa PKL</h2>
        {user?.role === UserRole.ADMIN && (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Siswa
          </Button>
        )}
      </div>

      {/* Summary Cards - Layout with golden ratio */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Siswa</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Siswa Aktif</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Menunggu Penempatan</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Selesai PKL</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.completed}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <TabsList>
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="active">Aktif</TabsTrigger>
            <TabsTrigger value="pending">Menunggu</TabsTrigger>
            <TabsTrigger value="completed">Selesai</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari siswa..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
            <Button variant="outline" size="icon">
              <DownloadCloud className="h-4 w-4" />
              <span className="sr-only">Download</span>
            </Button>
          </div>
        </div>
        <TabsContent value="all" className="space-y-4">
          <DataTable
            columns={columns}
            data={filteredStudents}
          />
        </TabsContent>
        <TabsContent value="active" className="space-y-4">
          <DataTable
            columns={columns}
            data={filteredStudents.filter(s => s.status === "active")}
          />
        </TabsContent>
        <TabsContent value="pending" className="space-y-4">
          <DataTable
            columns={columns}
            data={filteredStudents.filter(s => s.status === "pending")}
          />
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          <DataTable
            columns={columns}
            data={filteredStudents.filter(s => s.status === "completed")}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
