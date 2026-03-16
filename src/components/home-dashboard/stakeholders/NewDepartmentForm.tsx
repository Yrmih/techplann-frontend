"use client";

import { useState } from "react";
import { ArrowLeft, Users2 } from "lucide-react";
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
  // 1. Estados para a lógica de negócio
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nome, setNome] = useState("");
  const [status, setStatus] = useState("sim");

  // 2. Função de salvamento com validação e feedback
  const handleSave = async () => {
    // Validação de campo obrigatório conforme solicitado
    if (!nome.trim()) {
      toast.error("Nome é obrigatório", {
        description:
          "Por favor, informe o nome do departamento para prosseguir.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulação da regra de negócio (envio para API/Supabase)
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
      className="w-full max-w-4xl mx-auto text-left"
    >
      {/* Cabeçalho do Formulário */}
      <header className="flex items-center gap-4 mb-10 px-2">
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="p-2.5 hover:bg-gray-100 rounded-full transition-all text-gray-400 hover:text-gray-900 border border-transparent hover:border-gray-200 disabled:opacity-50"
        >
          <ArrowLeft size={22} />
        </button>
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">
            Novo Departamento
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            Preencha as informações abaixo para criar a unidade
          </p>
        </div>
      </header>

      {/* Container Principal do Formulário */}
      <div className="bg-white border border-gray-100 rounded-[32px] p-10 shadow-xl shadow-gray-200/50 space-y-10">
        <div className="max-w-md space-y-8">
          {/* Seção de Identificação */}
          <div className="space-y-8">
            <div className="flex items-center gap-2 text-[#10b981]">
              <Users2 size={18} strokeWidth={2.5} />
              <h2 className="text-xs font-black uppercase tracking-[0.2em]">
                Configuração da Unidade
              </h2>
            </div>

            <div className="space-y-6">
              {/* Campo de Nome (Obrigatório) */}
              <div className="space-y-2.5">
                <Label className="text-[11px] font-black text-gray-700 uppercase tracking-widest ml-1 text-left block">
                  Nome do departamento <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: Administrativo, Comercial, RH..."
                  disabled={isSubmitting}
                  className="h-14 bg-[#f1f4f9] border-none rounded-2xl text-sm font-medium focus-visible:ring-2 focus-visible:ring-[#10b981] transition-all placeholder:text-gray-400"
                />
              </div>

              {/* Campo Ativo utilizando o seu CustomSelect */}
              <div className="space-y-2.5">
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
            </div>
          </div>

          {/* Ações do Formulário */}
          <div className="flex items-center gap-4 pt-6">
            <button
              onClick={onBack}
              disabled={isSubmitting}
              type="button"
              className="px-8 h-12 rounded-2xl font-bold text-gray-500 bg-gray-50 hover:bg-gray-100 transition-all text-xs uppercase tracking-widest disabled:opacity-50"
            >
              Cancelar
            </button>

            <LoadingButton
              isLoading={isSubmitting}
              onClick={handleSave}
              className="px-10 h-12 rounded-2xl font-black text-white bg-[#10b981] hover:bg-[#0da673] shadow-lg shadow-emerald-100/50 active:scale-95 text-xs uppercase tracking-[0.2em]"
            >
              Cadastrar
            </LoadingButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
