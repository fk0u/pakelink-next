"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore, useUIStore, UserRole } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  Users,
  Building2,
  BookOpen,
  Clock,
  MessageSquare,
  FileBarChart,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";

// Definisi menu sidebar
const sidebarLinks = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    roles: [UserRole.ADMIN, UserRole.SCHOOL_SUPERVISOR, UserRole.COMPANY_SUPERVISOR, UserRole.STUDENT]
  },
  {
    href: "/dashboard/students",
    label: "Siswa",
    icon: <Users className="h-5 w-5" />,
    roles: [UserRole.ADMIN, UserRole.SCHOOL_SUPERVISOR, UserRole.COMPANY_SUPERVISOR]
  },
  {
    href: "/dashboard/companies",
    label: "DU/DI",
    icon: <Building2 className="h-5 w-5" />,
    roles: [UserRole.ADMIN, UserRole.SCHOOL_SUPERVISOR, UserRole.STUDENT]
  },
  {
    href: "/dashboard/journals",
    label: "Jurnal",
    icon: <BookOpen className="h-5 w-5" />,
    roles: [UserRole.ADMIN, UserRole.SCHOOL_SUPERVISOR, UserRole.COMPANY_SUPERVISOR, UserRole.STUDENT]
  },
  {
    href: "/dashboard/attendance",
    label: "Kehadiran",
    icon: <Clock className="h-5 w-5" />,
    roles: [UserRole.ADMIN, UserRole.SCHOOL_SUPERVISOR, UserRole.COMPANY_SUPERVISOR, UserRole.STUDENT]
  },
  {
    href: "/dashboard/consultations",
    label: "Konsultasi",
    icon: <MessageSquare className="h-5 w-5" />,
    roles: [UserRole.ADMIN, UserRole.SCHOOL_SUPERVISOR, UserRole.COMPANY_SUPERVISOR, UserRole.STUDENT]
  },
  {
    href: "/dashboard/reports",
    label: "Laporan",
    icon: <FileBarChart className="h-5 w-5" />,
    roles: [UserRole.ADMIN, UserRole.SCHOOL_SUPERVISOR, UserRole.COMPANY_SUPERVISOR]
  },
  {
    href: "/dashboard/settings",
    label: "Pengaturan",
    icon: <Settings className="h-5 w-5" />,
    roles: [UserRole.ADMIN, UserRole.SCHOOL_SUPERVISOR, UserRole.COMPANY_SUPERVISOR, UserRole.STUDENT]
  }
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const { sidebarOpen, toggleSidebar, isDarkMode, toggleDarkMode } = useUIStore();
  const [isMounted, setIsMounted] = useState(false);

  // Hindari hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  // Filter menu berdasarkan role
  const filteredLinks = sidebarLinks.filter(link => 
    user && link.roles.includes(user.role)
  );

  // Mendapatkan nama role
  const getRoleName = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return "Admin";
      case UserRole.SCHOOL_SUPERVISOR:
        return "Pembimbing Sekolah";
      case UserRole.COMPANY_SUPERVISOR:
        return "Pembimbing DU/DI";
      case UserRole.STUDENT:
        return "Siswa";
      default:
        return "User";
    }
  };

  // Mendapatkan inisial untuk avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className={`${isDarkMode ? "dark" : ""} min-h-screen`}>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-950">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white dark:bg-gray-900 shadow-lg transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold">PL</span>
              </div>
              <span className="text-xl font-bold dark:text-white">PakeLink</span>
            </Link>
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
              aria-label="Close Sidebar"
            >
              <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {/* Sidebar Menu */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-10rem)]">
            {filteredLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary-50 text-primary-600 dark:bg-gray-800 dark:text-primary-400"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`}
                >
                  <div className="mr-3">{link.icon}</div>
                  <span className="text-sm font-medium">{link.label}</span>
                  {isActive && (
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="absolute bottom-0 w-full p-4 border-t dark:border-gray-800">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="rounded-full"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                className="rounded-full text-red-500"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Topbar */}
          <header className="bg-white dark:bg-gray-900 shadow-sm z-10">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleSidebar}
                  className="p-1 rounded-md lg:hidden hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label="Open Sidebar"
                >
                  <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                </button>
                <h1 className="text-lg font-medium text-gray-800 dark:text-white">
                  {pathname === "/dashboard"
                    ? "Dashboard"
                    : filteredLinks.find((link) => link.href === pathname)?.label || "Dashboard"}
                </h1>
              </div>

              {/* User Profile */}
              {user && (
                <div className="flex items-center space-x-4">
                  <div className="hidden md:block text-right">
                    <p className="text-sm font-medium text-gray-800 dark:text-white">{user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{getRoleName(user.role)}</p>
                  </div>
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.profilePicture} alt={user.name} />
                    <AvatarFallback className="bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-950 p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
