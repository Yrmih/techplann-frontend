"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SwotItem, SwotTipo } from "@/hooks/useSwot";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Loader2,
  Shield,
  AlertTriangle,
  TrendingUp,
  Target,
  BarChart3,
  Save,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils/utils";

const formSchema = z.object({
  titulo: z.string().min(1, "Título é obrigatório"),
  descricao: z.string().optional(),
  departamento_id: z.string().optional(),
  importancia: z.number().min(1).max(5),
  intensidade: z.number().min(1).max(5),
  tendencia: z.number().min(1).max(5),
});

type FormData = z.infer<typeof formSchema>;

interface SwotItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tipo: SwotTipo;
  item: SwotItem | null;
  departamentos: { id: string; nome: string }[];
  onSave: (data: FormData) => void;
  isSaving: boolean;
}

const tipoLabels: Record<
  SwotTipo,
  { label: string; icon: React.ElementType; color: string }
> = {
  forca: { label: "Força", icon: Shield, color: "text-emerald-500" },
  fraqueza: { label: "Fraqueza", icon: AlertTriangle, color: "text-rose-500" },
  oportunidade: {
    label: "Oportunidade",
    icon: TrendingUp,
    color: "text-blue-500",
  },
  ameaca: { label: "Ameaça", icon: Target, color: "text-amber-500" },
};

export const SwotItemDialog = ({
  open,
  onOpenChange,
  tipo,
  item,
  departamentos,
  onSave,
  isSaving,
}: SwotItemDialogProps) => {
  const tipoInfo = tipoLabels[tipo];
  const Icon = tipoInfo.icon;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: "",
      descricao: "",
      departamento_id: "",
      importancia: 3,
      intensidade: 3,
      tendencia: 3,
    },
  });

  useEffect(() => {
    if (open) {
      if (item) {
        form.reset({
          titulo: item.titulo,
          descricao: item.descricao || "",
          departamento_id: item.departamento_id || "",
          importancia: item.importancia,
          intensidade: item.intensidade,
          tendencia: item.tendencia,
        });
      } else {
        form.reset({
          titulo: "",
          descricao: "",
          departamento_id: "",
          importancia: 3,
          intensidade: 3,
          tendencia: 3,
        });
      }
    }
  }, [open, item, form]);

  const watchedValues = form.watch(["importancia", "intensidade", "tendencia"]);
  const calculatedScore =
    (watchedValues[0] || 0) * (watchedValues[1] || 0) * (watchedValues[2] || 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-none rounded-[32px] bg-white shadow-2xl outline-none">
        {/* HEADER CUSTOMIZADO */}
        <div className="px-8 py-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 rounded-2xl bg-white shadow-sm">
              <Icon size={24} strokeWidth={2.5} className={tipoInfo.color} />
            </div>
            <div className="text-left">
              <DialogTitle className="text-xl font-black text-slate-900 uppercase tracking-tight leading-none">
                {item ? `Editar ${tipoInfo.label}` : `Nova ${tipoInfo.label}`}
              </DialogTitle>
              <p className="text-[11px] font-bold text-slate-400 uppercase mt-1.5 tracking-wider text-left">
                Matriz de Diagnóstico
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="p-2 hover:bg-slate-200 rounded-xl transition-colors text-slate-400"
          >
            <X size={20} />
          </button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSave)} className="p-8 space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="titulo"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                      Título do Fator *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={`Ex: Equipe de vendas capacitada`}
                        className="h-14 px-5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold text-slate-700 outline-none focus-visible:ring-0 focus-visible:border-[#10b981] transition-all"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] font-bold uppercase text-rose-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="departamento_id"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                      Departamento
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-14 px-5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold text-slate-700 focus:ring-0 focus:border-[#10b981]">
                          <SelectValue placeholder="Selecione o setor..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-2xl border-slate-100 shadow-xl">
                        <SelectItem
                          value="none"
                          className="font-bold text-slate-400 uppercase text-[10px]"
                        >
                          Nenhum
                        </SelectItem>
                        {departamentos.map((dep) => (
                          <SelectItem
                            key={dep.id}
                            value={dep.id}
                            className="font-bold text-slate-600 focus:bg-emerald-50 focus:text-emerald-700 cursor-pointer"
                          >
                            {dep.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* RÉGUAS DE PONTUAÇÃO (GRAVIDADE, URGÊNCIA, TENDÊNCIA) */}
            <div className="space-y-5">
              <FormField
                control={form.control}
                name="importancia"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                      Gravidade (Importância)
                    </FormLabel>
                    <div className="flex gap-2 mt-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => field.onChange(num)}
                          className={cn(
                            "flex-1 py-3 rounded-xl font-black text-[13px] transition-all border-2",
                            field.value === num
                              ? "bg-[#10b981] border-[#10b981] text-white shadow-md scale-105"
                              : "bg-white border-slate-100 text-slate-400 hover:border-slate-200",
                          )}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="intensidade"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                      Urgência (Intensidade)
                    </FormLabel>
                    <div className="flex gap-2 mt-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => field.onChange(num)}
                          className={cn(
                            "flex-1 py-3 rounded-xl font-black text-[13px] transition-all border-2",
                            field.value === num
                              ? "bg-[#10b981] border-[#10b981] text-white shadow-md scale-105"
                              : "bg-white border-slate-100 text-slate-400 hover:border-slate-200",
                          )}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tendencia"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                      Tendência (Evolução)
                    </FormLabel>
                    <div className="flex gap-2 mt-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => field.onChange(num)}
                          className={cn(
                            "flex-1 py-3 rounded-xl font-black text-[13px] transition-all border-2",
                            field.value === num
                              ? "bg-[#10b981] border-[#10b981] text-white shadow-md scale-105"
                              : "bg-white border-slate-100 text-slate-400 hover:border-slate-200",
                          )}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* PAINEL DE PONTUAÇÃO CALCULADA */}
            <div className="bg-slate-900 rounded-2xl p-5 flex items-center justify-between shadow-lg">
              <div className="text-left flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg text-white">
                  <BarChart3 size={18} />
                </div>
                <div className="text-left">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-[2px] leading-none">
                    Prioridade Acumulada
                  </p>
                  <p className="text-[11px] font-bold text-slate-500 mt-1 italic leading-none">
                    Score GUT calculado
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-3xl font-black text-white">
                  {calculatedScore}
                </span>
                <span className="text-[10px] font-black text-[#10b981] block uppercase tracking-tighter mt-1 leading-none">
                  Pontos
                </span>
              </div>
            </div>

            {/* BOTÕES DE AÇÃO */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="flex-1 h-14 border-2 border-slate-100 rounded-2xl text-[12px] font-black text-slate-400 uppercase hover:bg-slate-50 transition-all tracking-widest"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="flex-[2] h-14 bg-[#10b981] text-white rounded-2xl text-[12px] font-black uppercase shadow-lg shadow-emerald-200 hover:bg-[#0da673] transition-all flex items-center justify-center gap-2 tracking-widest disabled:opacity-50"
              >
                {isSaving ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Save size={18} />
                )}
                {item ? "Salvar Alterações" : "Gravar na Matriz"}
              </button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
