"use client";

import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Shield, TrendingUp, AlertTriangle, Zap } from "lucide-react";
import { swotItemSchema, SwotItemValues } from "@/lib/validators/swot.schema";
import { SwotItem } from "@/hooks/useSwot"; // Importe o tipo aqui
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { CustomSelect } from "@/components/ui/custom/CustomSelect";

// 1. ATUALIZAÇÃO DA INTERFACE (Resolvendo o erro de tipagem no componente Pai)
interface SwotItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  tipo: "Força" | "Fraqueza" | "Oportunidade" | "Ameaça";
  item?: SwotItem | null; // Agora aceita o item para edição
}

export const SwotItemModal = ({
  isOpen,
  onClose,
  tipo,
  item, // Recebendo o item
}: SwotItemModalProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<SwotItemValues>({
    resolver: zodResolver(swotItemSchema),
    defaultValues: {
      descricao: "",
      importancia: "3",
      intensidade: "3",
      tendencia: "3",
      pontuacaao: 27,
    },
  });

  // 2. SINCRONIZAÇÃO DE EDIÇÃO (Resetar o form quando o item mudar)
  useEffect(() => {
    if (isOpen) {
      if (item) {
        reset({
          descricao: item.titulo, // ou item.descricao dependendo do seu banco
          importancia: String(item.importancia || "3"),
          intensidade: String(item.intensidade || "3"),
          tendencia: String(item.tendencia || "3"),
          pontuacaao: item.pontuacao || 27,
        });
      } else {
        reset({
          descricao: "",
          importancia: "3",
          intensidade: "3",
          tendencia: "3",
          pontuacaao: 27,
        });
      }
    }
  }, [isOpen, item, reset]);

  const imp = useWatch({ control, name: "importancia" });
  const int = useWatch({ control, name: "intensidade" });
  const ten = useWatch({ control, name: "tendencia" });

  // 3. CÁLCULO DINÂMICO (Calculamos no render para evitar o erro de cascading renders)
  const calculatedScore = Number(imp) * Number(int) * Number(ten);

  // Sincronizamos o valor do score com o form apenas no submit ou via setValue sem disparar re-render
  useEffect(() => {
    setValue("pontuacaao", calculatedScore);
  }, [calculatedScore, setValue]);

  const onSubmit = (data: SwotItemValues) => {
    console.log(`Item Salvo em ${tipo}:`, data);
    reset();
    onClose();
  };

  const getIcon = () => {
    switch (tipo) {
      case "Força":
        return <Shield className="text-emerald-500" size={20} />;
      case "Fraqueza":
        return <AlertTriangle className="text-rose-500" size={20} />;
      case "Oportunidade":
        return <TrendingUp className="text-blue-500" size={20} />;
      case "Ameaça":
        return <Zap className="text-amber-500" size={20} />;
    }
  };

  const options = [
    { value: "1", label: "1 - Baixa" },
    { value: "3", label: "3 - Média" },
    { value: "5", label: "5 - Alta" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] rounded-[32px] p-0 overflow-hidden border-none shadow-2xl bg-white">
        <DialogHeader className="p-6 border-b border-slate-50 flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-50 rounded-lg">{getIcon()}</div>
            <DialogTitle className="text-lg font-bold text-slate-900 tracking-tight">
              {item ? `Editar ${tipo}` : `Adicionar ${tipo}`}
            </DialogTitle>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
          >
            <X size={20} />
          </button>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          <div className="space-y-2 text-left">
            <Label className="text-sm font-bold text-slate-700 ml-1">
              Descrição do Item *
            </Label>
            <textarea
              {...register("descricao")}
              placeholder={`Descreva esta ${tipo.toLowerCase()}...`}
              className="w-full h-24 p-4 bg-slate-50/50 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#10b981] transition-all resize-none font-medium text-slate-600"
            />
            {errors.descricao && (
              <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider">
                {errors.descricao.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <CustomSelect
              label="Importância"
              value={imp}
              options={options}
              onValueChange={(v) => setValue("importancia", v)}
            />
            <CustomSelect
              label="Intensidade"
              value={int}
              options={options}
              onValueChange={(v) => setValue("intensidade", v)}
            />
            <CustomSelect
              label="Tendência"
              value={ten}
              options={options}
              onValueChange={(v) => setValue("tendencia", v)}
            />
          </div>

          <div className="bg-emerald-50/50 border border-emerald-100/50 rounded-2xl p-6 flex flex-col items-center justify-center space-y-1">
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[2px]">
              Pontuação Estratégica
            </span>
            <span className="text-5xl font-black text-emerald-500">
              {calculatedScore}
            </span>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-12 border border-slate-200 rounded-xl font-bold text-slate-500 hover:bg-slate-50 text-sm"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 h-12 bg-[#10b981] text-white rounded-xl font-bold hover:bg-[#0da673] shadow-lg text-sm"
            >
              Salvar Item
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
