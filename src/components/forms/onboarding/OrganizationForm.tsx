"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, ArrowLeft } from "lucide-react";

// Importações profissionais via centralizador de schemas
import { organizationStepOneSchema, type OrganizationStepOneData } from "@/lib/validators/schema";

export const OrganizationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrganizationStepOneData>({
    resolver: zodResolver(organizationStepOneSchema),
  });

  const onSubmit = (data: OrganizationStepOneData) => {
    console.log("Dados do Registro - Empresa (Step 1):", data);
    // Próxima Task: Integrar com Zustand para mudar para o step 2
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Empresa</h2>
        <p className="text-gray-500">Informe os dados da sua organização para o planejamento estratégico</p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Lógica do Grid mantida conforme o Figma */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Razão Social <span className="text-red-500">*</span></label>
            <input 
              {...register("razaoSocial")} 
              placeholder="Razão social da empresa" 
              className={`w-full p-3 border rounded-lg bg-gray-50 focus:ring-1 focus:ring-[#10b981] outline-none transition-all ${errors.razaoSocial ? 'border-red-500' : 'border-gray-200'}`} 
            />
            {errors.razaoSocial && <span className="text-xs text-red-500">{errors.razaoSocial.message}</span>}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Nome Fantasia</label>
            <input 
              {...register("nomeFantasia")} 
              placeholder="Nome fantasia" 
              className="w-full p-3 border rounded-lg bg-gray-50 border-gray-200 focus:ring-1 focus:ring-[#10b981] outline-none" 
            />
          </div>
        </div>

        {/* ... restante dos campos seguindo a mesma lógica ... */}

        <div className="flex justify-between items-center pt-6">
          <button 
            type="button" 
            className="flex items-center gap-2 text-gray-500 font-medium hover:text-gray-700 transition-all border border-gray-200 px-6 py-2 rounded-lg"
          >
            <ArrowLeft size={18} /> Voltar
          </button>
          <button 
            type="submit" 
            className="flex items-center gap-2 bg-[#10b981] text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-all active:scale-95"
          >
            Próximo <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};