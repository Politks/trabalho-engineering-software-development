/**
 * Interface que define a estrutura de um partido político.
 * Segue o princípio Interface Segregation Principle (ISP) do SOLID.
 */
export interface Partido {
  id?: number;
  nome: string;
  sigla: string;
  descricao?: string;
  dataFundacao?: string;
}
