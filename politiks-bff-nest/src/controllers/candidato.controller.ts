import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CandidatoService } from '../services/candidato.service';
import { PartidoService } from '../services/partido.service';
import { CandidatoDto, CandidatoComPartidoDto } from '../dtos/candidato.dto';
import { Candidato } from '../interfaces/candidato.interface';

/**
 * Controlador para operações com candidatos.
 * Implementa o padrão Controller do MVC e o princípio de Responsabilidade Única (SRP) do SOLID.
 * Também implementa o padrão Facade para simplificar a interface com as APIs subjacentes.
 */
@ApiTags('candidatos')
@Controller('candidatos')
export class CandidatoController {
  constructor(
    private readonly candidatoService: CandidatoService,
    private readonly partidoService: PartidoService,
  ) {}

  /**
   * Lista todos os candidatos com informações detalhadas do partido.
   * @returns Lista de candidatos enriquecida com dados dos partidos
   */
  @ApiOperation({ summary: 'Listar todos os candidatos', description: 'Retorna uma lista de todos os candidatos com informações detalhadas do partido' })
  @ApiResponse({ status: 200, description: 'Lista de candidatos retornada com sucesso', type: [CandidatoComPartidoDto] })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @Get()
  async listarTodos(): Promise<CandidatoComPartidoDto[]> {
    try {
      const candidatos = await this.candidatoService.listarTodos();
      
      const candidatosEnriquecidos = await Promise.all(
        candidatos.map(async (candidato) => {
          try {
            const partido = await this.partidoService.buscarPorId(candidato.partidoId);
            return {
              ...candidato,
              partido,
            };
          } catch (error) {
            return candidato;
          }
        }),
      );
      
      return candidatosEnriquecidos;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Erro ao listar candidatos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Busca um candidato por ID com informações detalhadas do partido.
   * @param id ID do candidato
   * @returns Candidato enriquecido com dados do partido
   */
  @ApiOperation({ summary: 'Buscar candidato por ID', description: 'Retorna um candidato específico com informações detalhadas do partido' })
  @ApiParam({ name: 'id', description: 'ID do candidato', type: 'number' })
  @ApiResponse({ status: 200, description: 'Candidato encontrado com sucesso', type: CandidatoComPartidoDto })
  @ApiResponse({ status: 404, description: 'Candidato não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @Get(':id')
  async buscarPorId(@Param('id') id: number): Promise<CandidatoComPartidoDto> {
    try {
      const candidato = await this.candidatoService.buscarPorId(id);
      
      try {
        const partido = await this.partidoService.buscarPorId(candidato.partidoId);
        return {
          ...candidato,
          partido,
        };
      } catch (error) {
        return candidato;
      }
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
   * Lista candidatos por partido com informações detalhadas do partido.
   * @param partidoId ID do partido
   * @returns Lista de candidatos do partido enriquecida com dados do partido
   */
  @ApiOperation({ summary: 'Listar candidatos por partido', description: 'Retorna uma lista de candidatos de um partido específico' })
  @ApiParam({ name: 'partidoId', description: 'ID do partido', type: 'number' })
  @ApiResponse({ status: 200, description: 'Lista de candidatos retornada com sucesso', type: [CandidatoComPartidoDto] })
  @ApiResponse({ status: 404, description: 'Partido não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @Get('partido/:partidoId')
  async listarPorPartido(@Param('partidoId') partidoId: number): Promise<CandidatoComPartidoDto[]> {
    try {
      try {
        const partido = await this.partidoService.buscarPorId(partidoId);
        
        const candidatos = await this.candidatoService.listarPorPartido(partidoId);
        
        return candidatos.map((candidato) => ({
          ...candidato,
          partido,
        }));
      } catch (error) {
        if (error instanceof HttpException && error.getStatus() === HttpStatus.NOT_FOUND) {
          throw new HttpException(
            'Partido não encontrado',
            HttpStatus.NOT_FOUND,
          );
        }
        throw error;
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Erro ao listar candidatos por partido',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Cria um novo candidato.
   * @param candidatoDto DTO com os dados do candidato
   * @returns Candidato criado enriquecido com dados do partido
   */
  @ApiOperation({ summary: 'Criar candidato', description: 'Cria um novo candidato' })
  @ApiBody({ type: CandidatoDto, description: 'Dados do candidato a ser criado' })
  @ApiResponse({ status: 201, description: 'Candidato criado com sucesso', type: CandidatoComPartidoDto })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Partido não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @Post()
  async criar(@Body() candidatoDto: CandidatoDto): Promise<CandidatoComPartidoDto> {
    try {
      try {
        await this.partidoService.buscarPorId(candidatoDto.partidoId);
      } catch (error) {
        if (error instanceof HttpException && error.getStatus() === HttpStatus.NOT_FOUND) {
          throw new HttpException(
            'Partido não encontrado',
            HttpStatus.NOT_FOUND,
          );
        }
        throw error;
      }
      
      const candidato = await this.candidatoService.criar(candidatoDto);
      
      try {
        const partido = await this.partidoService.buscarPorId(candidato.partidoId);
        return {
          ...candidato,
          partido,
        };
      } catch (error) {
        return candidato;
      }
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
   * @returns Candidato atualizado enriquecido com dados do partido
   */
  @ApiOperation({ summary: 'Atualizar candidato', description: 'Atualiza um candidato existente' })
  @ApiParam({ name: 'id', description: 'ID do candidato', type: 'number' })
  @ApiBody({ type: CandidatoDto, description: 'Novos dados do candidato' })
  @ApiResponse({ status: 200, description: 'Candidato atualizado com sucesso', type: CandidatoComPartidoDto })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Candidato ou partido não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @Put(':id')
  async atualizar(
    @Param('id') id: number,
    @Body() candidatoDto: CandidatoDto,
  ): Promise<CandidatoComPartidoDto> {
    try {
      try {
        await this.partidoService.buscarPorId(candidatoDto.partidoId);
      } catch (error) {
        if (error instanceof HttpException && error.getStatus() === HttpStatus.NOT_FOUND) {
          throw new HttpException(
            'Partido não encontrado',
            HttpStatus.NOT_FOUND,
          );
        }
        throw error;
      }
      
      const candidato = await this.candidatoService.atualizar(id, candidatoDto);
      
      try {
        const partido = await this.partidoService.buscarPorId(candidato.partidoId);
        return {
          ...candidato,
          partido,
        };
      } catch (error) {
        return candidato;
      }
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
   * @returns Mensagem de sucesso
   */
  @ApiOperation({ summary: 'Remover candidato', description: 'Remove um candidato existente' })
  @ApiParam({ name: 'id', description: 'ID do candidato', type: 'number' })
  @ApiResponse({ status: 200, description: 'Candidato removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Candidato não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @Delete(':id')
  async remover(@Param('id') id: number): Promise<{ message: string }> {
    try {
      await this.candidatoService.remover(id);
      return { message: 'Candidato removido com sucesso' };
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
