"use client";

import { useMemo } from "react";
import {
  CrossStrategy,
  CrossStrategyType,
} from "@/hooks/useSwotCrossStrategies";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
  Legend,
} from "recharts";
import {
  Trophy,
  Map,
  TrendingUp,
  ArrowUpDown,
  Target,
  Zap,
  Rocket,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils/utils";

// 1. Definição do nó de dados
interface ScatterDataNode {
  x: number;
  y: number;
  z: number;
  name: string;
  tipo: CrossStrategyType;
  score: number;
  risco: number;
}

// 2.Interface que estende o comportamento do Recharts

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: ScatterDataNode;
  }>;
  label?: string;
}

const tipoColors: Record<CrossStrategyType, string> = {
  FO: "#10b981",
  FA: "#3b82f6",
  WO: "#f59e0b",
  WT: "#ef4444",
};

const tipoLabels: Record<CrossStrategyType, string> = {
  FO: "Ofensiva",
  FA: "Defensiva",
  WO: "Melhoria",
  WT: "Sobrevivência",
};

// 3. Tooltip usando a interface customizada (ZERO ERROS)
const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-slate-900 border-0 rounded-2xl shadow-2xl p-4 text-left max-w-[240px] outline-none">
        <p className="text-[12px] font-black text-white uppercase tracking-tight mb-2 leading-tight">
          {d.name}
        </p>
        <div className="space-y-1.5 border-t border-white/10 pt-2 text-left">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex justify-between gap-4">
            Tipo:{" "}
            <span style={{ color: tipoColors[d.tipo] }}>
              {tipoLabels[d.tipo]}
            </span>
          </p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex justify-between gap-4">
            Impacto: <span className="text-white">{d.y}</span>
          </p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex justify-between gap-4">
            Esforço: <span className="text-white">{d.x}</span>
          </p>
          <div className="mt-2 py-1.5 px-2 bg-white/5 rounded-lg flex justify-between items-center text-left">
            <span className="text-[9px] font-black text-white uppercase">
              Score Final
            </span>
            <span className="text-sm font-black text-[#10b981]">{d.score}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

interface CrossSwotScoreReportProps {
  strategies: CrossStrategy[];
}

export const CrossSwotScoreReport = ({
  strategies,
}: CrossSwotScoreReportProps) => {
  const ranked = useMemo(() => {
    return [...strategies]
      .map((s) => {
        const score = s.impacto * 2 + (6 - s.esforco) + (6 - s.risco);
        return { ...s, score };
      })
      .sort((a, b) => b.score - a.score);
  }, [strategies]);

  const scatterData: ScatterDataNode[] = useMemo(() => {
    return ranked.map((s) => ({
      x: s.esforco,
      y: s.impacto,
      z: s.risco * 80,
      name: s.titulo,
      tipo: s.tipo,
      score: s.score,
      risco: s.risco,
    }));
  }, [ranked]);

  if (strategies.length === 0) {
    return (
      <div className="bg-white border border-slate-100 rounded-[32px] p-12 text-center shadow-sm">
        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-300">
          <Trophy size={32} />
        </div>
        <p className="text-slate-400 font-bold uppercase text-[11px] tracking-widest text-center">
          Aguardando estratégias para gerar o Score
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10 text-left">
      <div className="flex items-center gap-4 text-left">
        <div className="p-3 rounded-2xl bg-slate-900 text-white shadow-lg">
          <TrendingUp size={24} strokeWidth={2.5} />
        </div>
        <div className="text-left">
          <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase leading-none">
            Score Estratégico
          </h3>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[2px] mt-1.5">
            Análise de Priorização de BI
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8 text-left">
          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-900 border border-slate-100">
            <Map size={18} />
          </div>
          <h4 className="text-[13px] font-black uppercase tracking-widest text-slate-800">
            Mapa de Dispersão
          </h4>
        </div>

        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis
                type="number"
                dataKey="x"
                name="Esforço"
                domain={[0.5, 5.5]}
                ticks={[1, 2, 3, 4, 5]}
                tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: "bold" }}
                axisLine={false}
              />
              <YAxis
                type="number"
                dataKey="y"
                name="Impacto"
                domain={[0.5, 5.5]}
                ticks={[1, 2, 3, 4, 5]}
                tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: "bold" }}
                axisLine={false}
              />
              <ZAxis type="number" dataKey="z" range={[100, 600]} />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ strokeDasharray: "3 3" }}
              />
              <Legend
                verticalAlign="top"
                height={50}
                content={() => (
                  <div className="flex justify-center gap-6 mb-8 flex-wrap">
                    {(Object.keys(tipoLabels) as CrossStrategyType[]).map(
                      (key) => (
                        <div
                          key={key}
                          className="flex items-center gap-2 text-left"
                        >
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: tipoColors[key] }}
                          />
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            {tipoLabels[key]}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                )}
              />
              <Scatter data={scatterData}>
                {scatterData.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={tipoColors[entry.tipo]}
                    fillOpacity={0.6}
                    stroke={tipoColors[entry.tipo]}
                    strokeWidth={2}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 text-left">
          {[
            {
              label: "Prioridade Máxima",
              desc: "Alto Impacto / Baixo Esforço",
              icon: Rocket,
              bg: "bg-emerald-50 text-emerald-600 border-emerald-100",
            },
            {
              label: "Grandes Projetos",
              desc: "Alto Impacto / Alto Esforço",
              icon: Zap,
              bg: "bg-blue-50 text-blue-600 border-blue-100",
            },
            {
              label: "Quick Wins",
              desc: "Baixo Impacto / Baixo Esforço",
              icon: Target,
              bg: "bg-amber-50 text-amber-600 border-amber-100",
            },
            {
              label: "Reconsiderar",
              desc: "Baixo Impacto / Alto Esforço",
              icon: AlertCircle,
              bg: "bg-rose-50 text-rose-600 border-rose-100",
            },
          ].map((item) => (
            <div
              key={item.label}
              className={cn(
                "p-4 rounded-2xl border transition-all hover:shadow-md text-left",
                item.bg,
              )}
            >
              <item.icon size={18} className="mb-2" />
              <p className="text-[10px] font-black uppercase tracking-tight text-left">
                {item.label}
              </p>
              <p className="text-[9px] font-bold opacity-70 uppercase mt-1 tracking-tighter text-left">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-sm">
        <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30 text-left">
          <div className="flex items-center gap-3">
            <ArrowUpDown className="text-slate-400" size={18} />
            <h4 className="text-[13px] font-black uppercase tracking-widest text-slate-800">
              Ranking Priorizado
            </h4>
          </div>
        </div>

        <Table>
          <TableHeader className="bg-slate-900 border-none">
            <TableRow className="border-none hover:bg-slate-900 text-left">
              <TableHead className="w-16 text-center text-[10px] font-black text-white uppercase tracking-widest">
                Pos
              </TableHead>
              <TableHead className="text-[10px] font-black text-white uppercase tracking-widest text-left">
                Ação Estratégica
              </TableHead>
              <TableHead className="text-center text-[10px] font-black text-white uppercase tracking-widest">
                Tipo
              </TableHead>
              <TableHead className="text-center text-[10px] font-black text-white uppercase tracking-widest">
                Score
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ranked.map((s, i) => (
              <TableRow
                key={s.id}
                className="border-slate-50 hover:bg-slate-50/50 transition-colors text-left"
              >
                <TableCell className="text-center">
                  <span
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center text-[12px] font-black mx-auto",
                      i === 0
                        ? "bg-amber-100 text-amber-600"
                        : i === 1
                          ? "bg-slate-100 text-slate-600"
                          : i === 2
                            ? "bg-orange-100 text-orange-600"
                            : "text-slate-300",
                    )}
                  >
                    {i < 9 ? `0${i + 1}` : i + 1}
                  </span>
                </TableCell>
                <TableCell className="text-left">
                  <div className="text-left">
                    <p className="text-[13px] font-black text-slate-800 leading-tight uppercase tracking-tighter">
                      {s.titulo}
                    </p>
                    {s.responsavel && (
                      <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-widest">
                        Responsável: {s.responsavel}
                      </p>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant="outline"
                    className="text-[9px] font-black uppercase tracking-widest border-2"
                    style={{
                      color: tipoColors[s.tipo],
                      borderColor: tipoColors[s.tipo] + "20",
                      backgroundColor: tipoColors[s.tipo] + "05",
                    }}
                  >
                    {tipoLabels[s.tipo]}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={cn(
                      "text-xl font-black",
                      s.score >= 12
                        ? "text-emerald-500"
                        : s.score >= 8
                          ? "text-amber-500"
                          : "text-rose-500",
                    )}
                  >
                    {s.score}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
