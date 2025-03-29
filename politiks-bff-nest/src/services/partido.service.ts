import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { Partido } from '../interfaces/partido.interface';
import { PartidoDto } from '../dtos/partido.dto';

/**
 * Serviço para comunicação com a API de partidos.
 * Implementa o princípio de Responsabilidade Única (SRP) do SOLID.
 */
@Injectable()
export class PartidoService {
  private readonly apiUrl: string;

  constructor(private readonly httpService: HttpService) {
    // Usa variável de ambiente ou fallback para localhost
    this.apiUrl = process.env.PARTIDOS_API_URL || 'http://localhost:8082/api/partidos';
  }

  /**
   * Lista todos os partidos.
   * @returns Promise com a lista de partidos
   */
  async listarTodos(): Promise<Partido[]> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<Partido[]>(this.apiUrl).pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(
              `Erro ao buscar partidos: ${error.message}`,
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }),
        ),
      );
      return data;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Erro ao buscar partidos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Busca um partido por ID.
   * @param id ID do partido
   * @returns Promise com o partido encontrado
   */
  async buscarPorId(id: number): Promise<Partido> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<Partido>(`${this.apiUrl}/${id}`).pipe(
          catchError((error: AxiosError) => {
            if (error.response?.status === 404) {
              throw new HttpException(
                `Partido com ID ${id} não encontrado`,
                HttpStatus.NOT_FOUND,
              );
            }
            throw new HttpException(
              `Erro ao buscar partido: ${error.message}`,
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }),
        ),
      );
      return data;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Erro ao buscar partido',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Cria um novo partido.
   * @param partidoDto DTO com os dados do partido
   * @returns Promise com o partido criado
   */
  async criar(partidoDto: PartidoDto): Promise<Partido> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post<Partido>(this.apiUrl, partidoDto).pipe(
          catchError((error: AxiosError) => {
            if (error.response?.status === 400) {
              throw new HttpException(
                'Dados inválidos para criar partido',
                HttpStatus.BAD_REQUEST,
              );
            }
            throw new HttpException(
              `Erro ao criar partido: ${error.message}`,
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }),
        ),
      );
      return data;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Erro ao criar partido',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Atualiza um partido existente.
   * @param id ID do partido
   * @param partidoDto DTO com os novos dados do partido
   * @returns Promise com o partido atualizado
   */
  async atualizar(id: number, partidoDto: PartidoDto): Promise<Partido> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.put<Partido>(`${this.apiUrl}/${id}`, partidoDto).pipe(
          catchError((error: AxiosError) => {
            if (error.response?.status === 404) {
              throw new HttpException(
                `Partido com ID ${id} não encontrado`,
                HttpStatus.NOT_FOUND,
              );
            }
            if (error.response?.status === 400) {
              throw new HttpException(
                'Dados inválidos para atualizar partido',
                HttpStatus.BAD_REQUEST,
              );
            }
            throw new HttpException(
              `Erro ao atualizar partido: ${error.message}`,
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }),
        ),
      );
      return data;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Erro ao atualizar partido',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Remove um partido.
   * @param id ID do partido
   * @returns Promise vazia
   */
  async remover(id: number): Promise<void> {
    try {
      await firstValueFrom(
        this.httpService.delete(`${this.apiUrl}/${id}`).pipe(
          catchError((error: AxiosError) => {
            if (error.response?.status === 404) {
              throw new HttpException(
                `Partido com ID ${id} não encontrado`,
                HttpStatus.NOT_FOUND,
              );
            }
            throw new HttpException(
              `Erro ao remover partido: ${error.message}`,
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }),
        ),
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Erro ao remover partido',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
