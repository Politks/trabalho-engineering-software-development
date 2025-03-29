import { CandidatoService } from '../services/candidato.service';
import { PartidoService } from '../services/partido.service';
import { CandidatoDto, CandidatoComPartidoDto } from '../dtos/candidato.dto';
export declare class CandidatoController {
    private readonly candidatoService;
    private readonly partidoService;
    constructor(candidatoService: CandidatoService, partidoService: PartidoService);
    listarTodos(): Promise<CandidatoComPartidoDto[]>;
    buscarPorId(id: number): Promise<CandidatoComPartidoDto>;
    listarPorPartido(partidoId: number): Promise<CandidatoComPartidoDto[]>;
    criar(candidatoDto: CandidatoDto): Promise<CandidatoComPartidoDto>;
    atualizar(id: number, candidatoDto: CandidatoDto): Promise<CandidatoComPartidoDto>;
    remover(id: number): Promise<{
        message: string;
    }>;
}
