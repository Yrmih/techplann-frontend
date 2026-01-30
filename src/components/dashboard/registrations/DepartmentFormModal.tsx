"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";

import { departmentSchema, DepartmentFormValues } from "@/lib/validators/department.schema";
import { CustomSelect } from "@/components/ui/custom/CustomSelect";
import { LoadingButton } from "@/components/ui/custom/LoadingButton";

export const DepartmentFormModal = ({ onCancel }: { onCancel: () => void }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { register, handleSubmit, control } = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentSchema),
    defaultValues: { status: "Ativo" },
  });

  return (
    <div className="w-full bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
      <header className="mb-8 flex items-center gap-4 text-left">
        <button onClick={onCancel} className="p-2 hover:bg-gray-50 rounded-full text-gray-400"><ArrowLeft size={20} /></button>
        <div>
          <h2 className="text-xl font-black text-gray-900 tracking-tight">Novo Departamento</h2>
          <p className="text-sm text-gray-500 font-medium">Preencha as informações abaixo</p>
        </div>
      </header>

      <form onSubmit={handleSubmit((d) => console.log(d))} className="space-y-6 max-w-xl text-left">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-700">Nome <span className="text-red-500">*</span></label>
          <input {...register("nome")} placeholder="Nome do departamento" className="w-full p-3.5 border border-gray-200 rounded-xl text-sm" />
        </div>

        {/* CustomSelect para Tipo de Departamento */}
        <Controller
          name="tipo"
          control={control}
          render={({ field }) => (
            <CustomSelect
              label="Tipo"
              value={field.value}
              onValueChange={field.onChange}
              options={[
                { value: "Administrativo", label: "Administrativo" },
                { value: "Comercial", label: "Comercial" },
                { value: "Financeiro", label: "Financeiro" },
                { value: "RH", label: "RH" },
                { value: "TI", label: "TI" },
                { value: "Operações", label: "Operações" },
                { value: "Marketing", label: "Marketing" },
                { value: "Outro", label: "Outro" },
              ]}
            />
          )}
        />

        {/* CustomSelect para Status */}
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
          <button type="button" onClick={onCancel} className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-bold">Cancelar</button>
          <LoadingButton type="submit" isLoading={isSubmitting} className="px-8 py-3 bg-[#10b981] text-white rounded-xl text-sm font-bold">Cadastrar</LoadingButton>
        </div>
      </form>
    </div>
  );
};