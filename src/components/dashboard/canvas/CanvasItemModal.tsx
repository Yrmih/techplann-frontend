"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { canvasItemSchema, CanvasItemValues } from "@/lib/validators/canvas.schema";

interface CanvasItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  color: string;
}

export const CanvasItemModal = ({ isOpen, onClose, title, color }: CanvasItemModalProps) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CanvasItemValues>({
    resolver: zodResolver(canvasItemSchema),
  });

  const onSubmit = (data: CanvasItemValues) => {
    console.log(`Salvando em ${title}:`, data);
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden border-none rounded-2xl bg-white shadow-2xl">
        
        <DialogHeader className={`p-4 ${color} text-white flex flex-row items-center justify-between`}>
          <DialogTitle className="text-sm font-black uppercase tracking-widest">{title}</DialogTitle>
          <button onClick={onClose} className="hover:opacity-70 transition-opacity"><X size={18} /></button>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-tighter">{title}</label>
            <textarea 
              {...register("descricao")}
              placeholder="Descreva o item..."
              className="w-full h-32 p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#10b981] resize-none transition-all text-sm"
            />
            {errors.descricao && <span className="text-[10px] text-red-500 font-bold">{errors.descricao.message}</span>}
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <button type="button" onClick={onClose} className="px-6 py-2.5 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all">Fechar</button>
            <button type="submit" className="px-8 py-2.5 bg-[#10b981] text-white rounded-xl text-xs font-bold hover:bg-[#0da673] shadow-lg shadow-emerald-100 transition-all">Salvar</button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};