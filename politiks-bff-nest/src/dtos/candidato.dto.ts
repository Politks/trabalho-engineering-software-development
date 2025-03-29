import { IsNotEmpty, IsString, IsOptional, IsNumber, MinLength, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PartidoDto } from './partido.dto';

/**
 * DTO para transferência de dados de Candidato.
 * Segue o padrão DTO (Data Transfer Object) para desacoplar a API da camada de domínio.
 */
export class CandidatoDto {
  @ApiPropertyOptional({ description: 'ID do candidato', example: 1 })
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiProperty({ description: 'Nome do candidato', example: 'João Silva', minLength: 2, maxLength: 100 })
  @IsNotEmpty({ message: 'O nome do candidato é obrigatório' })
  @IsString({ message: 'O nome deve ser uma string' })
  @MinLength(2, { message: 'O nome do candidato deve ter pelo menos 2 caracteres' })
  @MaxLength(100, { message: 'O nome do candidato deve ter no máximo 100 caracteres' })
  nome: string;

  @ApiProperty({ description: 'CPF do candidato', example: '123.456.789-00', minLength: 11, maxLength: 14 })
  @IsNotEmpty({ message: 'O CPF do candidato é obrigatório' })
  @IsString({ message: 'O CPF deve ser uma string' })
  @MinLength(11, { message: 'O CPF deve ter pelo menos 11 caracteres' })
  @MaxLength(14, { message: 'O CPF deve ter no máximo 14 caracteres' })
  cpf: string;

  @ApiPropertyOptional({ description: 'Data de nascimento do candidato', example: '1980-01-01' })
  @IsOptional()
  @IsString({ message: 'A data de nascimento deve ser uma string' })
  dataNascimento?: string;

  @ApiPropertyOptional({ description: 'Biografia do candidato', example: 'Político com experiência em...' })
  @IsOptional()
  @IsString({ message: 'A biografia deve ser uma string' })
  biografia?: string;

  @ApiPropertyOptional({ description: 'Cargo pleiteado pelo candidato', example: 'Vereador' })
  @IsOptional()
  @IsString({ message: 'O cargo pleiteado deve ser uma string' })
  cargoPleiteado?: string;

  @ApiProperty({ description: 'ID do partido ao qual o candidato pertence', example: 1 })
  @IsNotEmpty({ message: 'O ID do partido é obrigatório' })
  @IsNumber({}, { message: 'O ID do partido deve ser um número' })
  partidoId: number;

  @ApiPropertyOptional({ description: 'Nome do partido', example: 'Partido Exemplo' })
  @IsOptional()
  @IsString({ message: 'O nome do partido deve ser uma string' })
  partidoNome?: string;

  @ApiPropertyOptional({ description: 'Sigla do partido', example: 'PEX' })
  @IsOptional()
  @IsString({ message: 'A sigla do partido deve ser uma string' })
  partidoSigla?: string;
}

/**
 * DTO para resposta de Candidato com dados completos do partido.
 * Estende o DTO básico de Candidato.
 */
export class CandidatoComPartidoDto extends CandidatoDto {
  @ApiPropertyOptional({ 
    description: 'Dados completos do partido',
    type: PartidoDto
  })
  partido?: PartidoDto;
}
