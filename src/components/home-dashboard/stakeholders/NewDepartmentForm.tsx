"use client";

import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomSelect } from "@/components/ui/custom/CustomSelect";

interface NewDepartmentFormProps {
  onBack: () => void;
}

export const NewDepartmentForm = ({ onBack }: NewDepartmentFormProps) => {
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
          <h1 className="text-xl font-bold text-slate-900">
            Novo Departamento
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Preencha as informações abaixo
          </p>
        </div>
      </header>

      {/* Container Principal */}
      <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm">
        <div className="max-w-md space-y-6">
          {/* Campo de Nome */}
          <div className="space-y-2">
            <Label className="text-sm font-bold text-slate-700 text-left block">
              Nome <span className="text-red-500">*</span>
            </Label>
            <Input
              placeholder="Nome do departamento"
              className="h-11 bg-white border-slate-200 focus-visible:ring-[#10b981]"
            />
          </div>

          {/* Campo Ativo utilizando CustomSelect */}
          <CustomSelect
            label="Ativo"
            placeholder="Selecione"
            options={[
              { value: "sim", label: "Sim" },
              { value: "nao", label: "Não" },
            ]}
            onValueChange={(v) => console.log(v)}
          />

          {/* Ações */}
          <div className="flex items-center gap-3 pt-4">
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
