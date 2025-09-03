"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthStore, useUIStore, UserRole } from "@/lib/store";
import { cn } from "@/lib/utils";
import {
  BarChart4,
  BookOpenCheck,
  Building2,
  Calendar,
  ClipboardList,
  CreditCard,
  LogOut,
  MessageSquare,
  PanelLeft,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  roles?: UserRole[];
}

// Navigation items for student
const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <BarChart4 className="mr-2 h-4 w-4" />,
  },
  {
    title: "Tempat PKL",
    href: "/dashboard/companies",
    icon: <Building2 className="mr-2 h-4 w-4" />,
  },
  {
    title: "Pengajuan PKL",
    href: "/dashboard/applications",
    icon: <ClipboardList className="mr-2 h-4 w-4" />,
  },
  {
    title: "Jadwal & Presensi",
    href: "/dashboard/attendance",
    icon: <Calendar className="mr-2 h-4 w-4" />,
  },
  {
    title: "Jurnal Kegiatan",
    href: "/dashboard/journals",
    icon: <BookOpenCheck className="mr-2 h-4 w-4" />,
  },
  {
    title: "Laporan",
    href: "/dashboard/reports",
    icon: <BookOpenCheck className="mr-2 h-4 w-4" />,
  },
  {
    title: "Sertifikat",
    href: "/dashboard/certificates",
    icon: <CreditCard className="mr-2 h-4 w-4" />,
  },
  {
    title: "Pesan",
    href: "/dashboard/messages",
    icon: <MessageSquare className="mr-2 h-4 w-4" />,
  },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const { user } = useAuthStore();

  // Filter nav items based on user role
  const filteredNavItems = navItems.filter(
    (item) => !item.roles || (user && item.roles.includes(user.role))
  );

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-20 hidden transform border-r border-gray-200 bg-white pt-5 transition-all duration-300 dark:border-gray-800 dark:bg-gray-950 lg:block w-[38.2%]",
        sidebarOpen ? "translate-x-0" : "-translate-x-full",
        className
      )}
    >
      <div className="flex items-center justify-between px-4">
        <Link
          href="/dashboard"
          className="flex items-center text-xl font-bold text-gray-900 dark:text-white"
        >
          <span className="text-primary">Pake</span>
          <span>Link</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="lg:flex"
        >
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>
      <div className="mt-6 space-y-1 px-3">
        {filteredNavItems.map((item) => (
          <Button
            key={item.href}
            variant={pathname === item.href ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start",
              pathname === item.href
                ? "bg-gray-100 font-medium dark:bg-gray-800"
                : "font-normal"
            )}
            asChild
          >
            <Link href={item.href}>
              {item.icon}
              {item.title}
            </Link>
          </Button>
        ))}
      </div>
      <div className="absolute bottom-0 w-full border-t border-gray-200 p-4 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              {user?.profilePicture ? (
                <AvatarImage src={user.profilePicture} alt={user.name} />
              ) : null}
              <AvatarFallback>
                {user?.name
                  ? user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                  : "U"}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-0.5">
              <p className="text-sm font-medium">{user?.name || "Pengguna"}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.email || ""}
              </p>
            </div>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard/settings">
                <Settings className="h-4 w-4" />
                <span className="sr-only">Settings</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => useAuthStore.getState().logout()}>
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
