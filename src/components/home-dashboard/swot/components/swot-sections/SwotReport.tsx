"use client";

import { useRef } from "react";
import { SwotItem } from "@/hooks/useSwot";
import { SwotAnalysis } from "@/hooks/useSwotAnalyses";
import { CrossStrategy } from "@/hooks/useSwotCrossStrategies";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Printer, Download } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  analysis: SwotAnalysis;
  swotItems: SwotItem[];
  crossStrategies: CrossStrategy[];
  planejamentoNome: string;
}

const tipoLabels: Record<
  string,
  { label: string; color: string; hex: string }
> = {
  forca: { label: "Forças", color: "text-emerald-600", hex: "#10b981" },
  fraqueza: { label: "Fraquezas", color: "text-rose-600", hex: "#f43f5e" },
  oportunidade: {
    label: "Oportunidades",
    color: "text-blue-600",
    hex: "#3b82f6",
  },
  ameaca: { label: "Ameaças", color: "text-amber-600", hex: "#f59e0b" },
};

const crossLabels: Record<string, { label: string; hex: string }> = {
  FO: { label: "FO – Ofensivas", hex: "#10b981" },
  FA: { label: "FA – Defensivas", hex: "#3b82f6" },
  WO: { label: "WO – Melhoria", hex: "#f59e0b" },
  WT: { label: "WT – Sobrevivência", hex: "#ef4444" },
};

const statusLabels: Record<string, string> = {
  planejada: "Planejada",
  em_andamento: "Em Andamento",
  concluida: "Concluída",
};

const prioridadeLabels: Record<string, string> = {
  baixa: "Baixa",
  media: "Média",
  alta: "Alta",
};

export default function SwotReport({
  open,
  onOpenChange,
  analysis,
  swotItems,
  crossStrategies,
  planejamentoNome,
}: Props) {
  const reportRef = useRef<HTMLDivElement>(null);

  const grouped = {
    forca: swotItems.filter((i) => i.tipo === "forca"),
    fraqueza: swotItems.filter((i) => i.tipo === "fraqueza"),
    oportunidade: swotItems.filter((i) => i.tipo === "oportunidade"),
    ameaca: swotItems.filter((i) => i.tipo === "ameaca"),
  };

  const totals = {
    forca: grouped.forca.reduce((s, i) => s + i.pontuacao, 0),
    fraqueza: grouped.fraqueza.reduce((s, i) => s + i.pontuacao, 0),
    oportunidade: grouped.oportunidade.reduce((s, i) => s + i.pontuacao, 0),
    ameaca: grouped.ameaca.reduce((s, i) => s + i.pontuacao, 0),
  };

  const crossGrouped = {
    FO: crossStrategies.filter((s) => s.tipo === "FO"),
    FA: crossStrategies.filter((s) => s.tipo === "FA"),
    WO: crossStrategies.filter((s) => s.tipo === "WO"),
    WT: crossStrategies.filter((s) => s.tipo === "WT"),
  };

  const barData = (
    ["forca", "fraqueza", "oportunidade", "ameaca"] as const
  ).map((t) => ({
    name: tipoLabels[t].label,
    total: totals[t],
    qtd: grouped[t].length,
    fill: tipoLabels[t].hex,
  }));

  const radarData = (
    ["forca", "fraqueza", "oportunidade", "ameaca"] as const
  ).map((t) => ({
    subject: tipoLabels[t].label,
    value: totals[t],
  }));

  const pieData = (["FO", "FA", "WO", "WT"] as const)
    .map((t) => ({
      name: crossLabels[t].label,
      value: crossGrouped[t].length,
      fill: crossLabels[t].hex,
    }))
    .filter((d) => d.value > 0);

  const rankedStrategies = crossStrategies
    .map((s) => ({
      ...s,
      score: s.impacto * 2 + (6 - s.esforco) + (6 - s.risco),
    }))
    .sort((a, b) => b.score - a.score);

  const handlePrint = () => {
    const el = reportRef.current;
    if (!el) return;
    const w = window.open("", "_blank");
    if (!w) return;

    w.document.write(`<html><head>
      <title>Relatório SWOT - ${analysis.nome}</title>
      <style>
        body { font-family: 'Inter', sans-serif; padding: 40px; color: #1e293b; }
        .report-header { text-align: center; border-bottom: 3px solid #0f766e; padding-bottom: 20px; }
        h1 { font-size: 24px; color: #0f766e; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #e2e8f0; padding: 10px; text-align: left; }
      </style>
    </head><body>${el.innerHTML}</body></html>`);
    w.document.close();
    setTimeout(() => w.print(), 500);
  };

  const handleExportCSV = () => {
    const lines = [
      "Tipo,Título,Descrição,Importância,Intensidade,Tendência,Pontuação",
    ];
    swotItems.forEach((i) =>
      lines.push(
        `${i.tipo},"${i.titulo}","${i.descricao || ""}",${i.importancia},${i.intensidade},${i.tendencia},${i.pontuacao}`,
      ),
    );
    const blob = new Blob(["\uFEFF" + lines.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `relatorio-swot.csv`;
    a.click();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] rounded-[32px] border-none shadow-2xl p-0 overflow-hidden flex flex-col">
        <DialogHeader className="px-8 py-6 bg-slate-50 border-b border-slate-100 text-left">
          <DialogTitle className="text-2xl font-black uppercase tracking-tighter">
            Relatório SWOT
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div ref={reportRef} className="space-y-12">
            <div
              className="report-header"
              style={{
                textAlign: "center",
                borderBottom: "3px solid #0f766e",
                paddingBottom: 16,
              }}
            >
              <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f766e" }}>
                {analysis.nome}
              </h1>
              <div style={{ fontSize: 14, color: "#475569" }}>
                {planejamentoNome}
              </div>
            </div>

            {/* Gráficos densos do Lovable */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border rounded-2xl p-6 bg-white shadow-sm">
                <h4 className="text-[10px] font-black uppercase text-center mb-4 text-slate-400 tracking-widest">
                  Impacto por Quadrante
                </h4>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={barData}>
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Bar dataKey="total" radius={[4, 4, 0, 0]}>
                      {barData.map((d, i) => (
                        <Cell key={i} fill={d.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="border rounded-2xl p-6 bg-white shadow-sm">
                <h4 className="text-[10px] font-black uppercase text-center mb-4 text-slate-400 tracking-widest">
                  Radar Estratégico
                </h4>
                <ResponsiveContainer width="100%" height={200}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                    <PolarRadiusAxis tick={{ fontSize: 8 }} />
                    <Radar
                      dataKey="value"
                      stroke="#0f766e"
                      fill="#0f766e"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pie Chart dinâmico */}
            {pieData.length > 0 && (
              <div className="border rounded-2xl p-6 bg-white shadow-sm max-w-md mx-auto">
                <h4 className="text-[10px] font-black uppercase text-center mb-4 text-slate-400 tracking-widest">
                  Distribuição Cruzada
                </h4>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      label
                    >
                      {pieData.map((d, i) => (
                        <Cell key={i} fill={d.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: "10px" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Tabelas de Itens */}
            {(["forca", "fraqueza", "oportunidade", "ameaca"] as const).map(
              (tipo) => (
                <div key={tipo}>
                  <h2
                    className={tipo}
                    style={{
                      fontSize: 14,
                      fontWeight: 800,
                      padding: "8px 12px",
                      borderRadius: 8,
                      color: "white",
                      background: tipoLabels[tipo].hex,
                      textTransform: "uppercase",
                      marginBottom: 12,
                    }}
                  >
                    {tipoLabels[tipo].label}
                  </h2>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="p-2 border">Título</th>
                        <th className="p-2 border text-center">GUT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {grouped[tipo].map((item) => (
                        <tr key={item.id}>
                          <td className="p-2 border font-medium">
                            {item.titulo}
                          </td>
                          <td className="p-2 border text-center font-bold">
                            {item.pontuacao}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ),
            )}
          </div>
        </div>

        <DialogFooter className="p-8 bg-slate-50 border-t border-slate-100 flex gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="h-12 px-6 rounded-xl font-black uppercase text-[10px] tracking-widest"
          >
            Fechar
          </Button>
          <Button
            variant="outline"
            onClick={handleExportCSV}
            className="h-12 px-6 rounded-xl font-black uppercase text-[10px] tracking-widest gap-2"
          >
            <Download size={16} /> Exportar CSV
          </Button>
          <Button
            onClick={handlePrint}
            className="flex-1 h-12 bg-slate-900 text-white rounded-xl font-black uppercase text-[10px] tracking-widest gap-2"
          >
            <Printer size={16} /> Imprimir Relatório
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
