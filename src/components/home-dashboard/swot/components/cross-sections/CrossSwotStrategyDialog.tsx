"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  CrossStrategy,
  CrossStrategyType,
} from "@/hooks/useSwotCrossStrategies";
import { SwotItem } from "@/hooks/useSwot";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Shield,
  AlertTriangle,
  TrendingUp,
  Target,
  Swords,
  ShieldCheck,
  Lightbulb,
  LifeBuoy,
  X,
  Save,
  Zap,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils/utils";

const formSchema = z.object({
  titulo: z.string().min(1, "Título é obrigatório"),
  descricao: z.string().optional(),
  prioridade: z.enum(["baixa", "media", "alta"]),
  impacto: z.number().min(1).max(5),
  esforco: z.number().min(1).max(5),
  risco: z.number().min(1).max(5),
  responsavel: z.string().optional(),
  prazo: z.string().optional(),
  status: z.enum(["planejada", "em_andamento", "concluida"]),
});

type FormData = z.infer<typeof formSchema>;

const tipoConfig: Record<
  CrossStrategyType,
  {
    label: string;
    description: string;
    color: string;
    icon: React.ElementType;
    internalTypes: string[];
    externalTypes: string[];
  }
> = {
  FO: {
    label: "Ofensivas (FO)",
    description: "Use forças para maximizar oportunidades.",
    color: "text-emerald-500",
    icon: Swords,
    internalTypes: ["forca"],
    externalTypes: ["oportunidade"],
  },
  FA: {
    label: "Confronto (FA)",
    description: "Use forças para mitigar ameaças.",
    color: "text-blue-500",
    icon: ShieldCheck,
    internalTypes: ["forca"],
    externalTypes: ["ameaca"],
  },
  WO: {
    label: "Reforço (WO)",
    description: "Corrija fraquezas via oportunidades.",
    color: "text-amber-500",
    icon: Lightbulb,
    internalTypes: ["fraqueza"],
    externalTypes: ["oportunidade"],
  },
  WT: {
    label: "Defensivas (WT)",
    description: "Minimize fraquezas e evite ameaças.",
    color: "text-rose-500",
    icon: LifeBuoy,
    internalTypes: ["fraqueza"],
    externalTypes: ["ameaca"],
  },
};

const tipoIcons: Record<string, React.ElementType> = {
  forca: Shield,
  fraqueza: AlertTriangle,
  oportunidade: TrendingUp,
  ameaca: Target,
};

const impactoLabels = ["Muito Baixo", "Baixo", "Médio", "Alto", "Muito Alto"];
const esforcoLabels = ["Muito Baixo", "Baixo", "Médio", "Alto", "Muito Alto"];
const riscoLabels = ["Muito Baixo", "Baixo", "Médio", "Alto", "Muito Alto"];

const scaleOptions = (labels: string[]) =>
  labels.map((label, i) => ({ value: i + 1, label: `${i + 1} - ${label}` }));

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tipo: CrossStrategyType;
  strategy: CrossStrategy | null;
  swotItems: SwotItem[];
  onSave: (data: FormData & { swot_item_ids: string[] }) => void;
  isSaving: boolean;
}

export const CrossSwotStrategyDialog = ({
  open,
  onOpenChange,
  tipo,
  strategy,
  swotItems,
  onSave,
  isSaving,
}: Props) => {
  const config = tipoConfig[tipo];
  const IconHeader = config.icon;
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);

  const internalItems = swotItems.filter((i) =>
    config.internalTypes.includes(i.tipo),
  );
  const externalItems = swotItems.filter((i) =>
    config.externalTypes.includes(i.tipo),
  );

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: "",
      descricao: "",
      prioridade: "media",
      impacto: 3,
      esforco: 3,
      risco: 3,
      responsavel: "",
      prazo: "",
      status: "planejada",
    },
  });

  useEffect(() => {
    if (open) {
      if (strategy) {
        form.reset({
          titulo: strategy.titulo,
          descricao: strategy.descricao || "",
          prioridade: strategy.prioridade,
          impacto: strategy.impacto,
          esforco: strategy.esforco,
          risco: strategy.risco,
          responsavel: strategy.responsavel || "",
          prazo: strategy.prazo || "",
          status: strategy.status,
        });
        // Sincroniza os IDs vindo da relação do banco (swot_items) para o estado interno do form
        const ids = strategy.swot_items?.map((item) => item.id) || [];
        setSelectedItemIds(ids);
      } else {
        form.reset({
          titulo: "",
          descricao: "",
          prioridade: "media",
          impacto: 3,
          esforco: 3,
          risco: 3,
          responsavel: "",
          prazo: "",
          status: "planejada",
        });
        setSelectedItemIds([]);
      }
    }
  }, [open, strategy, form]);

  const toggleItem = (id: string) => {
    setSelectedItemIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const renderItemList = (items: SwotItem[], label: string) => (
    <div className="space-y-3">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
        {label}
      </p>
      <div className="space-y-2 max-h-[160px] overflow-y-auto pr-2 custom-scrollbar text-left">
        {items.map((item) => {
          const Icon = tipoIcons[item.tipo];
          const isSelected = selectedItemIds.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl border-2 transition-all cursor-pointer",
                isSelected
                  ? "bg-indigo-50 border-indigo-500 shadow-sm"
                  : "bg-white border-slate-100 hover:border-slate-200",
              )}
            >
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => toggleItem(item.id)}
                className="rounded-md border-2"
              />
              {Icon && <Icon size={14} className="text-slate-400" />}
              <span className="text-xs font-bold text-slate-700 truncate flex-1">
                {item.titulo}
              </span>
              <Badge variant="secondary" className="text-[10px] font-black">
                {item.pontuacao}
              </Badge>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[850px] max-h-[95vh] p-0 overflow-hidden border-none rounded-[32px] bg-white shadow-2xl flex flex-col">
        {/* HEADER ELITE COM DESCRIÇÃO DO LOVABLE */}
        <div className="px-8 py-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-4 text-left">
            <div
              className={cn("p-3 rounded-2xl bg-white shadow-sm", config.color)}
            >
              <IconHeader size={24} strokeWidth={2.5} />
            </div>
            <div className="text-left">
              <DialogTitle className="text-xl font-black text-slate-900 uppercase tracking-tight leading-none">
                {strategy ? "Editar Estratégia" : `Nova ${config.label}`}
              </DialogTitle>
              <p className="text-[11px] font-bold text-slate-400 uppercase mt-1.5 tracking-wider">
                {config.description}
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

        <ScrollArea className="flex-1 overflow-y-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) =>
                onSave({ ...data, swot_item_ids: selectedItemIds }),
              )}
              className="p-8 space-y-8"
            >
              {/* SELEÇÃO DE ITENS DINÂMICOS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left bg-slate-50/50 p-6 rounded-[24px] border border-slate-100">
                {renderItemList(
                  internalItems,
                  tipo.startsWith("F")
                    ? "Forças Relacionadas"
                    : "Fraquezas Relacionadas",
                )}
                {renderItemList(
                  externalItems,
                  tipo.endsWith("O")
                    ? "Oportunidades Relacionadas"
                    : "Ameaças Relacionadas",
                )}
              </div>

              <div className="space-y-6 text-left">
                <FormField
                  control={form.control}
                  name="titulo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                        Título da Estratégia *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Descreva o objetivo estratégico..."
                          className="h-14 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold focus:border-indigo-500 transition-all outline-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="prioridade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                          Prioridade
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12 border-2 border-slate-100 rounded-xl font-bold focus:ring-0">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl font-bold">
                            <SelectItem value="baixa">Baixa</SelectItem>
                            <SelectItem value="media">Média</SelectItem>
                            <SelectItem value="alta">Alta</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                          Status
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12 border-2 border-slate-100 rounded-xl font-bold focus:ring-0">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl font-bold">
                            <SelectItem value="planejada">Planejada</SelectItem>
                            <SelectItem value="em_andamento">
                              Em Andamento
                            </SelectItem>
                            <SelectItem value="concluida">Concluída</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="responsavel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                          Responsável
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nome do Gestor"
                            className="h-12 border-2 border-slate-100 rounded-xl font-bold outline-none"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* ESCALAS DE BI (IMPACTO, ESFORÇO, RISCO) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {(
                    [
                      {
                        name: "impacto",
                        label: "Impacto",
                        labels: impactoLabels,
                      },
                      {
                        name: "esforco",
                        label: "Esforço",
                        labels: esforcoLabels,
                      },
                      { name: "risco", label: "Risco", labels: riscoLabels },
                    ] as const
                  ).map((attr) => (
                    <FormField
                      key={attr.name}
                      control={form.control}
                      name={attr.name}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                            {attr.label}
                          </FormLabel>
                          <Select
                            onValueChange={(v) => field.onChange(parseInt(v))}
                            value={field.value.toString()}
                          >
                            <FormControl>
                              <SelectTrigger className="h-12 border-2 border-slate-100 rounded-xl font-bold focus:ring-0">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-xl font-bold">
                              {scaleOptions(attr.labels).map((o) => (
                                <SelectItem
                                  key={o.value}
                                  value={o.value.toString()}
                                >
                                  {o.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="prazo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                          Prazo Final
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            className="h-14 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold outline-none"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormItem className="flex flex-col justify-end">
                    <div className="bg-slate-900 p-4 rounded-2xl flex items-center justify-between shadow-lg">
                      <div className="flex items-center gap-2">
                        <Zap size={14} className="text-[#10b981]" />
                        <span className="text-[9px] font-black text-white uppercase tracking-widest">
                          Score Prioritário
                        </span>
                      </div>
                      <span className="text-2xl font-black text-white">
                        {form.watch("impacto") * 2 +
                          (6 - form.watch("esforco")) +
                          (6 - form.watch("risco"))}
                      </span>
                    </div>
                  </FormItem>
                </div>

                <FormField
                  control={form.control}
                  name="descricao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        Detalhamento da Ação
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Como pretendemos executar essa estratégia..."
                          rows={3}
                          className="bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold resize-none outline-none transition-all"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* FOOTER DO FORMULÁRIO */}
              <div className="flex gap-4 pt-6 shrink-0 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="flex-1 h-14 rounded-2xl font-black uppercase text-[11px] tracking-widest border-2"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="flex-[2] h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-lg gap-2"
                >
                  {isSaving ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <Save size={18} />
                  )}
                  {strategy ? "Salvar Alterações" : "Gerar Estratégia"}
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
