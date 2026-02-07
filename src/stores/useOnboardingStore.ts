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

      // Atualiza o ID da sessão (Pai usa isso para persistência de navegação)
      setOnboardingId: (id) => {
        console.log("📦 Store: Persistindo onboardingId no LocalStorage...");
        set({ onboardingId: id });
      },

      // Salva o vínculo criado no Step 1 para ser usado no Step 2 e 3
      setTenantAndOrg: (tenantId, orgId) => {
        console.log("📦 Store: Vinculando Tenant e Org...");
        set({
          tenantId,
          organizationId: orgId,
        });
      },

      // Limpa tudo ao finalizar ou em caso de erro crítico
      reset: () => {
        console.log("🧹 Store: Limpando dados do onboarding.");
        set({
          onboardingId: null,
          tenantId: null,
          organizationId: null,
        });
      },
    }),
    {
      name: "techplann-onboarding-storage", // Chave no LocalStorage do browser
    },
  ),
);
