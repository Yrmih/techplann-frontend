"use client";

import React from "react";
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
  };

  return (
    /* Card com sombra suave (shadow-md) e bordas arredondadas conforme o Figma */
    <div className="bg-white rounded-2xl border border-gray-100 p-10 shadow-md">
      <header className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900">Empresa</h2>
        <p className="text-gray-500">Informe os dados da sua empresa</p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Bloco: Identificação */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Razão Social <span className="text-red-500">*</span></label>
            <input 
              {...register("razaoSocial")} 
              placeholder="Razão social da empresa" 
              className={`w-full p-3.5 border rounded-xl bg-gray-50 focus:ring-1 focus:ring-[#10b981] outline-none transition-all ${errors.razaoSocial ? 'border-red-500' : 'border-gray-200 focus:border-[#10b981]'}`} 
            />
            {errors.razaoSocial && <span className="text-xs text-red-500 font-medium">{errors.razaoSocial.message}</span>}
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Nome Fantasia</label>
            <input 
              {...register("nomeFantasia")} 
              placeholder="Nome fantasia" 
              className="w-full p-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:ring-1 focus:ring-[#10b981] focus:border-[#10b981] outline-none transition-all" 
            />
          </div>
        </div>

        {/* Bloco: Documentos (Grid de 3 colunas) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">CNPJ <span className="text-red-500">*</span></label>
            <input {...register("cnpj")} placeholder="00.000.000/0000-00" className="w-full p-3.5 border border-gray-200 rounded-xl bg-gray-50 outline-none focus:ring-1 focus:ring-[#10b981] focus:border-[#10b981]" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Inscrição Estadual</label>
            <input {...register("inscricaoEstadual")} placeholder="Inscrição estadual" className="w-full p-3.5 border border-gray-200 rounded-xl bg-gray-50 outline-none focus:ring-1 focus:ring-[#10b981]" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Inscrição Municipal</label>
            <input {...register("inscricaoMunicipal")} placeholder="Inscrição municipal" className="w-full p-3.5 border border-gray-200 rounded-xl bg-gray-50 outline-none focus:ring-1 focus:ring-[#10b981]" />
          </div>
        </div>

        {/* Bloco: Contato (Email, Telefone, Celular) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Email <span className="text-red-500">*</span></label>
            <input {...register("email")} placeholder="empresa@email.com" className="w-full p-3.5 border border-gray-200 rounded-xl bg-gray-50 outline-none focus:ring-1 focus:ring-[#10b981]" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Telefone</label>
            <input {...register("telefone")} placeholder="(00) 0000-0000" className="w-full p-3.5 border border-gray-200 rounded-xl bg-gray-50 outline-none focus:ring-1 focus:ring-[#10b981]" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Celular</label>
            <input {...register("celular")} placeholder="(00) 00000-0000" className="w-full p-3.5 border border-gray-200 rounded-xl bg-gray-50 outline-none focus:ring-1 focus:ring-[#10b981]" />
          </div>
        </div>

        <div className="pt-4">
          <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 mb-6">Endereço</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1 space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">CEP</label>
              <input {...register("cep")} placeholder="00000-000" className="w-full p-3.5 border border-gray-200 rounded-xl bg-gray-50 outline-none focus:ring-1 focus:ring-[#10b981]" />
            </div>
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Endereço</label>
              <input {...register("endereco")} placeholder="Rua, Avenida..." className="w-full p-3.5 border border-gray-200 rounded-xl bg-gray-50 outline-none focus:ring-1 focus:ring-[#10b981]" />
            </div>
            <div className="md:col-span-1 space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Número</label>
              <input {...register("numero")} placeholder="123" className="w-full p-3.5 border border-gray-200 rounded-xl bg-gray-50 outline-none focus:ring-1 focus:ring-[#10b981]" />
            </div>
          </div>
        </div>

        {/* Botões de Ação com estilização premium */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-50">
          <button 
            type="button" 
            className="flex items-center gap-2 text-gray-500 font-semibold hover:text-gray-800 transition-all border border-gray-200 px-8 py-3 rounded-xl hover:bg-gray-50"
          >
            <ArrowLeft size={20} /> Voltar
          </button>
          <button 
            type="submit" 
            className="flex items-center gap-2 bg-[#10b981] text-white px-10 py-3.5 rounded-xl font-bold hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-green-100"
          >
            Próximo <ArrowRight size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};