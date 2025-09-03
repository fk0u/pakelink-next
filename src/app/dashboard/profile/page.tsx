"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/lib/store";
import { useState } from "react";
import { Calendar, Clock, Link2, Loader2, LogIn, Share2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function ProfilePage() {
  const { user, updateUser } = useAuthStore();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || "",
    profilePicture: user?.profilePicture || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // This would be your API call to update the user profile
      // await updateUserProfile(formData);
      
      // For now, we'll just update the local state
      updateUser({
        ...user!,
        ...formData,
      });
      
      toast({
        title: "Profil Berhasil Diperbarui",
        description: "Perubahan profil Anda telah disimpan.",
      });
    } catch (error) {
      toast({
        title: "Gagal Memperbarui Profil",
        description: "Terjadi kesalahan saat memperbarui profil.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (!user) return null;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Profil Saya</h1>
      
      <div className="grid gap-6 md:grid-cols-[1fr_3fr]">
        <Card>
          <CardHeader>
            <CardTitle>Foto Profil</CardTitle>
            <CardDescription>
              Foto profil Anda akan ditampilkan di seluruh aplikasi.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Avatar className="h-32 w-32 mb-4">
              {formData.profilePicture ? (
                <AvatarImage src={formData.profilePicture} alt={formData.name} />
              ) : (
                <AvatarFallback className="text-2xl">{getInitials(formData.name)}</AvatarFallback>
              )}
            </Avatar>
            <div className="space-y-4 w-full">
              <Label htmlFor="profilePicture">URL Foto Profil</Label>
              <Input
                id="profilePicture"
                name="profilePicture"
                value={formData.profilePicture}
                onChange={handleChange}
                placeholder="https://example.com/avatar.jpg"
              />
              <Button className="w-full" variant="outline">
                Unggah Foto
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Informasi Profil</CardTitle>
              <CardDescription>
                Perbarui informasi profil Anda di sini.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled
                />
                <p className="text-xs text-muted-foreground">
                  Email Anda tidak dapat diubah.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Ceritakan sedikit tentang diri Anda..."
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Simpan Perubahan
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>

      {/* Activity Log Section */}
      <h2 className="text-2xl font-bold mt-10 mb-4">Aktivitas Terbaru</h2>
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Aktivitas</CardTitle>
          <CardDescription>
            Riwayat aktivitas terbaru Anda dalam aplikasi.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Example activity items */}
            <ActivityItem 
              icon={<LogIn className="h-5 w-5 text-blue-500" />}
              title="Login ke aplikasi"
              timestamp="Hari ini, 10:45"
              description="Login dari perangkat Windows, Chrome browser"
            />
            
            <ActivityItem 
              icon={<Link2 className="h-5 w-5 text-green-500" />}
              title="Membuat tautan baru"
              timestamp="Kemarin, 15:30"
              description="Tautan untuk 'Website Portfolio' telah dibuat"
            />
            
            <ActivityItem 
              icon={<Share2 className="h-5 w-5 text-purple-500" />}
              title="Membagikan tautan"
              timestamp="3 hari yang lalu, 09:15"
              description="Tautan 'Dokumen PKL' dibagikan via email"
            />
            
            <ActivityItem 
              icon={<Calendar className="h-5 w-5 text-orange-500" />}
              title="Perubahan profil"
              timestamp="1 minggu yang lalu, 14:20"
              description="Informasi profil Anda telah diperbarui"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Lihat Semua Aktivitas
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

// Activity Item Component
interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  timestamp: string;
  description: string;
}

function ActivityItem({ icon, title, timestamp, description }: ActivityItemProps) {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 bg-gray-100 dark:bg-gray-800 p-2 rounded-full">
        {icon}
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="font-medium">{title}</p>
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="mr-1 h-3 w-3" />
            {timestamp}
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
