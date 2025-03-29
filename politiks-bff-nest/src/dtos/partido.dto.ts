import { IsNotEmpty, IsString, IsOptional, IsNumber, MinLength, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO para transferência de dados de Partido.
 * Segue o padrão DTO (Data Transfer Object) para desacoplar a API da camada de domínio.
 */
export class PartidoDto {
  @ApiPropertyOptional({ description: 'ID do partido', example: 1 })
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiProperty({ description: 'Nome do partido', example: 'Partido Exemplo', minLength: 2, maxLength: 100 })
  @IsNotEmpty({ message: 'O nome do partido é obrigatório' })
  @IsString({ message: 'O nome deve ser uma string' })
  @MinLength(2, { message: 'O nome do partido deve ter pelo menos 2 caracteres' })
  @MaxLength(100, { message: 'O nome do partido deve ter no máximo 100 caracteres' })
  nome: string;

  @ApiProperty({ description: 'Sigla do partido', example: 'PEX', minLength: 2, maxLength: 20 })
  @IsNotEmpty({ message: 'A sigla do partido é obrigatória' })
  @IsString({ message: 'A sigla deve ser uma string' })
  @MinLength(2, { message: 'A sigla do partido deve ter pelo menos 2 caracteres' })
  @MaxLength(20, { message: 'A sigla do partido deve ter no máximo 20 caracteres' })
  sigla: string;

  @ApiPropertyOptional({ description: 'Descrição do partido', example: 'Partido fundado em...' })
  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string' })
  descricao?: string;

  @ApiPropertyOptional({ description: 'Data de fundação do partido', example: '1980-01-01' })
  @IsOptional()
  @IsString({ message: 'A data de fundação deve ser uma string' })
  dataFundacao?: string;
}
