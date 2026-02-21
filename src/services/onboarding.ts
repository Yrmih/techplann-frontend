import axios from "axios";

// tipos
import { OrganizationStepOneData } from "@/lib/validators/schema";
import { RepresentativeData } from "@/lib/validators/responsible";
import { PlanSelectionInput } from "@/lib/validators/plan-selection";
import { AccountCreationData } from "@/lib/validators/user-account.schema";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

export const onboardingService = {
  // 0. Inicializa o fluxo
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

  // 1. Organização
  saveOrganization: async (
    onboardingId: string,
    payload: OrganizationStepOneData,
  ) => {
    if (!onboardingId || onboardingId === "undefined") {
      throw new Error("ID de onboarding inválido para salvamento.");
    }

    try {
      const { data } = await api.post(
        `/onboarding/${onboardingId}/organization`,
        { ...payload },
      );
      return data;
    } catch (error) {
      console.error("❌ API: Erro ao salvar organização:", error);
      throw error;
    }
  },

  // 2. Responsável
  saveResponsible: async (
    onboardingId: string,
    tenantId: string,
    orgId: string,
    userData: RepresentativeData,
  ) => {
    try {
      const { data } = await api.post(
        `/onboarding/${onboardingId}/responsible`,
        {
          tenantId,
          organizationId: orgId,
          data: { ...userData },
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
      const payload = {
        tenantId,
        planKey: planData.planKey,
        billingCycle: "monthly",
      };

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

  /* ============================================================
     5. CONTA (UPGRADE FINAL)
     ============================================================ */
  /**
   * Finaliza o onboarding ativando a senha do usuário.
   * Bate com o endpoint @Post(':id/account') que criamos no NestJS.
   */
  finalizeAccount: async (
    onboardingId: string,
    accountData: AccountCreationData,
  ) => {
    // 💡 Detalhe de segurança: Validar o ID antes da chamada
    if (!onboardingId || onboardingId === "undefined") {
      throw new Error("ID de onboarding inválido para finalização de conta.");
    }

    try {
      console.log("🚀 Enviando upgrade de conta para o backend...");

      /**
       * Os nomes dos campos (fullName, email, password)
       * devem ser idênticos ao userAccountSchema do Backend.
       */
      const { data } = await api.post(`/onboarding/${onboardingId}/account`, {
        fullName: accountData.fullName,
        email: accountData.email,
        password: accountData.password,
        confirmPassword: accountData.confirmPassword,
      });

      console.log("✅ API: Conta ativada com sucesso!");
      return data;
    } catch (error) {
      console.error("❌ API: Erro ao finalizar conta de acesso:", error);
      throw error;
    }
  },
};
