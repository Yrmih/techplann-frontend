"use client";


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { swotItemSchema, SwotItemValues } from "@/lib/validators/swot.schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface SwotItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  tipo: "Força" | "Fraqueza" | "Oportunidade" | "Ameaça";
}

export const SwotItemModal = ({ isOpen, onClose, tipo }: SwotItemModalProps) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<SwotItemValues>({
    resolver: zodResolver(swotItemSchema),
    defaultValues: { descricao: "", pontuacaao: 0 }
  });

  const onSubmit = (data: SwotItemValues) => {
    console.log(`Adicionando ${tipo}:`, data);
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] rounded-2xl p-0 overflow-hidden border-none shadow-2xl bg-white">
        <DialogHeader className="p-6 border-b border-gray-100 flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-bold text-gray-900">Adicionar {tipo}</DialogTitle>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={20} /></button>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Descrição</label>
            <textarea 
              {...register("descricao")}
              placeholder="Descreva o item..."
              className="w-full h-24 p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#10b981] resize-none transition-all"
            />
            {errors.descricao && <span className="text-xs text-red-500 font-medium">{errors.descricao.message}</span>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Pontuação (1-100)</label>
            <input 
              {...register("pontuacaao", { valueAsNumber: true })}
              type="number"
              placeholder="0"
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#10b981]"
            />
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <button type="button" onClick={onClose} className="px-6 py-3 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-all">Cancelar</button>
            <button type="submit" className="px-8 py-3 bg-[#10b981] text-white rounded-xl font-bold hover:bg-[#0da673] shadow-lg shadow-emerald-100 transition-all">Salvar</button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};