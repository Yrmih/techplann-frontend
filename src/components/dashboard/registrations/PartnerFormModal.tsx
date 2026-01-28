"use client";

import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, CheckCircle2, Building2, Phone, Mail, Fingerprint } from "lucide-react";

import { partnerSchema, PartnerFormValues } from "@/lib/validators/partner.schema";
import { CustomSelect } from "@/components/ui/custom/CustomSelect";
import { Switch } from "@/components/ui/switch"; 

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

export const PartnerFormModal = () => {
  const [open, setOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerSchema),
    defaultValues: { 
      nome: "", 
      documento: "", 
      email: "", 
      telefone: "",
      categoria: "",
      influencia: "",
      status: true
    }
  });

  const onSubmit: SubmitHandler<PartnerFormValues> = (data) => {
    console.log("Dados Estratégicos:", data);
    setOpen(false); 
    reset(); 
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#10b981] text-white rounded-lg text-sm font-bold hover:bg-[#0da673] shadow-sm shadow-emerald-100 transition-all active:scale-95">
          <Plus size={18} /> Novo Parceiro
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[650px] rounded-2xl border-none shadow-2xl p-0 overflow-hidden bg-white">
        <DialogHeader className="p-8 bg-gray-50/50 border-b border-gray-100 flex flex-row items-center justify-between">
          <div className="space-y-1">
            <DialogTitle className="text-2xl font-black text-gray-900 tracking-tight">
              Cadastrar Parceiro
            </DialogTitle>
            <p className="text-sm text-gray-500 font-medium">Defina os dados e o nível estratégico da nova organização.</p>
          </div>
          
         
          <div className="flex flex-col items-end gap-2 pr-4">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Situação</span>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold ${field.value ? 'text-[#10b981]' : 'text-gray-400'}`}>
                    {field.value ? 'ATIVO' : 'INATIVO'}
                  </span>
                  <Switch 
                    checked={field.value} 
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-[#10b981]"
                  />
                </div>
              )}
            />
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Razão Social */}
            <div className="col-span-2 space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                <Building2 size={12} /> Razão Social / Nome
              </label>
              <input
                {...register("nome")}
                placeholder="Ex: ACME LTDA"
                className={`w-full p-3 bg-gray-50 border ${errors.nome ? 'border-red-500 focus:border-red-500' : 'border-gray-100 focus:border-[#10b981]'} rounded-xl outline-none transition-all`}
              />
              {errors.nome && <span className="text-[10px] text-red-500 font-bold">{errors.nome.message}</span>}
            </div>

            
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                <Fingerprint size={12} /> CPF / CNPJ
              </label>
              <input
                {...register("documento")}
                placeholder="00.000.000/0001-00"
                className={`w-full p-3 bg-gray-50 border ${errors.documento ? 'border-red-500' : 'border-gray-100'} rounded-xl outline-none focus:border-[#10b981] transition-all`}
              />
            </div>

            
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                <Phone size={12} /> Telefone
              </label>
              <input
                {...register("telefone")}
                placeholder="(00) 00000-0000"
                className={`w-full p-3 bg-gray-50 border ${errors.telefone ? 'border-red-500' : 'border-gray-100'} rounded-xl outline-none focus:border-[#10b981] transition-all`}
              />
            </div>

            
            <Controller
              name="categoria"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  label="Categoria do Parceiro"
                  placeholder="Selecione o tipo..."
                  value={field.value}
                  onValueChange={field.onChange}
                  error={!!errors.categoria}
                  options={[
                    { value: "fornecedor", label: "Fornecedor" },
                    { value: "cliente", label: "Cliente Estratégico" },
                    { value: "socio", label: "Sócio" },
                    { value: "governo", label: "Governo / Órgão Público" },
                  ]}
                />
              )}
            />

           
            <Controller
              name="influencia"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  label="Nível de Influência"
                  placeholder="Selecione o impacto..."
                  value={field.value}
                  onValueChange={field.onChange}
                  error={!!errors.influencia}
                  options={[
                    { value: "baixa", label: "Baixa (Operacional)" },
                    { value: "media", label: "Média (Tática)" },
                    { value: "alta", label: "Alta (Crítica/Estratégica)" },
                  ]}
                />
              )}
            />

            
            <div className="col-span-2 space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                <Mail size={12} /> E-mail de Contato
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="contato@empresa.com"
                className={`w-full p-3 bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-100'} rounded-xl outline-none focus:border-[#10b981] transition-all`}
              />
            </div>
          </div>

          <DialogFooter className="pt-6 border-t border-gray-50 mt-4">
            <button
              type="submit"
              className="w-full py-4 bg-[#10b981] text-white rounded-xl font-bold hover:bg-[#0da673] shadow-lg shadow-emerald-100 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <CheckCircle2 size={18} /> Finalizar Cadastro Estratégico
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};