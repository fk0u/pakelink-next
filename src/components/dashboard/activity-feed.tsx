"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

interface ActivityItem {
  id: string;
  user: {
    name: string;
    avatar?: string;
    role: string;
  };
  action: string;
  target: string;
  timestamp: Date;
  status?: "info" | "success" | "warning" | "error";
}

const statusColors = {
  info: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  success: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  error: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
};

interface ActivityFeedProps {
  activities: ActivityItem[];
  className?: string;
  limit?: number;
}

export function ActivityFeed({ 
  activities, 
  className, 
  limit = 5 
}: ActivityFeedProps) {
  // Menampilkan aktivitas terbatas sesuai limit
  const displayedActivities = activities.slice(0, limit);
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Aktivitas Terkini</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayedActivities.map((activity) => (
            <div 
              key={activity.id} 
              className="flex items-start gap-4 relative before:absolute before:left-6 before:top-10 before:h-[calc(100%+1rem)] before:w-[1px] before:bg-gray-200 dark:before:bg-gray-800 last:before:hidden"
            >
              <Avatar className="h-12 w-12 border-2 border-white dark:border-gray-900 z-10 bg-gray-50 dark:bg-gray-800">
                {activity.user.avatar ? (
                  <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                ) : null}
                <AvatarFallback className="text-xs">
                  {activity.user.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex flex-wrap items-center gap-1">
                  <span className="font-medium">{activity.user.name}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {activity.action}
                  </span>
                  <span className="font-medium">{activity.target}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDistanceToNow(activity.timestamp, { addSuffix: true, locale: id })}
                  </span>
                  {activity.status && (
                    <span className={cn("text-xs px-1.5 py-0.5 rounded-full", statusColors[activity.status])}>
                      {activity.status === "info" && "Info"}
                      {activity.status === "success" && "Sukses"}
                      {activity.status === "warning" && "Peringatan"}
                      {activity.status === "error" && "Error"}
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {activity.user.role}
                </span>
              </div>
            </div>
          ))}
          
          {activities.length > limit && (
            <div className="flex justify-center pt-2">
              <button className="text-sm text-primary hover:underline">
                Lihat semua aktivitas
              </button>
            </div>
          )}
          
          {activities.length === 0 && (
            <div className="py-6 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Belum ada aktivitas terbaru
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Contoh data untuk demo
export const activitySampleData: ActivityItem[] = [
  {
    id: "1",
    user: {
      name: "Budi Santoso",
      role: "Guru Pembimbing",
    },
    action: "menyetujui laporan PKL",
    target: "Ahmad Rizky",
    timestamp: new Date(2023, 6, 15, 9, 30),
    status: "success",
  },
  {
    id: "2",
    user: {
      name: "Diana Putri",
      role: "Koordinator PKL",
    },
    action: "menambahkan tempat PKL baru",
    target: "PT Teknologi Nusantara",
    timestamp: new Date(2023, 6, 14, 14, 15),
    status: "info",
  },
  {
    id: "3",
    user: {
      name: "Eko Prasetyo",
      role: "Siswa",
    },
    action: "mengajukan permohonan PKL ke",
    target: "Dinas Komunikasi dan Informatika",
    timestamp: new Date(2023, 6, 13, 10, 45),
  },
  {
    id: "4",
    user: {
      name: "Fitri Handayani",
      role: "Admin",
    },
    action: "memperbarui data siswa",
    target: "Kelas XII RPL 2",
    timestamp: new Date(2023, 6, 12, 13, 20),
  },
  {
    id: "5",
    user: {
      name: "Gilang Ramadhan",
      role: "Pembimbing Industri",
    },
    action: "mengirim evaluasi PKL untuk",
    target: "3 siswa",
    timestamp: new Date(2023, 6, 11, 16, 30),
    status: "warning",
  },
  {
    id: "6",
    user: {
      name: "Hana Safira",
      role: "Siswa",
    },
    action: "mengupload laporan PKL",
    target: "Minggu ke-4",
    timestamp: new Date(2023, 6, 10, 11, 15),
  },
];
