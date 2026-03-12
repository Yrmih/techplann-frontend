export interface IPlanning {
  id: number | string;
  nome: string;
  cliente: string;
  projetos: number;
  status: "ATIVO" | "CONCLUÍDO" | string;
}
