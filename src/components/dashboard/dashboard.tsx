"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActivityFeed, activitySampleData } from "@/components/dashboard/activity-feed";
import { ChartContainer, ChartPlaceholder } from "@/components/dashboard/chart-container";
import { DownloadCloud, ListChecks, Users, Book, FileEdit } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { useAuthStore, UserRole } from "@/lib/store";
import Link from "next/link";

// Stats data sample for student
const statsStudentSample = [
  {
    title: "Total Kehadiran",
    value: "18",
    icon: Users,
    trend: "up",
    trendValue: "90%",
    description: "tingkat kehadiran",
  },
  {
    title: "Jurnal Kegiatan",
    value: "15",
    icon: Book,
    trend: "up", 
    trendValue: "12",
    description: "disetujui dari 15",
  },
  {
    title: "Hari Tersisa",
    value: "42",
    icon: DownloadCloud,
    trend: "down",
    trendValue: "30%",
    description: "program selesai",
  },
  {
    title: "Laporan",
    value: "3",
    icon: ListChecks,
    trend: "up",
    trendValue: "100%",
    description: "pengumpulan tepat waktu",
  },
];

export function Dashboard() {
  const { user } = useAuthStore();
  
  return (
    <div className="flex-1 space-y-4 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button>
            Unduh Laporan
          </Button>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Ringkasan</TabsTrigger>
          <TabsTrigger value="analytics" disabled>Analitik</TabsTrigger>
          <TabsTrigger value="reports" disabled>Laporan</TabsTrigger>
          <TabsTrigger value="notifications" disabled>Notifikasi</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {statsStudentSample.map((stat, i: number) => (
              <StatCard 
                key={i}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                trend={{
                  value: stat.trendValue,
                  isPositive: stat.trend === "up",
                  isNeutral: stat.trend === "neutral"
                }}
                description={stat.description}
              />
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <ChartContainer 
              title="Perkembangan Kompetensi" 
              description="Pencapaian berdasarkan kompetensi"
              className="lg:col-span-4"
            >
              <ChartPlaceholder />
            </ChartContainer>
            <ChartContainer 
              title="Aktivitas Harian" 
              description="Jurnal kegiatan & kehadiran"
              className="lg:col-span-3"
            >
              <ChartPlaceholder />
            </ChartContainer>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <ActivityFeed 
              activities={activitySampleData} 
              className="lg:col-span-4"
            />
            <Card className="lg:col-span-3">
              <CardContent className="p-6">
                <div className="space-y-8">
                  <div className="flex items-center">
                    <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                      <span className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-800">
                        {user?.name?.split(" ").map(n => n[0]).join("") || "U"}
                      </span>
                    </span>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name || "Pengguna"}</p>
                      <p className="text-sm text-muted-foreground">
                        {user?.role === UserRole.STUDENT ? "Siswa" : "Pengguna"}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="justify-start" asChild>
                        <Link href="/dashboard/journals">
                          <FileEdit className="mr-2 h-4 w-4" />
                          Jurnal Kegiatan
                        </Link>
                      </Button>
                      <Button variant="outline" className="justify-start" asChild>
                        <Link href="/dashboard/attendance">
                          <Users className="mr-2 h-4 w-4" />
                          Presensi
                        </Link>
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="justify-start" asChild>
                        <Link href="/dashboard/reports">
                          <DownloadCloud className="mr-2 h-4 w-4" />
                          Laporan PKL
                        </Link>
                      </Button>
                      <Button variant="outline" className="justify-start" asChild>
                        <Link href="/dashboard/certificates">
                          <ListChecks className="mr-2 h-4 w-4" />
                          Sertifikat
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
