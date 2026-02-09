import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  label: string;
  trend: string;
  icon: LucideIcon;
  iconBg: string;
}

export function MetricCard({ title, value, label, trend, icon: Icon, iconBg }: MetricCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <div className={`p-3 rounded-xl ${iconBg} text-white`}>
            <Icon size={24} />
          </div>
          <div>
            <span className="text-4xl font-bold text-gray-900">{value}</span>
            <p className="text-sm text-gray-500">{label}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg text-xs font-bold">
          <span>↗</span> {trend}
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-4 uppercase tracking-wider font-semibold">{title}</p>
    </div>
  );
}