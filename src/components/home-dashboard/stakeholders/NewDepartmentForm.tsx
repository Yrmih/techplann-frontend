"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomSelect } from "@/components/ui/custom/CustomSelect";
import { LoadingButton } from "@/components/ui/custom/LoadingButton";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface NewDepartmentFormProps {
  onBack: () => void;
}

export const NewDepartmentForm = ({ onBack }: NewDepartmentFormProps) => {
  // Estados para a lógica de negócio
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nome, setNome] = useState("");
  const [status, setStatus] = useState("sim");

  // Função de salvamento com validação e feedback
  const handleSave = async () => {
    if (!nome.trim()) {
      toast.error("Nome é obrigatório", {
        description:
          "Por favor, informe o nome do departamento para prosseguir.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulação da regra de negócio
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Departamento cadastrado!", {
        description: `O departamento "${nome}" foi criado com sucesso.`,
      });

      onBack();
    } catch (error) {
      toast.error("Erro ao salvar", {
        description:
          "Ocorreu um problema técnico ao tentar cadastrar o departamento.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-5xl mx-auto text-left"
    >
      {/* Cabeçalho do Formulário */}
      <header className="flex items-start gap-4 mb-8">
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="mt-1 p-1 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 disabled:opacity-50"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Novo Departamento
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Preencha as informações abaixo
          </p>
        </div>
      </header>

      {/* Container Principal Branco Arredondado */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <div className="max-w-md space-y-6">
          {/* Campo de Nome */}
          <div className="space-y-2">
            <Label className="text-sm font-bold text-slate-800 text-left block">
              Nome <span className="text-red-500">*</span>
            </Label>
            <Input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome do departamento"
              disabled={isSubmitting}
              className="h-11 bg-white border-slate-200 rounded-xl text-sm font-medium focus:bg-blue-50/30 focus:border-blue-200 transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Campo Ativo utilizando o seu CustomSelect */}
          <div className="space-y-2">
            <CustomSelect
              label="Ativo"
              placeholder="Selecione"
              options={[
                { value: "sim", label: "Sim" },
                { value: "nao", label: "Não" },
              ]}
              value={status}
              onValueChange={(v) => setStatus(v)}
            />
          </div>

          {/* Ações do Formulário alinhadas à esquerda */}
          <div className="flex items-center gap-3 pt-4">
            <button
              onClick={onBack}
              disabled={isSubmitting}
              type="button"
              className="px-6 h-11 rounded-xl font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all text-sm disabled:opacity-50"
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
