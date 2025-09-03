"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Varian untuk warna stat card
const statCardVariants = cva(
  "transition-all hover:shadow-md",
  {
    variants: {
      variant: {
        default: "border-l-4 border-primary-500 dark:border-primary-400",
        success: "border-l-4 border-green-500 dark:border-green-400",
        warning: "border-l-4 border-amber-500 dark:border-amber-400",
        danger: "border-l-4 border-red-500 dark:border-red-400",
        info: "border-l-4 border-blue-500 dark:border-blue-400",
        purple: "border-l-4 border-purple-500 dark:border-purple-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Varian untuk ikon stat card
const iconVariants = cva(
  "p-2 rounded-full",
  {
    variants: {
      variant: {
        default: "bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300",
        success: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
        warning: "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300",
        danger: "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300",
        info: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
        purple: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Interface untuk trend
interface TrendProps {
  value: string;
  isPositive?: boolean;
  isNeutral?: boolean;
}

// Komponen Trend
const Trend = ({ value, isPositive = true, isNeutral = false }: TrendProps) => {
  return (
    <div 
      className={cn(
        "flex items-center text-xs font-medium",
        isNeutral ? "text-gray-500 dark:text-gray-400" : 
          isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
      )}
    >
      {!isNeutral && (
        <svg 
          className="w-3 h-3 mr-1" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d={isPositive ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"} 
          />
        </svg>
      )}
      <span>{value}</span>
    </div>
  );
};

// Interface untuk StatCard
export interface StatCardProps extends VariantProps<typeof statCardVariants> {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: TrendProps;
  description?: string;
  link?: {
    href: string;
    label: string;
  };
  className?: string;
}

// Komponen StatCard
export function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  description,
  link, 
  variant, 
  className 
}: StatCardProps) {
  return (
    <Card className={cn(statCardVariants({ variant }), className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </CardTitle>
          <div className={iconVariants({ variant })}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {value}
        </div>
        {trend && <Trend {...trend} />}
        {description && (
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {description}
          </div>
        )}
      </CardContent>
      {link && (
        <CardFooter className="pt-0">
          <a 
            href={link.href} 
            className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
          >
            {link.label} &rarr;
          </a>
        </CardFooter>
      )}
    </Card>
  );
}
