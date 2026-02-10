import { LucideIcon } from "lucide-react";

interface CultureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconBg: string;
  headerBg: string;
}

export function CultureCard({ title, description, icon: Icon, iconBg, headerBg }: CultureCardProps) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
      <div className={`${headerBg} p-4 flex items-center gap-3`}>
        <div className={`p-2 ${iconBg} text-white rounded-xl shadow-sm`}>
          <Icon size={18} />
        </div>
        <span className="text-sm font-bold text-white">{title}</span>
      </div>
      <div className="p-8 flex-1">
        <p className="text-gray-500 text-sm leading-relaxed text-left">
          {description}
        </p>
      </div>
    </div>
  );
}