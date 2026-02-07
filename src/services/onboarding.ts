import axios from "axios";

// Importe seus tipos
import { OrganizationStepOneData } from "@/lib/validators/schema";
import { RepresentativeData } from "@/lib/validators/responsible";
import { PlanSelectionInput } from "@/lib/validators/plan-selection";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

export const onboardingService = {
  // 0. Inicializa o fluxo - Apenas retorna o dado, não mexe na store aqui dentro
  start: async (): Promise<{ onboardingId: string; next: string }> => {
    try {
      const { data } = await api.post("/onboarding/start");
      console.log("✅ API: Fluxo iniciado com sucesso.");
      return data;
    } catch (error) {
      console.error("❌ API: Erro ao iniciar onboarding:", error);
      throw error;
    }
  },

  // 1. Organização (TechNova) - Recebe o ID obrigatoriamente
  saveOrganization: async (
    onboardingId: string,
    payload: OrganizationStepOneData,
  ) => {
    if (!onboardingId || onboardingId === "undefined") {
      throw new Error("ID de onboarding inválido para salvamento.");
    }

    try {
      // Chamada direta usando o ID injetado via Props no componente
      const { data } = await api.post(
        `/onboarding/${onboardingId}/organization`,
        payload,
      );
      return data; // Retorna { tenantId, organizationId }
    } catch (error) {
      console.error("❌ API: Erro ao salvar organização:", error);
      throw error;
    }
  },

  // 2. Responsável (Pietro)
  saveResponsible: async (
    onboardingId: string,
    tenantId: string,
    orgId: string, // Mantemos o nome do argumento na função por clareza
    userData: RepresentativeData,
  ) => {
    try {
      // MUDANÇA AQUI: Enviamos 'organizationId' para bater com o Controller do NestJS
      const { data } = await api.post(
        `/onboarding/${onboardingId}/responsible`,
        {
          tenantId,
          organizationId: orgId, // Mapeamento de orgId para organizationId
          data: userData,
        },
      );
      return data;
    } catch (error) {
      console.error("❌ API: Erro ao salvar responsável:", error);
      throw error;
    }
  },

  // 3. Plano
  saveSubscription: async (
    onboardingId: string,
    tenantId: string,
    planData: PlanSelectionInput,
  ) => {
    try {
      const { data } = await api.post(
        `/onboarding/${onboardingId}/subscription`,
        {
          tenantId,
          data: planData,
        },
      );
      return data;
    } catch (error) {
      console.error("❌ API: Erro ao salvar plano:", error);
      throw error;
    }
  },
};