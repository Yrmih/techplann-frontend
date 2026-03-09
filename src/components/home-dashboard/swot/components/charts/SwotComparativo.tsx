"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/utils";

interface SwotComparativoProps {
  interno: number;
  externo: number;
}

export const SwotComparativo = ({
  interno = 0,
  externo = 0,
}: SwotComparativoProps) => {
  const bars = [
    {
      label: "INTERNO",
      val: interno,
      color: "bg-[#10b981]",
      text: "text-[#10b981]",
    },
    {
      label: "EXTERNO",
      val: externo,
      color: "bg-[#3b82f6]",
      text: "text-[#3b82f6]",
    },
  ];

  return (
    <div className="bg-white p-8 rounded-md border border-gray-100 shadow-sm text-left h-full flex flex-col">
      <h3 className="font-black text-gray-900 mb-8 uppercase text-[10px] tracking-[3px]">
        COMPARATIVO
      </h3>

      <div className="space-y-10 flex-1 flex flex-col justify-center">
        {bars.map((bar, i) => (
          <div key={i} className="space-y-3">
            <div className="flex justify-between items-end">
              <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
                {bar.label}
              </span>
              <span className={cn("text-lg font-black leading-none", bar.text)}>
                {bar.val}%
              </span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-50">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${bar.val}%` }}
                transition={{ duration: 1 }}
                className={cn("h-full rounded-full", bar.color)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
