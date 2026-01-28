"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, CheckCircle2 } from "lucide-react";

import { partnerSchema, PartnerFormValues } from "@/lib/validators/partner.schema";

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
    reset,
    formState: { errors },
  } = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerSchema),
    defaultValues: { 
      nome: "", 
      documento: "", 
      email: "", 
      status: "Ativo" 
    }
  });

  const onSubmit: SubmitHandler<PartnerFormValues> = (data) => {
    console.log("Novo Parceiro Cadastrado:", data);
    // Aqui vou vou fazer a chamada para a API (ex: axios.post('/api/partners', data))
    
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

      <DialogContent className="sm:max-w-[500px] rounded-2xl border-none shadow-2xl p-0 overflow-hidden bg-white">
       
        <DialogHeader className="p-8 bg-gray-50/50 border-b border-gray-100">
          <DialogTitle className="text-2xl font-black text-gray-900 tracking-tight">
            Cadastrar Parceiro
          </DialogTitle>
          <p className="text-sm text-gray-500 font-medium">Preencha os dados básicos da nova organização.</p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5">
          
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Razão Social / Nome</label>
            <input
              {...register("nome")}
              placeholder="Ex: ACME LTDA"
              className={`w-full p-3 bg-gray-50 border ${errors.nome ? 'border-red-500 focus:border-red-500' : 'border-gray-100 focus:border-[#10b981]'} rounded-xl outline-none transition-all`}
            />
            {errors.nome && <span className="text-[10px] text-red-500 font-bold">{errors.nome.message}</span>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">CPF / CNPJ</label>
              <input
                {...register("documento")}
                placeholder="00.000.000/0001-00"
                className={`w-full p-3 bg-gray-50 border ${errors.documento ? 'border-red-500' : 'border-gray-100'} rounded-xl outline-none focus:border-[#10b981] transition-all`}
              />
              {errors.documento && <span className="text-[10px] text-red-500 font-bold">{errors.documento.message}</span>}
            </div>

            
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Situação</label>
              <select
                {...register("status")}
                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-[#10b981] text-sm font-medium cursor-pointer"
              >
                <option value="Ativo">🟢 Ativo</option>
                <option value="Inativo">⚪ Inativo</option>
              </select>
            </div>
          </div>

         
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">E-mail de Contato</label>
            <input
              {...register("email")}
              type="email"
              placeholder="contato@empresa.com"
              className={`w-full p-3 bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-100'} rounded-xl outline-none focus:border-[#10b981] transition-all`}
            />
            {errors.email && <span className="text-[10px] text-red-500 font-bold">{errors.email.message}</span>}
          </div>

          <DialogFooter className="pt-4">
            <button
              type="submit"
              className="w-full py-4 bg-[#10b981] text-white rounded-xl font-bold hover:bg-[#0da673] shadow-lg shadow-emerald-100 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <CheckCircle2 size={18} /> Finalizar Cadastro
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};