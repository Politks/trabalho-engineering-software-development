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
