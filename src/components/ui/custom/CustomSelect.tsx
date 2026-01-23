"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface CustomSelectProps {
  label?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  value?: string;
  onValueChange: (value: string) => void;
  error?: boolean;
  className?: string;
}

export const CustomSelect = ({
  label,
  placeholder,
  options,
  value,
  onValueChange,
  error,
  className,
}: CustomSelectProps) => {
  return (
    <div className={cn("space-y-2 w-full", className)}>
      {label && (
        <Label className="text-sm font-medium text-gray-700">
          {label}
        </Label>
      )}
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger
          className={cn(
            "bg-white border-gray-200 transition-all text-sm h-11 w-full font-normal text-gray-700",
            "hover:border-[#10b981]",
            "focus:ring-1 focus:ring-[#10b981] focus:border-[#10b981] focus:ring-offset-0",
            "outline-none",
            error && "border-red-500 focus:ring-red-500",
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        
        <SelectContent className="rounded-xl border-gray-100 shadow-2xl p-1 animate-in fade-in zoom-in-95">
          {options.map((option) => (
            <SelectItem 
              key={option.value} 
              value={option.value}
              className={cn(
                "text-sm cursor-pointer py-2.5 rounded-lg transition-colors",
                "data-[highlighted]:bg-[#10b981] data-[highlighted]:text-white",
                "focus:bg-[#10b981] focus:text-white"
              )}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};