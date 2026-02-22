// 💡 IMPORTANTE: Importando a instância centralizada com Interceptors
import { httpClient } from "../config/httpClient";

// tipos
import { OrganizationStepOneData } from "@/lib/validators/schema";
import { RepresentativeData } from "@/lib/validators/responsible";
import { PlanSelectionInput } from "@/lib/validators/plan-selection";
import { AccountCreationData } from "@/lib/validators/user-account.schema";

export const onboardingService = {
  /**
   * 0. Inicializa o fluxo
   * Cria uma nova sessão de onboarding no Redis.
   */
  start: async (): Promise<{ onboardingId: string; next: string }> => {
    try {
      const { data } = await httpClient.post("/onboarding/start");
      console.log("✅ API: Fluxo iniciado com sucesso.");
      return data;
    } catch (error) {
      console.error("❌ API: Erro ao iniciar onboarding:", error);
      throw error;
    }
  },

  /**
   * 1. Organização
   * Registra o Tenant e a Empresa base.
   */
  saveOrganization: async (
    onboardingId: string,
    payload: OrganizationStepOneData,
  ) => {
    if (!onboardingId || onboardingId === "undefined") {
      throw new Error("ID de onboarding inválido para salvamento.");
    }

    try {
      const { data } = await httpClient.post(
        `/onboarding/${onboardingId}/organization`,
        { ...payload },
      );
      return data;
    } catch (error) {
      console.error("❌ API: Erro ao salvar organização:", error);
      throw error;
    }
  },

  /**
   * 2. Responsável
   * Cria o usuário 'OWNER' vinculado ao Tenant.
   */
  saveResponsible: async (
    onboardingId: string,
    tenantId: string,
    orgId: string,
    userData: RepresentativeData,
  ) => {
    try {
      const { data } = await httpClient.post(
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

  /**
   * 3. Assinatura / Plano
   * Vincula o plano selecionado ao Tenant.
   */
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

      const { data } = await httpClient.post(
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
     5. CONTA (UPGRADE FINAL + AUTO-LOGIN)
     ============================================================ */
  /**
   * Finaliza o onboarding ativando a senha do usuário.
   * Este endpoint retorna o token JWT e os dados do usuário para o Auto-Login.
   * Bate com o endpoint @Post(':id/account') no NestJS.
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
      const { data } = await httpClient.post(
        `/onboarding/${onboardingId}/account`,
        {
          fullName: accountData.fullName,
          email: accountData.email,
          password: accountData.password,
          confirmPassword: accountData.confirmPassword,
        },
      );

      console.log("✅ API: Conta ativada com sucesso!");
      // O 'data' aqui contém { message, user, token }
      return data;
    } catch (error) {
      console.error("❌ API: Erro ao finalizar conta de acesso:", error);
      throw error;
    }
  },
};
