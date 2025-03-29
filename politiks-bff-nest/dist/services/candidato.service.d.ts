import { HttpService } from '@nestjs/axios';
import { Candidato } from '../interfaces/candidato.interface';
import { CandidatoDto } from '../dtos/candidato.dto';
export declare class CandidatoService {
    private readonly httpService;
    private readonly apiUrl;
    constructor(httpService: HttpService);
    listarTodos(): Promise<Candidato[]>;
    buscarPorId(id: number): Promise<Candidato>;
    listarPorPartido(partidoId: number): Promise<Candidato[]>;
    criar(candidatoDto: CandidatoDto): Promise<Candidato>;
    atualizar(id: number, candidatoDto: CandidatoDto): Promise<Candidato>;
    remover(id: number): Promise<void>;
}
