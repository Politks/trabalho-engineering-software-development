/**
 * Interface que define a estrutura de um candidato.
 * Segue o princípio Interface Segregation Principle (ISP) do SOLID.
 */
export interface Candidato {
  id?: number;
  nome: string;
  cpf: string;
  dataNascimento?: string;
  biografia?: string;
  cargoPleiteado?: string;
  partidoId: number;
  partidoNome?: string;
  partidoSigla?: string;
}
