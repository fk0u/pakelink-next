"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/dashboard/data-table";
import { AddCompanyDialog } from "@/components/companies/add-company-dialog";
import { 
  Building2, 
  ExternalLink, 
  FileText, 
  Filter, 
  Globe, 
  MapPin, 
  MoreHorizontal, 
  Phone, 
  Search, 
  Star, 
  User, 
  Users
} from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";

// Interface untuk data tempat PKL
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

// Data sample untuk tempat PKL
const sampleCompanies: Company[] = [
  {
    id: "company-1",
    name: "PT Teknologi Nusantara",
    address: "Jl. Sudirman No. 123",
    city: "Jakarta Pusat",
    category: "Teknologi Informasi",
    phone: "021-5551234",
    website: "www.teknonusantara.co.id",
    totalStudents: 15,
    currentStudents: 5,
    status: "active",
    rating: 4.5,
    contactPerson: {
      name: "Hendra Wijaya",
      position: "HRD Manager",
      phone: "081234567890",
      email: "hendra@teknonusantara.co.id",
    },
  },
  {
    id: "company-2",
    name: "Dinas Komunikasi dan Informatika",
    address: "Jl. Ahmad Yani No. 10",
    city: "Samarinda",
    category: "Pemerintahan",
    phone: "0541-123456",
    website: "diskominfo.samarindakota.go.id",
    totalStudents: 8,
    currentStudents: 3,
    status: "active",
    rating: 4.2,
    contactPerson: {
      name: "Siti Rahayu",
      position: "Kepala Bidang TIK",
      phone: "081234567891",
      email: "siti.rahayu@samarindakota.go.id",
    },
  },
  {
    id: "company-3",
    name: "CV Media Kreasi",
    address: "Jl. Pahlawan No. 45",
    city: "Samarinda",
    category: "Desain & Multimedia",
    phone: "0541-654321",
    website: "mediakreasi.id",
    totalStudents: 6,
    currentStudents: 2,
    status: "active",
    rating: 4.0,
    contactPerson: {
      name: "Budi Pratama",
      position: "Creative Director",
      phone: "081234567892",
      email: "budi@mediakreasi.id",
    },
  },
  {
    id: "company-4",
    name: "PT Samarinda Digital",
    address: "Jl. Gajah Mada No. 22",
    city: "Samarinda",
    category: "Teknologi Informasi",
    phone: "0541-987654",
    website: "samarindadigital.com",
    totalStudents: 10,
    currentStudents: 0,
    status: "inactive",
    rating: 3.8,
    contactPerson: {
      name: "Agus Santoso",
      position: "Direktur Utama",
      phone: "081234567893",
      email: "agus@samarindadigital.com",
    },
  },
  {
    id: "company-5",
    name: "Bank Kaltimtara",
    address: "Jl. Jenderal Sudirman No. 56",
    city: "Samarinda",
    category: "Perbankan",
    phone: "0541-111222",
    website: "bankkaltimtara.co.id",
    totalStudents: 5,
    currentStudents: 2,
    status: "active",
    rating: 4.3,
    contactPerson: {
      name: "Dewi Lestari",
      position: "HRD Officer",
      phone: "081234567894",
      email: "dewi.lestari@bankkaltimtara.co.id",
    },
  },
];

// Komponen Status Badge untuk perusahaan
function CompanyStatusBadge({ status }: { status: Company["status"] }) {
  const variantMap = {
    active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    inactive: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  };

  const labelMap = {
    active: "Aktif",
    inactive: "Tidak Aktif",
    pending: "Menunggu",
  };

  return (
    <Badge className={variantMap[status]}>
      {labelMap[status]}
    </Badge>
  );
}

// Komponen Rating Stars
function RatingStars({ rating }: { rating?: number }) {
  if (!rating) return <span className="text-gray-500 dark:text-gray-400">-</span>;
  
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < fullStars
              ? "text-yellow-400 fill-yellow-400"
              : i === fullStars && hasHalfStar
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300 dark:text-gray-600"
          }`}
        />
      ))}
      <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export default function CompaniesPage() {
  const [companies, setCompanies] = useLocalStorage<Company[]>("user-companies", sampleCompanies);
  const [searchQuery, setSearchQuery] = useState("");

  // Add new company function
  const handleAddCompany = (newCompany: Company) => {
    setCompanies([...companies, newCompany]);
  };

  // Definisi kolom untuk tabel perusahaan
  const columns: ColumnDef<Company>[] = [
    {
      accessorKey: "name",
      header: "Perusahaan",
      cell: ({ row }) => {
        const company = row.original;
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="text-xs bg-primary/10 text-primary">
                {company.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{company.name}</div>
              <div className="text-sm text-muted-foreground">
                {company.category}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "location",
      header: "Lokasi",
      cell: ({ row }) => (
        <div>
          <div className="font-medium flex items-center">
            <MapPin className="mr-1 h-3.5 w-3.5 text-gray-500" />
            {row.original.city}
          </div>
          <div className="text-sm text-muted-foreground">
            {row.original.address}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "contact",
      header: "Kontak",
      cell: ({ row }) => (
        <div className="space-y-1">
          {row.original.phone && (
            <div className="text-sm flex items-center">
              <Phone className="mr-1 h-3.5 w-3.5 text-gray-500" />
              {row.original.phone}
            </div>
          )}
          {row.original.website && (
            <div className="text-sm flex items-center">
              <Globe className="mr-1 h-3.5 w-3.5 text-gray-500" />
              <a
                href={`https://${row.original.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline flex items-center"
              >
                {row.original.website}
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
          )}
        </div>
      ),
    },
    {
      accessorKey: "students",
      header: "Siswa",
      cell: ({ row }) => (
        <div className="space-y-1">
          <div className="text-sm flex items-center">
            <Users className="mr-1 h-3.5 w-3.5 text-gray-500" />
            Saat ini: {row.original.currentStudents}
          </div>
          <div className="text-sm flex items-center">
            <User className="mr-1 h-3.5 w-3.5 text-gray-500" />
            Total: {row.original.totalStudents}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="space-y-2">
          <CompanyStatusBadge status={row.original.status} />
          <div>
            <RatingStars rating={row.original.rating} />
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

  // Filter perusahaan berdasarkan pencarian
  const filteredCompanies = sampleCompanies.filter(company => 
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Data untuk kartu ringkasan
  const summaryData = {
    total: companies.length,
    active: companies.filter(c => c.status === "active").length,
    inactive: companies.filter(c => c.status === "inactive").length,
    students: companies.reduce((sum, company) => sum + company.currentStudents, 0),
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Tempat PKL</h2>
        <AddCompanyDialog onAddCompany={handleAddCompany} />
      </div>

      {/* Summary Cards - Layout with golden ratio */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total DU/DI</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">DU/DI Aktif</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">DU/DI Tidak Aktif</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.inactive}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Siswa Ditempatkan</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.students}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <TabsList>
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="active">Aktif</TabsTrigger>
            <TabsTrigger value="inactive">Tidak Aktif</TabsTrigger>
            <TabsTrigger value="top-rated">Rating Tertinggi</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari tempat PKL..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Ekspor
            </Button>
          </div>
        </div>
        <TabsContent value="all" className="space-y-4">
          <DataTable
            columns={columns}
            data={filteredCompanies}
          />
        </TabsContent>
        <TabsContent value="active" className="space-y-4">
          <DataTable
            columns={columns}
            data={filteredCompanies.filter(c => c.status === "active")}
          />
        </TabsContent>
        <TabsContent value="inactive" className="space-y-4">
          <DataTable
            columns={columns}
            data={filteredCompanies.filter(c => c.status === "inactive")}
          />
        </TabsContent>
        <TabsContent value="top-rated" className="space-y-4">
          <DataTable
            columns={columns}
            data={filteredCompanies.sort((a, b) => (b.rating || 0) - (a.rating || 0))}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
