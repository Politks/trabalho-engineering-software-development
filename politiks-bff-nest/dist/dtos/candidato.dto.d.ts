import { PartidoDto } from './partido.dto';
export declare class CandidatoDto {
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
export declare class CandidatoComPartidoDto extends CandidatoDto {
    partido?: PartidoDto;
}
