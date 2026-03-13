export interface IPlanning {
  id: number | string;
  nome: string;
  cliente: string;
  projetos: number;
  // Atualizado para aceitar todos os status da UI
  status: "Ativo" | "Pausado" | "Concluído" | "Cancelado" | string;
}
