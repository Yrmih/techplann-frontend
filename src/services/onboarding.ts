import axios from "axios";
import { useOnboardingStore } from "../stores/useOnboardingStore";
// Importe seus tipos aqui (ajuste os caminhos conforme sua pasta)
import { OrganizationStepOneData } from "@/lib/validators/organization-step-one.schema";
import { RepresentativeData } from "@/lib/validators/responsible";
import { PlanSelectionInput } from "@/lib/validators/plan-selection";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
});

export const onboardingService = {
  // Inicializa o fluxo
  start: async (): Promise<{ onboardingId: string; next: string }> => {
    const { data } = await api.post("/onboarding/start");
    useOnboardingStore.getState().setOnboardingId(data.onboardingId);
    return data;
  },

  // ETAPA 1: Organização
  saveOrganization: async (
    onboardingId: string,
    payload: OrganizationStepOneData,
  ) => {
    const { data } = await api.post(
      `/onboarding/${onboardingId}/organization`,
      payload,
    );
    // Salva os IDs retornados no Zustand para as próximas etapas
    useOnboardingStore
      .getState()
      .setTenantAndOrg(data.tenantId, data.organizationId);
    return data;
  },

  // ETAPA 2: Responsável
  saveResponsible: async (
    onboardingId: string,
    tenantId: string,
    orgId: string,
    userData: RepresentativeData,
  ) => {
    const { data } = await api.post(`/onboarding/${onboardingId}/responsible`, {
      tenantId,
      orgId,
      data: userData,
    });
    return data;
  },

  // ETAPA 3: Plano
  saveSubscription: async (
    onboardingId: string,
    tenantId: string,
    planData: PlanSelectionInput,
  ) => {
    const { data } = await api.post(
      `/onboarding/${onboardingId}/subscription`,
      {
        tenantId,
        data: planData,
      },
    );
    return data;
  },
};
