import { HttpService } from '@nestjs/axios';
import { Partido } from '../interfaces/partido.interface';
import { PartidoDto } from '../dtos/partido.dto';
export declare class PartidoService {
    private readonly httpService;
    private readonly apiUrl;
    constructor(httpService: HttpService);
    listarTodos(): Promise<Partido[]>;
    buscarPorId(id: number): Promise<Partido>;
    criar(partidoDto: PartidoDto): Promise<Partido>;
    atualizar(id: number, partidoDto: PartidoDto): Promise<Partido>;
    remover(id: number): Promise<void>;
}
