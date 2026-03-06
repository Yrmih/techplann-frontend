"use client";

import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomSelect } from "@/components/ui/custom/CustomSelect";

interface NewStakeholderFormProps {
  onBack: () => void;
}

export const NewStakeholderForm = ({ onBack }: NewStakeholderFormProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Cabeçalho do Formulário */}
      <header className="flex items-start gap-4 mb-8">
        <button
          onClick={onBack}
          className="mt-1 p-1 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Novo Stakeholder</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Preencha as informações abaixo
          </p>
        </div>
      </header>

      {/* Container Principal do Formulário */}
      <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm">
        <div className="max-w-md space-y-6">
          {/* Informações Básicas */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-bold text-slate-700">
                Nome <span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder="Nome do stakeholder"
                className="h-11 bg-white border-slate-200 focus-visible:ring-[#10b981]"
              />
            </div>

            <CustomSelect
              label="Tipo"
              placeholder="Selecione o tipo"
              options={[
                { value: "fornecedor", label: "Fornecedor" },
                { value: "distribuidor", label: "Distribuidor" },
                { value: "representante", label: "Representante" },
                { value: "revendedor", label: "Revendedor" },
                { value: "outro", label: "Outro" },
              ]}
              onValueChange={(v) => console.log(v)}
            />

            <CustomSelect
              label="Status"
              placeholder="Selecione o status"
              options={[
                { value: "ativo", label: "Ativo" },
                { value: "inativo", label: "Inativo" },
              ]}
              onValueChange={(v) => console.log(v)}
            />
          </div>

          {/* Divisor de Seção: Acesso à Plataforma */}
          <div className="pt-4 space-y-4">
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
              Acesso à plataforma
            </h2>

            <div className="space-y-2">
              <Label className="text-sm font-bold text-slate-700 text-left block">
                E-mail
              </Label>
              <Input
                type="email"
                placeholder="exemplo@email.com"
                className="h-11 bg-slate-50/50 border-slate-200 focus-visible:ring-[#10b981]"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-bold text-slate-700 text-left block">
                Senha
              </Label>
              <Input
                type="password"
                placeholder="••••••"
                className="h-11 bg-slate-50/50 border-slate-200 focus-visible:ring-[#10b981]"
              />
            </div>

            <CustomSelect
              label="Cargo / Permissão"
              placeholder="Selecione a permissão"
              options={[
                { value: "admin", label: "Admin (acesso total)" },
                {
                  value: "colaborador",
                  label: "Colaborador (apenas planejamentos vinculados)",
                },
              ]}
              onValueChange={(v) => console.log(v)}
            />
          </div>

          {/* Ações */}
          <div className="flex items-center gap-3 pt-6">
            <button
              onClick={onBack}
              className="px-6 h-11 rounded-xl font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-all text-sm"
            >
              Cancelar
            </button>
            <button className="px-8 h-11 rounded-xl font-bold text-white bg-[#10b981] hover:bg-[#0da673] transition-all shadow-md shadow-emerald-100 text-sm">
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
