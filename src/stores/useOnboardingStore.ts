import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OnboardingState {
  onboardingId: string | null;
  tenantId: string | null;
  organizationId: string | null;

  // Ações
  setOnboardingId: (id: string) => void;
  setTenantAndOrg: (tenantId: string, orgId: string) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      // ESTADO INICIAL
      onboardingId: null,
      tenantId: null,
      organizationId: null,

      // Atualiza o ID da sessão para persistência
      setOnboardingId: (id) => {
        set({ onboardingId: id });
      },

      // Salva o vínculo criado no Step 1
      setTenantAndOrg: (tenantId, orgId) => {
        set({
          tenantId,
          organizationId: orgId,
        });
      },

      // Limpa tudo ao finalizar para garantir que o Onboarding não reabra
      reset: () => {
        set({
          onboardingId: null,
          tenantId: null,
          organizationId: null,
        });

        // Limpa os dados temporários de herança para não deixar rastros no navegador
        localStorage.removeItem("onboarding_user_name");
        localStorage.removeItem("onboarding_user_email");
      },
    }),
    {
      name: "techplann-onboarding-storage",
    },
  ),
);
