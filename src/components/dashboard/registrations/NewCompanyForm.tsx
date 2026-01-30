"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller, SubmitHandler, FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { X } from "lucide-react";

import { companySchema, CompanyFormValues } from "@/lib/validators/company.schema";
import { LoadingButton } from "@/components/ui/custom/LoadingButton";
import { CustomSelect } from "@/components/ui/custom/CustomSelect";

interface FieldProps {
  label: string;
  children: React.ReactNode;
  error?: FieldError;
}

export default function NewCompanyForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { control, handleSubmit, register, formState: { errors } } = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      razaoSocial: "", fantasia: "", cnpj: "", endereco: "", numero: "",
      cep: "", bairro: "", complemento: "", municipio: "", uf: "",
      responsavel: "", email: "", telefone: "", situacao: "Ativo", pagamento: ""
    }
  });

  const onSubmit: SubmitHandler<CompanyFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      console.log("Dados salvos:", data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.back();
    } finally {
      setIsSubmitting(false);
    }
  };

  // Estilo padrão para todos os inputs garantindo fundo branco
  const inputStyles = "w-full h-12 px-4 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-[#10b981] transition-all";

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[1300px] bg-white rounded-[15px] shadow-sm border border-gray-200 overflow-hidden"
      >
        {/* Header Verde - Identidade TechPlann */}
        <header className="bg-[#10b981] h-14 flex justify-between items-center px-6">
          <h1 className="text-white font-bold text-xs uppercase tracking-[0.5px]">
            Novo Registro de Empresa
          </h1>
          <button type="button" onClick={() => router.back()} className="text-white/90 hover:text-white transition-all">
            <X size={20} />
          </button>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="p-10 space-y-8">
          
          {/* Dados Jurídicos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <Field label="Razão Social" error={errors.razaoSocial}>
              <input {...register("razaoSocial")} placeholder="Razão Social" className={inputStyles} />
            </Field>
            <Field label="Fantasia">
              <input {...register("fantasia")} placeholder="Nome Fantasia" className={inputStyles} />
            </Field>
            <Field label="CNPJ" error={errors.cnpj}>
              <input {...register("cnpj")} placeholder="00.000.000/0000-00" className={inputStyles} />
            </Field>
          </div>

          {/* Endereço - Alinhamento Horizontal Fiel */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-left">
            <div className="md:col-span-6">
              <Field label="Endereço" error={errors.endereco}>
                <input {...register("endereco")} className={inputStyles} />
              </Field>
            </div>
            <div className="md:col-span-2">
              <Field label="Número" error={errors.numero}>
                <input {...register("numero")} className={inputStyles} />
              </Field>
            </div>
            <div className="md:col-span-4">
              <Field label="CEP" error={errors.cep}>
                <div className="relative">
                  <input {...register("cep")} placeholder="00.000-000" className={inputStyles} />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400 border-l border-gray-100 pl-4 uppercase">CEP</span>
                </div>
              </Field>
            </div>
          </div>

          {/* Localização */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <Field label="Bairro" error={errors.bairro}>
              <input {...register("bairro")} className={inputStyles} />
            </Field>
            <Field label="Complemento">
              <input {...register("complemento")} className={inputStyles} />
            </Field>
            <Field label="Município" error={errors.municipio}>
              <input {...register("municipio")} className={inputStyles} />
            </Field>
          </div>

          {/* Responsável e Contato */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
            <Controller
              name="uf"
              control={control}
              render={({ field }) => (
                <CustomSelect label="Estado(UF)" placeholder="Selecione" value={field.value} onValueChange={field.onChange} 
                  options={[{ value: "PA", label: "PA" }, { value: "SP", label: "SP" }]} 
                />
              )}
            />
            <Field label="Responsável" error={errors.responsavel}>
              <input {...register("responsavel")} placeholder="Nome do responsável" className={inputStyles} />
            </Field>
            <Field label="Email" error={errors.email}>
              <input {...register("email")} placeholder="email@dominio.com.br" className={inputStyles} />
            </Field>
            <Field label="Telefone" error={errors.telefone}>
              <input {...register("telefone")} placeholder="(00) 00000-0000" className={inputStyles} />
            </Field>
          </div>

          {/* Situação e Pagamento */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <Controller
              name="situacao"
              control={control}
              render={({ field }) => (
                <CustomSelect label="Situação" value={field.value} onValueChange={field.onChange} 
                  options={[{ value: "Ativo", label: "Ativo" }, { value: "Inativo", label: "Inativo" }]} 
                />
              )}
            />
            <Controller
              name="pagamento"
              control={control}
              render={({ field }) => (
                <CustomSelect label="Pagamento" placeholder="Selecione" value={field.value} onValueChange={field.onChange} 
                  options={[
                    { value: "Boleto", label: "Boleto" },
                    { value: "Cartão de Crédito", label: "Cartão de Crédito" },
                    { value: "PIX", label: "PIX" },
                    { value: "Transferência", label: "Transferência" }
                  ]} 
                />
              )}
            />
          </div>

          {/* Ações Centralizadas */}
          <div className="flex items-center justify-center gap-4 pt-6 border-t border-gray-50">
            <LoadingButton 
              type="submit" 
              isLoading={isSubmitting} 
              className="px-14 py-3 bg-[#10b981] text-white rounded-xl text-sm font-bold shadow-md shadow-emerald-50 hover:bg-[#0da673] transition-all"
            >
              Incluir
            </LoadingButton>
            <button 
              type="button" 
              onClick={() => router.back()} 
              className="px-14 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all"
            >
              Voltar
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

const Field = ({ label, children, error }: FieldProps) => (
  <div className="space-y-1.5">
    <label className="text-[11px] font-bold text-gray-600 ml-1">{label}</label>
    {children}
    {error && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1">{error.message}</p>}
  </div>
);