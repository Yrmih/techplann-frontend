"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { ArrowLeft, Building2 } from "lucide-react";
import { motion } from "framer-motion";

import { LoadingButton } from "@/components/ui/custom/LoadingButton";
import { CustomSelect } from "@/components/ui/custom/CustomSelect";


interface CompanyFormValues {
  razaoSocial: string;
  cnpj: string;
  regimeTributario: string;
  endereco: string;
  cidade: string;
  uf: string;
  email: string;
  status: string;
}

export default function NewCompanyPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

 
  const { control, handleSubmit, register } = useForm<CompanyFormValues>({
    defaultValues: {
      razaoSocial: "",
      cnpj: "",
      regimeTributario: "",
      endereco: "",
      cidade: "",
      uf: "PA",
      email: "",
      status: "Ativo",
    }
  });

  
  const onSubmit: SubmitHandler<CompanyFormValues> = async (data) => {
    setIsSubmitting(true);
    console.log("Dados Tipados da Empresa:", data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    router.back();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50/50"
    >
      <header className="bg-[#10b981] text-white p-8">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4 text-left">
            <button 
              type="button"
              onClick={() => router.back()}
              className="p-2 hover:bg-white/10 rounded-full transition-all"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-black tracking-tight uppercase leading-none">Novo Registro de Empresa</h1>
              <p className="text-emerald-50 text-xs font-bold opacity-80 mt-1 uppercase">Cadastro Estrutural da Organização</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button 
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-all"
            >
              Cancelar
            </button>
            <LoadingButton
              onClick={handleSubmit(onSubmit)}
              isLoading={isSubmitting}
              className="px-6 py-2.5 bg-white text-[#10b981] hover:bg-gray-100 rounded-xl text-xs font-black shadow-lg transition-all"
            >
              SALVAR REGISTRO
            </LoadingButton>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto p-8">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10">
          <form className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
            
            {/* Coluna 1 */}
            <div className="space-y-6">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-4">Informações Jurídicas</h3>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Razão Social</label>
                <input 
                  {...register("razaoSocial")}
                  className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#10b981]" 
                  placeholder="Ex: TechPlann Soluções" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">CNPJ</label>
                <input 
                  {...register("cnpj")}
                  className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#10b981]" 
                  placeholder="00.000.000/0001-00" 
                />
              </div>

              <Controller
                name="regimeTributario"
                control={control}
                render={({ field }) => (
                  <CustomSelect 
                    label="Regime Tributário"
                    value={field.value}
                    onValueChange={field.onChange}
                    options={[
                      { value: "simples", label: "Simples Nacional" },
                      { value: "lucro_presumido", label: "Lucro Presumido" },
                      { value: "lucro_real", label: "Lucro Real" }
                    ]}
                  />
                )}
              />
            </div>

           
            <div className="space-y-6">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-4">Localização & Contato</h3>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Endereço Completo</label>
                <input {...register("endereco")} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm" placeholder="Rua, Número, Bairro" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Cidade</label>
                  <input {...register("cidade")} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm" placeholder="Cidade" />
                </div>
                
                <Controller
                  name="uf"
                  control={control}
                  render={({ field }) => (
                    <CustomSelect 
                      label="UF"
                      value={field.value}
                      onValueChange={field.onChange}
                      options={[{ value: "PA", label: "PA" }, { value: "SP", label: "SP" }]}
                    />
                  )}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">E-mail Corporativo</label>
                <input {...register("email")} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm" placeholder="empresa@exemplo.com" />
              </div>
            </div>

            
            <div className="space-y-6">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-4">Parâmetros de Operação</h3>
              
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <CustomSelect 
                    label="Status da Empresa"
                    value={field.value}
                    onValueChange={field.onChange}
                    options={[
                      { value: "Ativo", label: "Ativo" },
                      { value: "Bloqueado", label: "Bloqueado" },
                      { value: "Em Analise", label: "Em Análise" }
                    ]}
                  />
                )}
              />

              <div className="p-6 bg-emerald-50/50 border border-emerald-100 rounded-2xl">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-500 rounded-lg text-white">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-emerald-900">Configuração Mestre</h4>
                    <p className="text-[11px] text-emerald-700 font-medium leading-relaxed mt-1">
                      Esta empresa será listada como unidade de negócio principal na dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </motion.div>
  );
}