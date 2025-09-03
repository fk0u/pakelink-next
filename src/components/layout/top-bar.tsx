"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, MoreVertical } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Sidebar } from "./sidebar";

export function TopBar() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="fixed inset-x-0 top-0 z-10 border-b border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950 lg:hidden">
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard"
          className="flex items-center text-xl font-bold text-gray-900 dark:text-white"
        >
          <span className="text-primary">Pake</span>
          <span>Link</span>
        </Link>
        <div className="flex items-center gap-2">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0 pt-10">
              <Sidebar />
            </SheetContent>
          </Sheet>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
            <span className="sr-only">More</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
