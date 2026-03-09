export interface IProject {
  id: string;
  titulo: string;
  descricao: string;
  responsavelNome: string;
  responsavelId: string;
  departamentoId: string;
  dataInicio: string;
  dataFinal: string;
  atividades: number;
  subAtividades: number;
  progresso: number;
  situacao: string;
  parceiros: string[];
  swot: string[];
}
