import axios from "axios";

// tipos
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

  /**
   * Manutenção: Adicionado spread operator para garantir o envio de um objeto limpo.
   */
  saveOrganization: async (
    onboardingId: string,
    payload: OrganizationStepOneData,
  ) => {
    if (!onboardingId || onboardingId === "undefined") {
      throw new Error("ID de onboarding inválido para salvamento.");
    }

    try {
      // 💡 O spread {...payload} garante que enviamos um objeto novo e purificado
      const { data } = await api.post(
        `/onboarding/${onboardingId}/organization`,
        { ...payload },
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
    orgId: string,
    userData: RepresentativeData,
  ) => {
    try {
      // Enviamos 'organizationId' para bater exatamente com o Controller do NestJS
      const { data } = await api.post(
        `/onboarding/${onboardingId}/responsible`,
        {
          tenantId,
          organizationId: orgId,
          data: { ...userData }, // Também aplicado aqui por segurança
        },
      );
      return data;
    } catch (error) {
      console.error("❌ API: Erro ao salvar responsável:", error);
      throw error;
    }
  },

  // 3. Assinatura / Plano
  saveSubscription: async (
    onboardingId: string,
    tenantId: string,
    planData: PlanSelectionInput,
  ) => {
    try {
      // Montamos o payload EXATAMENTE como o DTO do seu backend exige
      const payload = {
        tenantId,
        planKey: planData.planKey,
        billingCycle: "monthly", // Valor padrão para evitar erros de validação
      };

      console.log(
        "🚀 Enviando Payload final de assinatura para o Backend:",
        payload,
      );

      const { data } = await api.post(
        `/onboarding/${onboardingId}/subscription`,
        payload,
      );

      return data;
    } catch (error) {
      console.error("❌ API: Erro ao salvar plano:", error);
      throw error;
    }
  },
};
