"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


interface DeleteProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void;
  projectName: string;
}

export const DeleteProjectModal = ({
  isOpen,
  onClose,
  onConfirm,
  projectName,
}: DeleteProjectModalProps) => {
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop escurecido conforme a imagem */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        />

        {/* Card do Modal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative bg-white w-full max-w-[480px] rounded-[24px] p-8 shadow-2xl overflow-hidden"
        >
          <div className="space-y-6 text-left">
            {/* Título e Descrição */}
            <div>
              <h2 className="text-xl font-black text-gray-900 tracking-tight">
                Confirmar exclusão
              </h2>
              <p className="text-sm text-gray-500 font-medium mt-2 leading-relaxed">
                Deseja excluir <span className="font-bold text-gray-800">{projectName}</span>? Esta ação não pode ser desfeita.
              </p>
            </div>

            {/* Campo de Senha */}
            <div className="space-y-2">
              <label className="text-[13px] font-black text-gray-800 ml-0.5">
                Digite sua senha para confirmar:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className="w-full h-12 px-5 bg-[#ebf2ff] border-transparent rounded-xl text-lg outline-none focus:bg-white focus:ring-2 focus:ring-[#10b981]/20 transition-all placeholder:text-gray-400"
              />
            </div>

            {/* Botões de Ação */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => onConfirm(password)}
                disabled={!password}
                className="px-8 py-2.5 bg-[#f43f5e] hover:bg-[#e11d48] disabled:opacity-50 text-white rounded-xl text-sm font-black transition-all shadow-lg shadow-rose-100 active:scale-95"
              >
                Excluir
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};