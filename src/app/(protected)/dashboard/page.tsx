import Dashboard from "@/components/home-dashboard/dashboard/Dashboard";

export default function DashboardPage() {
  return (
    <div className="p-8">
      {/* Chamamos o componente principal. 
          Toda a lógica de cards, gráficos e SWOT que você 
          está construindo ficará dentro dele. 
      */}
      <Dashboard />
    </div>
  );
}