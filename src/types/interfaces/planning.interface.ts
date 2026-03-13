export interface IPlanning {
  id: number | string;
  nome: string;
  cliente: string;
  projetos: number;
  status: "Ativo" | "Pausado" | "Concluído" | "Cancelado" | string;
}
