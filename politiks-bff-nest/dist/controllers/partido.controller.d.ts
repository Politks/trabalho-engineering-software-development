import { PartidoService } from '../services/partido.service';
import { PartidoDto } from '../dtos/partido.dto';
import { Partido } from '../interfaces/partido.interface';
export declare class PartidoController {
    private readonly partidoService;
    constructor(partidoService: PartidoService);
    listarTodos(): Promise<Partido[]>;
    buscarPorId(id: number): Promise<Partido>;
    criar(partidoDto: PartidoDto): Promise<Partido>;
    atualizar(id: number, partidoDto: PartidoDto): Promise<Partido>;
    remover(id: number): Promise<{
        message: string;
    }>;
}
