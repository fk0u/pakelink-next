"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, MapPin, ArrowRight, AlertCircle } from "lucide-react";
import { useState } from "react";
import { format, isToday, parseISO, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";
import { id } from "date-fns/locale";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Interface untuk data presensi
interface AttendanceRecord {
  id: string;
  date: string;
  checkInTime?: string;
  checkOutTime?: string;
  status: "present" | "absent" | "late" | "permission" | "holiday";
  location?: string;
  notes?: string;
}

// Data sampel untuk presensi
const sampleAttendanceData: AttendanceRecord[] = [
  {
    id: "atd-1",
    date: "2025-08-28",
    checkInTime: "07:50:22",
    checkOutTime: "16:05:11",
    status: "present",
    location: "PT Teknologi Maju",
    notes: "Hari pertama PKL"
  },
  {
    id: "atd-2",
    date: "2025-08-29",
    checkInTime: "08:10:15",
    checkOutTime: "16:00:05",
    status: "late",
    location: "PT Teknologi Maju",
    notes: "Terlambat karena macet"
  },
  {
    id: "atd-3",
    date: "2025-08-30",
    status: "holiday",
    notes: "Akhir pekan"
  },
  {
    id: "atd-4",
    date: "2025-08-31",
    status: "holiday",
    notes: "Akhir pekan"
  },
  {
    id: "atd-5",
    date: "2025-09-01",
    checkInTime: "07:55:42",
    checkOutTime: "16:15:20",
    status: "present",
    location: "PT Teknologi Maju"
  },
  {
    id: "atd-6",
    date: "2025-09-02",
    status: "permission",
    notes: "Izin sakit"
  },
];

// Fungsi untuk mendapatkan data presensi berdasarkan tanggal
const getAttendanceByDate = (date: Date, records: AttendanceRecord[]) => {
  const dateString = format(date, "yyyy-MM-dd");
  return records.find(record => record.date === dateString);
};

export default function AttendancePage() {
  const [activeTab, setActiveTab] = useState<string>("daily");
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(sampleAttendanceData);
  const [isCheckInDialogOpen, setIsCheckInDialogOpen] = useState(false);
  
  const today = new Date();
  const currentWeekStart = startOfWeek(today, { weekStartsOn: 1 });
  const currentWeekEnd = endOfWeek(today, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: currentWeekStart, end: currentWeekEnd });
  
  const todayRecord = attendanceRecords.find(record => 
    record.date === format(today, "yyyy-MM-dd")
  );
  
  const handleCheckIn = () => {
    const now = new Date();
    const dateString = format(now, "yyyy-MM-dd");
    const timeString = format(now, "HH:mm:ss");
    
    // Cek apakah sudah ada record untuk hari ini
    const existingRecord = attendanceRecords.find(record => record.date === dateString);
    
    if (existingRecord) {
      // Update record yang sudah ada
      setAttendanceRecords(
        attendanceRecords.map(record => 
          record.date === dateString
            ? { 
                ...record, 
                checkInTime: record.checkInTime || timeString,
                status: record.status === "holiday" ? "holiday" : "present"
              }
            : record
        )
      );
    } else {
      // Buat record baru
      const newRecord: AttendanceRecord = {
        id: `atd-${Date.now()}`,
        date: dateString,
        checkInTime: timeString,
        status: "present",
        location: "PT Teknologi Maju"
      };
      
      setAttendanceRecords([newRecord, ...attendanceRecords]);
    }
    
    setIsCheckInDialogOpen(false);
  };
  
  const handleCheckOut = () => {
    const now = new Date();
    const dateString = format(now, "yyyy-MM-dd");
    const timeString = format(now, "HH:mm:ss");
    
    // Update record untuk hari ini
    setAttendanceRecords(
      attendanceRecords.map(record => 
        record.date === dateString
          ? { ...record, checkOutTime: timeString }
          : record
      )
    );
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return <Badge variant="outline" className="bg-green-100 text-green-800">Hadir</Badge>;
      case "late":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Terlambat</Badge>;
      case "absent":
        return <Badge variant="outline" className="bg-red-100 text-red-800">Tidak Hadir</Badge>;
      case "permission":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Izin</Badge>;
      case "holiday":
        return <Badge variant="outline" className="bg-purple-100 text-purple-800">Libur</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Presensi PKL</h1>
        <div className="space-x-2">
          <Dialog open={isCheckInDialogOpen} onOpenChange={setIsCheckInDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant={todayRecord?.checkInTime ? "outline" : "default"}
                disabled={!!(todayRecord?.checkInTime || todayRecord?.status === "holiday" || todayRecord?.status === "permission")}
              >
                {todayRecord?.checkInTime ? "Sudah Check In" : "Check In"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Konfirmasi Check In</DialogTitle>
                <DialogDescription>
                  Anda akan melakukan check in untuk kehadiran hari ini. Pastikan Anda berada di lokasi PKL.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{format(today, "EEEE, dd MMMM yyyy", { locale: id })}</p>
                    <p className="text-sm text-gray-500">{format(today, "HH:mm:ss")}</p>
                  </div>
                  <MapPin className="h-5 w-5 text-gray-500" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCheckInDialogOpen(false)}>
                  Batal
                </Button>
                <Button onClick={handleCheckIn}>Konfirmasi Check In</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Button 
            variant="outline"
            disabled={!todayRecord?.checkInTime || !!todayRecord?.checkOutTime}
            onClick={handleCheckOut}
          >
            {todayRecord?.checkOutTime ? "Sudah Check Out" : "Check Out"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="daily" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="daily">Harian</TabsTrigger>
          <TabsTrigger value="weekly">Mingguan</TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily" className="mt-6">
          <div className="grid gap-6 md:grid-cols-1">
            {/* Hari Ini */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Kehadiran Hari Ini</CardTitle>
                <CardDescription>
                  {format(today, "EEEE, dd MMMM yyyy", { locale: id })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {todayRecord ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Status</p>
                        <div className="mt-1">{getStatusBadge(todayRecord.status)}</div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Lokasi</p>
                        <p className="text-sm">{todayRecord.location || "-"}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Check In</p>
                        <p className="text-sm">{todayRecord.checkInTime || "-"}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Check Out</p>
                        <p className="text-sm">{todayRecord.checkOutTime || "-"}</p>
                      </div>
                    </div>
                    
                    {todayRecord.notes && (
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Catatan</p>
                        <p className="text-sm">{todayRecord.notes}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <AlertCircle className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
                    <p>Belum ada data kehadiran untuk hari ini</p>
                    <Button className="mt-4" onClick={() => setIsCheckInDialogOpen(true)}>
                      Check In Sekarang
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Riwayat Kehadiran */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Riwayat Kehadiran</CardTitle>
                <CardDescription>
                  Daftar kehadiran 7 hari terakhir
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {attendanceRecords
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .slice(0, 7)
                    .map((record) => (
                      <div key={record.id} className="flex justify-between items-center border-b border-gray-100 pb-3">
                        <div>
                          <p className="font-medium">{format(parseISO(record.date), "EEEE, dd MMM", { locale: id })}</p>
                          <div className="flex items-center mt-1">
                            {getStatusBadge(record.status)}
                            {record.checkInTime && (
                              <span className="text-xs ml-3">
                                {record.checkInTime} {record.checkOutTime && <ArrowRight className="inline h-3 w-3 mx-1" />} {record.checkOutTime}
                              </span>
                            )}
                          </div>
                        </div>
                        {record.status === "present" && (
                          <div className="text-sm text-green-600 flex items-center">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Hadir
                          </div>
                        )}
                        {record.status === "late" && (
                          <div className="text-sm text-yellow-600 flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            Terlambat
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="weekly" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Kehadiran Minggu Ini</CardTitle>
              <CardDescription>
                {format(currentWeekStart, "dd MMM", { locale: id })} - {format(currentWeekEnd, "dd MMM yyyy", { locale: id })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-6">
                {weekDays.map((day) => {
                  const record = getAttendanceByDate(day, attendanceRecords);
                  return (
                    <div 
                      key={format(day, "yyyy-MM-dd")} 
                      className={`p-3 text-center rounded-md ${
                        isToday(day)
                          ? "bg-primary/10 border border-primary"
                          : record?.status === "present"
                          ? "bg-green-50 border border-green-200"
                          : record?.status === "late"
                          ? "bg-yellow-50 border border-yellow-200"
                          : record?.status === "absent"
                          ? "bg-red-50 border border-red-200"
                          : record?.status === "permission"
                          ? "bg-blue-50 border border-blue-200"
                          : record?.status === "holiday"
                          ? "bg-purple-50 border border-purple-200"
                          : "bg-gray-50 border border-gray-200"
                      }`}
                    >
                      <p className="text-xs font-medium">{format(day, "EEEE", { locale: id })}</p>
                      <p className="text-lg font-bold">{format(day, "dd")}</p>
                      <div className="mt-1">
                        {record ? (
                          <span className="text-xs inline-block px-2 py-1 rounded-full bg-white">
                            {record.status === "present" && "Hadir"}
                            {record.status === "late" && "Terlambat"}
                            {record.status === "absent" && "Tidak Hadir"}
                            {record.status === "permission" && "Izin"}
                            {record.status === "holiday" && "Libur"}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">Belum ada data</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="space-y-4">
                {weekDays.map((day) => {
                  const record = getAttendanceByDate(day, attendanceRecords);
                  if (!record) return null;
                  
                  return (
                    <div key={format(day, "yyyy-MM-dd")} className="border-b border-gray-100 pb-3 last:border-0">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{format(day, "EEEE, dd MMM", { locale: id })}</p>
                          <div className="flex items-center mt-1">
                            {getStatusBadge(record.status)}
                          </div>
                        </div>
                        <div className="text-right">
                          {record.checkInTime && (
                            <p className="text-sm">
                              {record.checkInTime} 
                              {record.checkOutTime && (
                                <>
                                  <ArrowRight className="inline h-3 w-3 mx-1" />
                                  {record.checkOutTime}
                                </>
                              )}
                            </p>
                          )}
                          {record.location && (
                            <p className="text-xs text-gray-500 flex items-center justify-end">
                              <MapPin className="h-3 w-3 mr-1" />
                              {record.location}
                            </p>
                          )}
                        </div>
                      </div>
                      {record.notes && (
                        <p className="text-sm text-gray-600 mt-2">{record.notes}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
