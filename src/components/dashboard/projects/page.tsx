export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">aqui ficará a Gestão de Projetos</h1>
        <button className="bg-[#10b981] text-white px-4 py-2 rounded-lg text-sm font-bold">+ Novo Projeto</button>
      </div>
      <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center text-gray-400">
        Lista de projetos ativos e quadros Kanban.
      </div>
    </div>
  );
}