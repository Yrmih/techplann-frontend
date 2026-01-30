"use client";

import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: React.ReactNode;
}

export const LoadingButton = ({ 
  isLoading, 
  children, 
  className, 
  disabled, 
  ...props 
}: LoadingButtonProps) => {
  return (
    <button
      disabled={isLoading || disabled}
      
      className={`relative flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed min-h-[52px] ${className}`}
      {...props}
    >
      {isLoading ? (
        
        <Loader2 className="h-6 w-6 animate-spin text-white" />
      ) : (
        
        <>{children}</>
      )}
    </button>
  );
};