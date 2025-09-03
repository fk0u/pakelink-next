"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Golden ratio ~ 1.618 digunakan dalam aspect ratio class: aspect-[1.618/1]

interface ChartContainerProps {
  title: string;
  description?: string;
  className?: string;
  filter?: React.ReactNode;
  children: React.ReactNode;
}

export function ChartContainer({ 
  title, 
  description, 
  className, 
  filter, 
  children 
}: ChartContainerProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
          {description && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
        {filter && (
          <div className="flex items-center">
            {filter}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div 
          className={cn(
            "w-full min-h-[300px]", // Gunakan min-height dengan nilai tetap
            "aspect-[1.618/1]" // Gunakan nilai PHI langsung di class
          )}
        >
          {children}
        </div>
      </CardContent>
    </Card>
  );
}

// Placeholder untuk chart - akan digantikan dengan chart library sebenarnya
export function ChartPlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-md border border-dashed border-gray-300 dark:border-gray-700">
      <div className="text-center">
        <div className="mb-2 flex justify-center">
          <svg 
            className="w-12 h-12 text-gray-400 dark:text-gray-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" 
            />
          </svg>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Grafik akan ditampilkan di sini
        </p>
      </div>
    </div>
  );
}
