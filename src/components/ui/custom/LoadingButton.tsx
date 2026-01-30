"use client";

import React from "react";
import { Loader2 } from "lucide-react";

// Tipagem completa herdando as propriedades nativas de um botão HTML
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
      // Desabilita o botão automaticamente enquanto carrega para evitar cliques duplos
      disabled={isLoading || disabled}
      className={`relative flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          {/* Spinner animado que segue o design do Figma */}
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="opacity-90">Carregando...</span>
        </div>
      ) : (
        // Renderiza o conteúdo normal do botão (texto e ícone de seta)
        <>{children}</>
      )}
    </button>
  );
};