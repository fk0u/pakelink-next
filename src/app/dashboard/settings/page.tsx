"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/lib/store";
import { useState } from "react";
import { Check, Loader2, Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const { user } = useAuthStore();
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  
  const [profileData, setProfileData] = useState({
    name: user?.name || "Rizki Mahasiswa",
    email: user?.email || "rizki@example.com",
    phone: "081234567890",
    bio: "Siswa SMK jurusan Teknik Komputer dan Jaringan yang sedang menjalani PKL",
    address: "Jl. Pramuka No. 123, Samarinda",
    studentId: "TKJ2023001",
    className: "XII TKJ 1",
    schoolYear: "2025/2026"
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    appNotifications: true,
    journalReminders: true,
    attendanceReminders: true,
    applicationUpdates: true,
    mentorMessages: true
  });
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleNotificationChange = (key: keyof typeof notificationSettings, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const handleSaveProfile = () => {
    setIsSaving(true);
    
    // Simulasi API call
    setTimeout(() => {
      setIsSaving(false);
      setSuccessMessage("Profil berhasil disimpan!");
      
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }, 1500);
  };
  
  const handleSaveNotifications = () => {
    setIsSaving(true);
    
    // Simulasi API call
    setTimeout(() => {
      setIsSaving(false);
      setSuccessMessage("Pengaturan notifikasi berhasil disimpan!");
      
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }, 1500);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Pengaturan</h1>
      
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center">
          <Check className="h-5 w-5 mr-2" />
          <span>{successMessage}</span>
        </div>
      )}
      
      <Tabs defaultValue="profile">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="notifications">Notifikasi</TabsTrigger>
          <TabsTrigger value="account">Akun</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Foto Profil</CardTitle>
                <CardDescription>
                  Foto profil Anda akan ditampilkan di aplikasi
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center space-y-4">
                <Avatar className="h-32 w-32">
                  {user?.profilePicture ? (
                    <AvatarImage src={user.profilePicture} alt={user.name} />
                  ) : null}
                  <AvatarFallback className="text-3xl">
                    {profileData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                
                <Button variant="outline" className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Unggah Foto
                </Button>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Informasi Pribadi</CardTitle>
                <CardDescription>
                  Perbarui informasi pribadi Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={profileData.name} 
                      onChange={handleProfileChange} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={profileData.email} 
                      onChange={handleProfileChange} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Nomor Telepon</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={profileData.phone} 
                      onChange={handleProfileChange} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Alamat</Label>
                    <Input 
                      id="address" 
                      name="address" 
                      value={profileData.address} 
                      onChange={handleProfileChange} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="studentId">NIS</Label>
                    <Input 
                      id="studentId" 
                      name="studentId" 
                      value={profileData.studentId} 
                      onChange={handleProfileChange} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="className">Kelas</Label>
                    <Input 
                      id="className" 
                      name="className" 
                      value={profileData.className} 
                      onChange={handleProfileChange} 
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">Biografi</Label>
                    <Textarea 
                      id="bio" 
                      name="bio" 
                      rows={4} 
                      value={profileData.bio} 
                      onChange={handleProfileChange} 
                    />
                  </div>
                </div>
                
                <Button onClick={handleSaveProfile} disabled={isSaving} className="mt-4">
                  {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Simpan Perubahan
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Notifikasi</CardTitle>
              <CardDescription>
                Sesuaikan preferensi notifikasi Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Notifikasi Email</h3>
                    <p className="text-sm text-gray-500">Terima notifikasi melalui email</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.emailNotifications} 
                    onCheckedChange={(checked: boolean) => 
                      handleNotificationChange("emailNotifications", checked)
                    } 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Notifikasi Aplikasi</h3>
                    <p className="text-sm text-gray-500">Terima notifikasi di dalam aplikasi</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.appNotifications} 
                    onCheckedChange={(checked: boolean) => 
                      handleNotificationChange("appNotifications", checked)
                    } 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Pengingat Jurnal</h3>
                    <p className="text-sm text-gray-500">Dapatkan pengingat untuk mengisi jurnal kegiatan</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.journalReminders} 
                    onCheckedChange={(checked: boolean) => 
                      handleNotificationChange("journalReminders", checked)
                    } 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Pengingat Presensi</h3>
                    <p className="text-sm text-gray-500">Dapatkan pengingat untuk melakukan presensi</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.attendanceReminders} 
                    onCheckedChange={(checked: boolean) => 
                      handleNotificationChange("attendanceReminders", checked)
                    } 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Update Pengajuan PKL</h3>
                    <p className="text-sm text-gray-500">Dapatkan notifikasi tentang status pengajuan PKL</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.applicationUpdates} 
                    onCheckedChange={(checked: boolean) => 
                      handleNotificationChange("applicationUpdates", checked)
                    } 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Pesan dari Pembimbing</h3>
                    <p className="text-sm text-gray-500">Dapatkan notifikasi ketika menerima pesan baru</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.mentorMessages} 
                    onCheckedChange={(checked: boolean) => 
                      handleNotificationChange("mentorMessages", checked)
                    } 
                  />
                </div>
              </div>
              
              <Button onClick={handleSaveNotifications} disabled={isSaving}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Simpan Pengaturan
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Akun</CardTitle>
              <CardDescription>
                Kelola akun dan keamanan Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Ubah Password</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="current-password">Password Saat Ini</Label>
                  <Input id="current-password" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new-password">Password Baru</Label>
                  <Input id="new-password" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Konfirmasi Password Baru</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                
                <Button>
                  Ubah Password
                </Button>
              </div>
              
              <div className="border-t pt-6 space-y-4">
                <h3 className="text-lg font-medium">Preferensi Bahasa</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="language">Bahasa</Label>
                  <Select defaultValue="id">
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Pilih bahasa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="id">Bahasa Indonesia</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button>
                  Simpan Preferensi
                </Button>
              </div>
              
              <div className="border-t pt-6 space-y-4">
                <h3 className="text-lg font-medium text-red-600">Zona Berbahaya</h3>
                <p className="text-sm text-gray-500">
                  Tindakan berikut tidak dapat dibatalkan. Harap berhati-hati.
                </p>
                
                <Button variant="destructive">
                  Hapus Akun
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
