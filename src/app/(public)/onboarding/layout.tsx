
import { OnboardingTimeline } from "@/components/layout/OnboardingTimeline";

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* O Timeline fixo no topo de todos os passos */}
      <OnboardingTimeline />
      
      {/* O formulário do step atual (children) centralizado */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl">
          {children}
        </div>
      </main>
    </div>
  );
}