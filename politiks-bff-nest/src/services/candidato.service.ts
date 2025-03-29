import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { Candidato } from '../interfaces/candidato.interface';
import { CandidatoDto } from '../dtos/candidato.dto';

/**
 * Serviço para comunicação com a API de candidatos.
 * Implementa o princípio de Responsabilidade Única (SRP) do SOLID.
 */
@Injectable()
export class CandidatoService {
  private readonly apiUrl: string;

  constructor(private readonly httpService: HttpService) {
    this.apiUrl = process.env.CANDIDATOS_API_URL || 'http://localhost:8081/api/candidatos';
  }

  /**
   * Lista todos os candidatos.
   * @returns Promise com a lista de candidatos
   */
  async listarTodos(): Promise<Candidato[]> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<Candidato[]>(this.apiUrl).pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(
              `Erro ao buscar candidatos: ${error.message}`,
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
        'Erro ao buscar candidatos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Busca um candidato por ID.
   * @param id ID do candidato
   * @returns Promise com o candidato encontrado
   */
  async buscarPorId(id: number): Promise<Candidato> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<Candidato>(`${this.apiUrl}/${id}`).pipe(
          catchError((error: AxiosError) => {
            if (error.response?.status === 404) {
              throw new HttpException(
                `Candidato com ID ${id} não encontrado`,
                HttpStatus.NOT_FOUND,
              );
            }
            throw new HttpException(
              `Erro ao buscar candidato: ${error.message}`,
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
        'Erro ao buscar candidato',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Lista candidatos por partido.
   * @param partidoId ID do partido
   * @returns Promise com a lista de candidatos do partido
   */
  async listarPorPartido(partidoId: number): Promise<Candidato[]> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<Candidato[]>(`${this.apiUrl}/partido/${partidoId}`).pipe(
          catchError((error: AxiosError) => {
            if (error.response?.status === 404) {
              throw new HttpException(
                `Partido com ID ${partidoId} não encontrado`,
                HttpStatus.NOT_FOUND,
              );
            }
            throw new HttpException(
              `Erro ao buscar candidatos do partido: ${error.message}`,
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
        'Erro ao buscar candidatos do partido',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Cria um novo candidato.
   * @param candidatoDto DTO com os dados do candidato
   * @returns Promise com o candidato criado
   */
  async criar(candidatoDto: CandidatoDto): Promise<Candidato> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post<Candidato>(this.apiUrl, candidatoDto).pipe(
          catchError((error: AxiosError) => {
            if (error.response?.status === 400) {
              throw new HttpException(
                'Dados inválidos para criar candidato',
                HttpStatus.BAD_REQUEST,
              );
            }
            if (error.response?.status === 404) {
              throw new HttpException(
                'Partido não encontrado',
                HttpStatus.NOT_FOUND,
              );
            }
            throw new HttpException(
              `Erro ao criar candidato: ${error.message}`,
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
        'Erro ao criar candidato',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Atualiza um candidato existente.
   * @param id ID do candidato
   * @param candidatoDto DTO com os novos dados do candidato
   * @returns Promise com o candidato atualizado
   */
  async atualizar(id: number, candidatoDto: CandidatoDto): Promise<Candidato> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.put<Candidato>(`${this.apiUrl}/${id}`, candidatoDto).pipe(
          catchError((error: AxiosError) => {
            if (error.response?.status === 404) {
              throw new HttpException(
                `Candidato com ID ${id} não encontrado ou partido não encontrado`,
                HttpStatus.NOT_FOUND,
              );
            }
            if (error.response?.status === 400) {
              throw new HttpException(
                'Dados inválidos para atualizar candidato',
                HttpStatus.BAD_REQUEST,
              );
            }
            throw new HttpException(
              `Erro ao atualizar candidato: ${error.message}`,
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
        'Erro ao atualizar candidato',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Remove um candidato.
   * @param id ID do candidato
   * @returns Promise vazia
   */
  async remover(id: number): Promise<void> {
    try {
      await firstValueFrom(
        this.httpService.delete(`${this.apiUrl}/${id}`).pipe(
          catchError((error: AxiosError) => {
            if (error.response?.status === 404) {
              throw new HttpException(
                `Candidato com ID ${id} não encontrado`,
                HttpStatus.NOT_FOUND,
              );
            }
            throw new HttpException(
              `Erro ao remover candidato: ${error.message}`,
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
        'Erro ao remover candidato',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
