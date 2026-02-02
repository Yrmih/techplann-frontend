import axios from 'axios';

// Use a porta 3001 que configuramos no seu main.ts do NestJS
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
});

export const onboardingService = {
  // Inicializa o fluxo e gera o UUID (onboardingId)
  start: async () => {
    const { data } = await api.post('/onboarding/start');
    return data; // Retorna { onboardingId, next }
  },

  // Etapa 1: Organização (Cria Tenant e Org no Postgres)
  saveOrganization: async (onboardingId: string, payload: any) => {
    const { data } = await api.post(`/onboarding/${onboardingId}/organization`, payload);
    return data; // Retorna { tenantId, organizationId }
  },

  // Etapa 2: Responsável (Cria o Usuário no Postgres)
  saveResponsible: async (onboardingId: string, tenantId: string, orgId: string, userData: any) => {
    const { data } = await api.post(`/onboarding/${onboardingId}/responsible`, {
      tenantId,
      orgId,
      data: userData,
    });
    return data;
  }
};