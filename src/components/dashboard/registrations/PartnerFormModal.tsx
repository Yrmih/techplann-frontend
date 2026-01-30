"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";

import { partnerSchema, PartnerFormValues } from "@/lib/validators/partner.schema";
import { CustomSelect } from "@/components/ui/custom/CustomSelect";
import { LoadingButton } from "@/components/ui/custom/LoadingButton";

interface PartnerFormProps {
  onCancel: () => void;
}

export const PartnerForm = ({ onCancel }: PartnerFormProps) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerSchema),
    defaultValues: {
      status: "Ativo", 
    },
  });

  const onSubmit = async (data: PartnerFormValues) => {
    setIsSubmitting(true);
    console.log("Cadastrando Parceiro:", data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    onCancel();
  };

  return (
    <div className="w-full bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
      
      <header className="mb-8 flex items-center gap-4">
        <button 
          onClick={onCancel}
          className="p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-400"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="text-left">
          <h2 className="text-xl font-black text-gray-900 tracking-tight">Novo Parceiro</h2>
          <p className="text-sm text-gray-500 font-medium">Preencha as informações abaixo</p>
        </div>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl text-left">
       
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-700">
            Nome <span className="text-red-500">*</span>
          </label>
          <input
            {...register("nome")}
            placeholder="Nome do parceiro"
            className={`w-full p-3.5 bg-white border ${errors.nome ? 'border-red-500' : 'border-gray-200'} rounded-xl outline-none focus:border-[#10b981] transition-all text-sm`}
          />
          {errors.nome && <span className="text-[10px] text-red-500 font-bold">{errors.nome.message}</span>}
        </div>

        <Controller
          name="categoria"
          control={control}
          render={({ field }) => (
            <CustomSelect
              label="Tipo"
              placeholder="Selecione o tipo..."
              value={field.value}
              onValueChange={field.onChange}
              error={!!errors.categoria}
              options={[
                { value: "Fornecedor", label: "Fornecedor" },
                { value: "Distribuidor", label: "Distribuidor" },
                { value: "Representante", label: "Representante" },
                { value: "Revendedor", label: "Revendedor" },
                { value: "Outro", label: "Outro" },
              ]}
            />
          )}
        />

        {/* E-mail */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-700">Email</label>
          <input
            {...register("email")}
            type="email"
            placeholder="email@exemplo.com"
            className="w-full p-3.5 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#10b981] transition-all text-sm"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-700">Telefone</label>
          <input
            {...register("telefone")}
            placeholder="(00) 00000-0000"
            className="w-full p-3.5 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#10b981] transition-all text-sm"
          />
        </div>

        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <CustomSelect
              label="Status"
              value={field.value}
              onValueChange={field.onChange}
              options={[
                { value: "Ativo", label: "Ativo" },
                { value: "Inativo", label: "Inativo" },
              ]}
            />
          )}
        />

        <div className="flex items-center gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all"
          >
            Cancelar
          </button>
          <LoadingButton
            type="submit"
            isLoading={isSubmitting}
            className="px-8 py-3 bg-[#10b981] text-white rounded-xl text-sm font-bold hover:bg-[#0da673] transition-all shadow-sm"
          >
            Cadastrar
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};