"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  ChevronDown,
  ClipboardList,
  Check,
  X,
  FolderOpen,
  ListTodo,
  FileStack,
  FolderKanban,
} from "lucide-react";

// Importações dos componentes
import { NewProjectForm } from "./components/form/NewProjectForm";
import { ProjectTable } from "./components/table/ProjectTable";
import { ProjectDashboard } from "./components/dashboard/ProjectDashboard";
import { DeleteProjectModal } from "./components/modal/DeleteProjectModal";
import { IProject } from "@/types/project.interface";

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Controle de estados de visualização e edição
  const [view, setView] = useState<"list" | "form" | "dashboard">("list");
  const [projectToEdit, setProjectToEdit] = useState<IProject | null>(null);
  const [viewingProject, setViewingProject] = useState<IProject | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<IProject | null>(null);

  // Lista de projetos persistida localmente no estado
  const [projects, setProjects] = useState<IProject[]>([]);

  const showToast = (
    message: string,
    type: "success" | "error" = "success",
  ) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Função centralizada para Salvar (Novo ou Edição) - A CHAVE DO PROBLEMA
  const handleFormSubmit = (updatedProject: IProject) => {
    setProjects((prev) => {
      const exists = prev.find((p) => p.id === updatedProject.id);

      if (exists) {
        // Se já existe, atualiza o item na lista mantendo a ordem
        return prev.map((p) =>
          p.id === updatedProject.id ? updatedProject : p,
        );
      } else {
        // Se é novo, adiciona no início do array
        return [updatedProject, ...prev];
      }
    });

    // Feedback visual e retorno para a lista
    showToast(
      projectToEdit
        ? "Projeto atualizado com sucesso!"
        : "Projeto criado com sucesso!",
    );
    setView("list");
    setProjectToEdit(null);
  };

  // Função para deletar projeto após confirmação
  const confirmDeleteProject = (password: string) => {
    if (projectToDelete) {
      setProjects((prev) => prev.filter((p) => p.id !== projectToDelete.id));
      setProjectToDelete(null);
      showToast("Projeto excluído com sucesso!");
    }
  };

  // 1. ESTADO: Visualizando Dashboard
  if (viewingProject) {
    return (
      <ProjectDashboard
        projectTitle={viewingProject.titulo}
        onBack={() => setViewingProject(null)}
      />
    );
  }

  // 2. ESTADO: Formulário (Criação ou Edição)
  if (view === "form") {
    return (
      <NewProjectForm
        initialData={projectToEdit}
        onBack={() => {
          setView("list");
          setProjectToEdit(null);
        }}
        onSubmitSuccess={handleFormSubmit}
      />
    );
  }

  const filteredProjects = projects.filter((p) =>
    p.titulo.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // 3. ESTADO: Listagem (Principal)
  return (
    <div className="space-y-8 pb-10 relative min-h-screen bg-gray-50/30 font-sans px-4">
      {/* Modal de Exclusão */}
      <DeleteProjectModal
        isOpen={!!projectToDelete}
        projectName={projectToDelete?.titulo || ""}
        onClose={() => setProjectToDelete(null)}
        onConfirm={confirmDeleteProject}
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-10 right-10 z-[100] bg-white border border-gray-100 text-gray-900 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 min-w-[320px] justify-between border-l-4 border-l-[#10b981]"
          >
            <div className="flex items-center gap-3">
              <div className="bg-emerald-50 rounded-full p-2 flex items-center justify-center text-[#10b981]">
                <Check size={18} strokeWidth={3} />
              </div>
              <span className="text-sm font-bold tracking-tight">
                {toast.message}
              </span>
            </div>
            <button
              onClick={() => setToast(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Banner Superior */}
      <div className="relative w-full h-44 bg-gradient-to-r from-[#34a87a] via-[#10b981] to-[#3b82f6] rounded-[32px] p-10 flex flex-col justify-center shadow-lg overflow-hidden mt-4">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="flex justify-between items-center relative z-10">
          <div className="text-left text-white">
            <h1 className="text-4xl font-black tracking-tight leading-none mb-2 text-left">
              Projetos
            </h1>
            <p className="text-sm font-medium opacity-90 tracking-tight text-left">
              Gerencie projetos, atividades e sub-atividades com foco total em
              resultados
            </p>
          </div>
          <button
            onClick={() => {
              setProjectToEdit(null);
              setView("form");
            }}
            className="flex items-center gap-2 bg-[#059669] hover:bg-[#047857] text-white px-8 py-3.5 rounded-2xl font-black text-sm transition-all shadow-xl active:scale-95 uppercase tracking-widest"
          >
            <Plus size={20} strokeWidth={3} /> Novo Projeto
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center bg-white border border-gray-100 p-2 rounded-2xl shadow-sm min-w-[320px]">
            <div className="text-[#10b981] pl-3">
              <ClipboardList size={20} strokeWidth={2.5} />
            </div>
            <div className="flex-1 px-4 text-left">
              <span className="text-sm font-black text-gray-700 truncate block">
                Planejamento Estratégico de...
              </span>
            </div>
            <ChevronDown size={18} className="text-gray-300 mr-2" />
          </div>

          <div className="relative w-full max-w-xl group">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#10b981] transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="Pesquisar projetos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-12 pl-14 pr-6 bg-[#ebf2ff] border-transparent rounded-2xl text-sm font-bold text-gray-600 outline-none focus:bg-white focus:border-[#10b981] transition-all shadow-sm"
            />
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="bg-white rounded-[40px] border border-gray-100 p-24 flex flex-col items-center justify-center space-y-6 text-center shadow-sm">
            <div className="bg-gray-50 p-8 rounded-[40px]">
              <FolderKanban
                size={64}
                strokeWidth={1.5}
                className="text-gray-200"
              />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-black text-gray-400 tracking-tight">
                Nenhum projeto encontrado
              </h3>
              <p className="text-[11px] text-gray-300 font-black uppercase tracking-[0.2em]">
                Crie o primeiro projeto para começar!
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <ProjectTable
              projects={filteredProjects}
              onViewDetails={(p) => setViewingProject(p)}
              onEdit={(p) => {
                setProjectToEdit(p);
                setView("form");
              }}
              onDelete={(projectId) => {
                const project = projects.find((p) => p.id === projectId);
                if (project) setProjectToDelete(project);
              }}
            />

            <div className="flex items-center gap-6 px-4">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-left">
                Legenda:
              </span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="text-[10px] font-black text-amber-700 uppercase">
                    Abaixo de 50%
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                  <span className="text-[10px] font-black text-emerald-700 uppercase tracking-tighter">
                    Acima de 50%
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span className="text-[10px] font-black text-blue-700 uppercase tracking-tighter">
                    Igual a 100%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <EntityCard
            icon={<FolderOpen size={18} />}
            title="Projetos"
            count={projects.length}
          />
          <EntityCard
            icon={<ListTodo size={18} />}
            title="Atividades"
            count={projects.reduce(
              (acc, curr) => acc + (curr.atividades || 0),
              0,
            )}
          />
          <EntityCard
            icon={<FileStack size={18} />}
            title="Sub Atividades"
            count={projects.reduce(
              (acc, curr) => acc + (curr.subAtividades || 0),
              0,
            )}
          />
        </div>
      </div>
    </div>
  );
}

function EntityCard({
  icon,
  title,
  count,
}: {
  icon: React.ReactNode;
  title: string;
  count: number;
}) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[140px] text-left">
      <div className="p-4 border-b border-gray-50 flex items-center gap-3 text-left">
        <div className="p-2 bg-emerald-50 text-[#10b981] rounded-xl">
          {icon}
        </div>
        <span className="text-sm font-black text-gray-800 tracking-tight uppercase text-left">
          {title}
        </span>
      </div>
      <div className="flex-1 flex items-center justify-center p-6 italic">
        {count > 0 ? (
          <span className="text-3xl font-black text-[#10b981]">{count}</span>
        ) : (
          <p className="text-[11px] text-gray-300 font-bold uppercase tracking-widest text-center">
            Nenhum item
          </p>
        )}
      </div>
    </div>
  );
}
