"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";

// Interface alinhada com o que o Laravel deve retornar
export interface Stakeholder {
  id: string;
  nome: string;
  tipo: string;
  status: "Ativo" | "Inativo";
  organization_id: string;
  email?: string | null;
  telefone?: string | null;
  empresaRelacionada?: string | null;
}

// DADOS MOCKADOS (SIMULAÇÃO DO BANCO)
const MOCK_DATA: Stakeholder[] = [
  {
    id: "1",
    nome: "Departamento Comercial",
    tipo: "Departamento",
    status: "Ativo",
    organization_id: "org_1",
    email: "comercial@empresa.com",
  },
  {
    id: "2",
    nome: "Logística Global LTDA",
    tipo: "Fornecedor",
    status: "Ativo",
    organization_id: "org_1",
    empresaRelacionada: "Matriz",
  },
  {
    id: "3",
    nome: "Recursos Humanos",
    tipo: "Departamento",
    status: "Ativo",
    organization_id: "org_1",
  },
  {
    id: "4",
    nome: "Consultoria Estratégica X",
    tipo: "Parceiro",
    status: "Inativo",
    organization_id: "org_1",
  },
];

export const useStakeholders = () => {
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>(MOCK_DATA);
  const [isLoading, setIsLoading] = useState(false);

  // Filtro de departamentos derivado (Muito usado na SWOT)
  const departamentos = useMemo(() => {
    return stakeholders.filter(
      (s) => s.tipo === "Departamento" || s.tipo === "Administrativo",
    );
  }, [stakeholders]);

  // Simulação de Criar (POST /api/stakeholders)
  const createStakeholder = (newData: Partial<Stakeholder>) => {
    setIsLoading(true);

    // Simula delay de rede
    setTimeout(() => {
      const newEntry: Stakeholder = {
        id: Math.random().toString(36).substr(2, 9),
        nome: newData.nome || "Novo Registro",
        tipo: newData.tipo || "Outro",
        status: newData.status || "Ativo",
        organization_id: "org_1",
        email: newData.email,
        empresaRelacionada: newData.empresaRelacionada,
      };

      setStakeholders((prev) => [newEntry, ...prev]);
      setIsLoading(false);
      toast.success("Cadastrado com sucesso (Simulação)");
    }, 800);
  };

  // Simulação de Deletar (DELETE /api/stakeholders/{id})
  const deleteStakeholder = (id: string) => {
    setIsLoading(true);

    setTimeout(() => {
      setStakeholders((prev) => prev.filter((item) => item.id !== id));
      setIsLoading(false);
      toast.success("Removido com sucesso (Simulação)");
    }, 500);
  };

  // Simulação de Editar (PUT /api/stakeholders/{id})
  const updateStakeholder = (id: string, updatedData: Partial<Stakeholder>) => {
    setIsLoading(true);

    setTimeout(() => {
      setStakeholders((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, ...updatedData } : item,
        ),
      );
      setIsLoading(false);
      toast.success("Atualizado com sucesso (Simulação)");
    }, 800);
  };

  return {
    stakeholders,
    departamentos,
    isLoading,
    createStakeholder,
    deleteStakeholder,
    updateStakeholder,
  };
};


// simulação de um contrato real mas com any: 

// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios"; // Ou sua instância customizada do axios
// import { useAuth } from "@/contexts/AuthContext";
// import { toast } from "sonner";

// // URL base da sua API Laravel
// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// export interface Stakeholder {
//   id: string;
//   nome: string;
//   tipo: string;
//   status: "Ativo" | "Inativo";
//   organization_id: string;
//   email?: string | null;
//   telefone?: string | null;
//   departamento_id?: string | null;
// }

// export const useStakeholders = () => {
//   const queryClient = useQueryClient();
//   const { user, token } = useAuth(); // Pegamos o token JWT para o Laravel

//   // Configuração padrão do Header para o Laravel Sanctum/Passport
//   const config = {
//     headers: { Authorization: `Bearer ${token}` }
//   };

//   // 1. BUSCAR (GET)
//   const { data: stakeholders = [], isLoading } = useQuery({
//     queryKey: ["stakeholders", user?.organization_id],
//     queryFn: async () => {
//       // O Laravel geralmente filtra por organization_id via Middleware ou Scope no Model
//       const response = await axios.get(`${API_URL}/stakeholders`, config);
//       return response.data; // Supondo que o Laravel retorne o array direto
//     },
//     enabled: !!token, // Só busca se o usuário estiver autenticado
//   });

//   // Filtro de departamentos (Lógica de Frontend baseada no tipo)
//   const departamentos = stakeholders.filter(
//     (s: Stakeholder) => s.tipo === "Administrativo" || s.tipo === "Departamento"
//   );

//   // 2. CRIAR (POST)
//   const createStakeholder = useMutation({
//     mutationFn: async (newData: Partial<Stakeholder>) => {
//       const response = await axios.post(`${API_URL}/stakeholders`, newData, config);
//       return response.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["stakeholders"] });
//       toast.success("Cadastrado com sucesso no sistema!");
//     },
//     onError: (error: any) => {
//       const message = error.response?.data?.message || "Erro ao conectar com o servidor";
//       toast.error(message);
//     }
//   });

//   // 3. EXCLUIR (DELETE)
//   const deleteStakeholder = useMutation({
//     mutationFn: async (id: string) => {
//       await axios.delete(`${API_URL}/stakeholders/${id}`, config);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["stakeholders"] });
//       toast.success("Removido com sucesso!");
//     }
//   });

//   return {
//     stakeholders,
//     departamentos,
//     isLoading,
//     createStakeholder: createStakeholder.mutate,
//     deleteStakeholder: deleteStakeholder.mutate,
//     isSubmitting: createStakeholder.isPending
//   };
// };