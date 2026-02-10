"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { swotCreateSchema, SwotCreateValues } from "@/lib/validators/swot.schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface SwotCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: SwotCreateValues) => void;
}

export const SwotCreateModal = ({ isOpen, onClose, onSuccess }: SwotCreateModalProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<SwotCreateValues>({
    resolver: zodResolver(swotCreateSchema),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] rounded-[24px] p-0 overflow-hidden border-none shadow-2xl bg-white">
        <DialogHeader className="p-6 bg-[#10b981] flex flex-row items-center justify-between">
          <DialogTitle className="text-white font-bold text-sm uppercase tracking-wider">
            Nova Análise SWOT
          </DialogTitle>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-all">
            <X size={20} />
          </button>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSuccess)} className="p-8 space-y-6 text-left">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700">Nome da Análise</label>
            <input 
              {...register("nome")}
              placeholder="Ex: Expansão Regional 2026"
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#10b981]"
            />
            {errors.nome && <p className="text-[10px] text-red-500 font-bold">{errors.nome.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700">Descrição (opcional)</label>
            <textarea 
              {...register("descricao")}
              placeholder="Contexto da análise..."
              className="w-full h-24 p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#10b981] resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-3 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 text-sm">
              Cancelar
            </button>
            <button type="submit" className="flex-1 py-3 bg-[#10b981] text-white rounded-xl font-bold hover:bg-[#0da673] shadow-lg shadow-emerald-100 text-sm">
              Criar
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};