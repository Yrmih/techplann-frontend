
"use client";

import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NextButtonProps {
  onBack?: () => void;
  nextLabel?: string;
  isSubmitting?: boolean;
  showBack?: boolean;
}

export const NextButton = ({
  onBack,
  nextLabel = "Next", 
  isSubmitting = false,
  showBack = true,
}: NextButtonProps) => {
  return (
    <div className="flex justify-between items-center pt-6 border-t border-gray-50 mt-6">
      {showBack ? (
        <Button
          variant="outline"
          type="button"
          onClick={onBack}
          className="text-xs font-bold gap-2 px-6 h-10 border-gray-200 text-gray-400 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={16} /> Voltar
        </Button>
      ) : (
        <div /> 
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-[#10b981] hover:bg-[#0da673] font-bold gap-2 px-10 h-10 transition-all active:scale-95 shadow-lg shadow-green-100/40"
      >
        {isSubmitting ? "Carregando..." : nextLabel}
        {!isSubmitting && <ArrowRight size={16} />}
      </Button>
    </div>
  );
};