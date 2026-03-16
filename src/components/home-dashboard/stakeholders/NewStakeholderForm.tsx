"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomSelect } from "@/components/ui/custom/CustomSelect";
import { LoadingButton } from "@/components/ui/custom/LoadingButton";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface NewStakeholderFormProps {
  onBack: () => void;
}

export const NewStakeholderForm = ({ onBack }: NewStakeholderFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nome, setNome] = useState("");

  const handleSave = async () => {
    if (!nome.trim()) {
      toast.error("Nome é obrigatório", {
        className: "bg-red-950 text-white border-none",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Stakeholder cadastrado com sucesso!");
      onBack();
    } catch (error) {
      toast.error("Erro ao salvar");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-5xl mx-auto text-left"
    >
      {/* Cabeçalho */}
      <header className="flex items-start gap-4 mb-8">
        <button
          onClick={onBack}
          className="mt-1 p-1 hover:bg-slate-100 rounded-lg transition-colors text-slate-400"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Novo Stakeholder</h1>
          <p className="text-sm text-slate-500">
            Preencha as informações abaixo
          </p>
        </div>
      </header>

      {/* Container Principal Branco */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <div className="max-w-md space-y-6">
          {/* Campo Nome */}
          <div className="space-y-2">
            <Label className="text-sm font-bold text-slate-800">
              Nome <span className="text-red-500">*</span>
            </Label>
            <Input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome do stakeholder"
              className="h-11 bg-white border-slate-200 focus:bg-blue-50/30 focus:border-blue-200 transition-all"
            />
          </div>

          {/* Campo Tipo */}
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

          {/* Campo Status */}
          <CustomSelect
            label="Status"
            placeholder="Selecione o status"
            options={[
              { value: "ativo", label: "Ativo" },
              { value: "inativo", label: "Inativo" },
            ]}
            onValueChange={(v) => console.log(v)}
          />

          {/* Divisor de Seção */}
          <div className="pt-4 space-y-6">
            <h2 className="text-sm font-bold text-slate-900">
              Acesso à plataforma
            </h2>

            <div className="space-y-2">
              <Label className="text-sm font-bold text-slate-800">E-mail</Label>
              <Input
                type="email"
                placeholder="ian@sete.com"
                className="h-11 bg-blue-50/40 border-slate-200 focus:bg-blue-50 transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-bold text-slate-800">Senha</Label>
              <Input
                type="password"
                placeholder="••••••"
                className="h-11 bg-blue-50/40 border-slate-200 focus:bg-blue-50 transition-all"
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

          {/* Ações conforme image_abc3d4 */}
          <div className="flex items-center gap-3 pt-6">
            <button
              onClick={onBack}
              className="px-6 h-11 rounded-xl font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all text-sm"
            >
              Cancelar
            </button>

            <LoadingButton
              isLoading={isSubmitting}
              onClick={handleSave}
              className="px-8 h-11 rounded-xl font-bold text-white bg-[#10b981] hover:bg-[#0da673] transition-all text-sm min-w-[120px]"
            >
              Cadastrar
            </LoadingButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
