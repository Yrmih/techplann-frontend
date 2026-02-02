import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OnboardingState {
  onboardingId: string | null;
  tenantId: string | null;
  organizationId: string | null;
  
  // Ações para salvar os dados
  setOnboardingId: (id: string) => void;
  setTenantAndOrg: (tenantId: string, orgId: string) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      onboardingId: null,
      tenantId: null,
      organizationId: null,

      setOnboardingId: (id) => set({ onboardingId: id }),
      
      setTenantAndOrg: (tenantId, orgId) => set({ 
        tenantId, 
        organizationId: orgId 
      }),

      reset: () => set({ 
        onboardingId: null, 
        tenantId: null, 
        organizationId: null 
      }),
    }),
    {
      name: 'techplann-onboarding-storage', // Nome da chave no LocalStorage
    }
  )
);