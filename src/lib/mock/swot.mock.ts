import { TrendingUp, ShieldAlert, Lightbulb, AlertCircle } from "lucide-react";

export const SWOT_MOCK_DATA = {
  tradicional: [
    {
      title: "FORÇAS",
      color: "bg-[#10b981]",
      icon: TrendingUp,
      total: 175,
      items: [
        { label: "Atendimento Especializado", value: 80 },
        { label: "Tecnologia Própria", value: 95 },
      ],
    },
    {
      title: "FRAQUEZAS",
      color: "bg-[#ef4444]",
      icon: ShieldAlert,
      total: 40,
      items: [{ label: "Simulação de Baixa Presença Digital", value: 40 }],
    },
    {
      title: "OPORTUNIDADES",
      color: "bg-[#0ea5e9]",
      icon: Lightbulb,
      total: 70,
      items: [{ label: "Simulação de Novos Mercados Simulados", value: 70 }],
    },
    {
      title: "AMEAÇAS",
      color: "bg-[#f59e0b]",
      icon: AlertCircle,
      total: 85,
      items: [{ label: " Simulação de Concorrência Preço Baixo", value: 85 }],
    },
  ],
  cruzada: {
    ofensiva:
      "Estratégias Ofensivas (F + O): Explorar mercados com tecnologia própria.",
    confronto:
      "Estratégias de Confronto (F + A): Blindar preços com atendimento VIP.",
    reforco:
      "Estratégias de Reforço (F + O): Melhorar SEO para novos mercados.",
    defensiva:
      "Estratégias Defensivas (F + A): Criar fidelidade para evitar guerra de preços.",
  },
};
