import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { PartidoService } from '../services/partido.service';
import { PartidoDto } from '../dtos/partido.dto';
import { Partido } from '../interfaces/partido.interface';

/**
 * Controlador para operações com partidos.
 * Implementa o padrão Controller do MVC e o princípio de Responsabilidade Única (SRP) do SOLID.
 */
@ApiTags('partidos')
@Controller('partidos')
export class PartidoController {
  constructor(private readonly partidoService: PartidoService) {}

  /**
   * Lista todos os partidos.
   * @returns Lista de partidos
   */
  @ApiOperation({ summary: 'Listar todos os partidos', description: 'Retorna uma lista de todos os partidos' })
  @ApiResponse({ status: 200, description: 'Lista de partidos retornada com sucesso', type: [PartidoDto] })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @Get()
  async listarTodos(): Promise<Partido[]> {
    try {
      return await this.partidoService.listarTodos();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Erro ao listar partidos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Busca um partido por ID.
   * @param id ID do partido
   * @returns Partido encontrado
   */
  @ApiOperation({ summary: 'Buscar partido por ID', description: 'Retorna um partido específico' })
  @ApiParam({ name: 'id', description: 'ID do partido', type: 'number' })
  @ApiResponse({ status: 200, description: 'Partido encontrado com sucesso', type: PartidoDto })
  @ApiResponse({ status: 404, description: 'Partido não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @Get(':id')
  async buscarPorId(@Param('id') id: number): Promise<Partido> {
    try {
      return await this.partidoService.buscarPorId(id);
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
   * @returns Partido criado
   */
  @ApiOperation({ summary: 'Criar partido', description: 'Cria um novo partido' })
  @ApiBody({ type: PartidoDto, description: 'Dados do partido a ser criado' })
  @ApiResponse({ status: 201, description: 'Partido criado com sucesso', type: PartidoDto })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @Post()
  async criar(@Body() partidoDto: PartidoDto): Promise<Partido> {
    try {
      return await this.partidoService.criar(partidoDto);
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
   * @returns Partido atualizado
   */
  @ApiOperation({ summary: 'Atualizar partido', description: 'Atualiza um partido existente' })
  @ApiParam({ name: 'id', description: 'ID do partido', type: 'number' })
  @ApiBody({ type: PartidoDto, description: 'Novos dados do partido' })
  @ApiResponse({ status: 200, description: 'Partido atualizado com sucesso', type: PartidoDto })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Partido não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @Put(':id')
  async atualizar(
    @Param('id') id: number,
    @Body() partidoDto: PartidoDto,
  ): Promise<Partido> {
    try {
      return await this.partidoService.atualizar(id, partidoDto);
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
   * @returns Mensagem de sucesso
   */
  @ApiOperation({ summary: 'Remover partido', description: 'Remove um partido existente' })
  @ApiParam({ name: 'id', description: 'ID do partido', type: 'number' })
  @ApiResponse({ status: 200, description: 'Partido removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Partido não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @Delete(':id')
  async remover(@Param('id') id: number): Promise<{ message: string }> {
    try {
      await this.partidoService.remover(id);
      return { message: 'Partido removido com sucesso' };
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
