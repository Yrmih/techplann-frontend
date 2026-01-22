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
    /* Card ajustado para escala menor (p-8) com sombreamento sutil */
    <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm max-w-5xl mx-auto">
      <header className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Empresa</h2>
        <p className="text-sm text-gray-500">Informe os dados da sua empresa</p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Bloco: Identificação */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Razão Social <span className="text-red-500">*</span></label>
            <input 
              {...register("razaoSocial")} 
              placeholder="Razão social da empresa" 
              className={`w-full p-2.5 text-sm border rounded-lg bg-gray-50 focus:ring-1 focus:ring-[#10b981] outline-none transition-all ${errors.razaoSocial ? 'border-red-500' : 'border-gray-200 focus:border-[#10b981]'}`} 
            />
            {errors.razaoSocial && <span className="text-[10px] text-red-500 font-medium">{errors.razaoSocial.message}</span>}
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Nome Fantasia</label>
            <input 
              {...register("nomeFantasia")} 
              placeholder="Nome fantasia" 
              className="w-full p-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:ring-1 focus:ring-[#10b981] outline-none" 
            />
          </div>
        </div>

        {/* Bloco: Documentos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">CNPJ <span className="text-red-500">*</span></label>
            <input {...register("cnpj")} placeholder="00.000.000/0000-00" className="w-full p-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 outline-none focus:ring-[#10b981]" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Inscrição Estadual</label>
            <input {...register("inscricaoEstadual")} placeholder="Inscrição estadual" className="w-full p-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 outline-none focus:ring-[#10b981]" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Inscrição Municipal</label>
            <input {...register("inscricaoMunicipal")} placeholder="Inscrição municipal" className="w-full p-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 outline-none focus:ring-[#10b981]" />
          </div>
        </div>

        {/* Bloco: Contato */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-gray-50 pb-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Email <span className="text-red-500">*</span></label>
            <input {...register("email")} placeholder="empresa@email.com" className="w-full p-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 outline-none focus:ring-[#10b981]" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Telefone</label>
            <input {...register("telefone")} placeholder="(00) 0000-0000" className="w-full p-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 outline-none focus:ring-[#10b981]" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Celular</label>
            <input {...register("celular")} placeholder="(00) 00000-0000" className="w-full p-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 outline-none focus:ring-[#10b981]" />
          </div>
        </div>

        {/* Seção Endereço - Campos Faltantes Adicionados */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Endereço</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">CEP</label>
              <input {...register("cep")} placeholder="00000-000" className="w-full p-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 outline-none focus:ring-[#10b981]" />
            </div>
            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-semibold text-gray-700">Endereço</label>
              <input {...register("endereco")} placeholder="Rua, Avenida..." className="w-full p-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 outline-none focus:ring-[#10b981]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">Número</label>
              <input {...register("numero")} placeholder="123" className="w-full p-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 outline-none focus:ring-[#10b981]" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">Complemento</label>
              <input {...register("complemento")} placeholder="Sala, Andar..." className="w-full p-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 outline-none focus:ring-[#10b981]" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">Bairro</label>
              <input {...register("bairro")} placeholder="Bairro" className="w-full p-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 outline-none focus:ring-[#10b981]" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">Cidade</label>
              <input {...register("cidade")} placeholder="Cidade" className="w-full p-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 outline-none focus:ring-[#10b981]" />
            </div>
          </div>

          <div className="w-full md:w-1/4 space-y-1">
            <label className="text-xs font-semibold text-gray-700">Estado</label>
            <select {...register("estado")} className="w-full p-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 outline-none focus:ring-[#10b981]">
              <option value="">UF</option>
              <option value="SP">SP</option>
              {/* Adicionar outros estados */}
            </select>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex justify-between items-center pt-4 mt-6">
          <button 
            type="button" 
            className="flex items-center gap-1.5 text-xs text-gray-500 font-bold hover:text-gray-800 transition-all border border-gray-200 px-5 py-2 rounded-lg hover:bg-gray-50"
          >
            <ArrowLeft size={16} /> Voltar
          </button>
          <button 
            type="submit" 
            className="flex items-center gap-1.5 bg-[#10b981] text-white px-8 py-2.5 rounded-lg text-sm font-bold hover:opacity-90 transition-all active:scale-95"
          >
            Próximo <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};