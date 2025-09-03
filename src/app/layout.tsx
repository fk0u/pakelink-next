import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AutoLoginRedirect from "@/components/auth/AutoLoginRedirect";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PakeLink - Sistem PKL SMKN 7 Samarinda",
  description: "Aplikasi Pengelolaan PKL untuk Siswa SMKN 7 Samarinda",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AutoLoginRedirect>
          {children}
        </AutoLoginRedirect>
      </body>
    </html>
  );
}
