"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidatoComPartidoDto = exports.CandidatoDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const partido_dto_1 = require("./partido.dto");
class CandidatoDto {
}
exports.CandidatoDto = CandidatoDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID do candidato', example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CandidatoDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nome do candidato', example: 'João Silva', minLength: 2, maxLength: 100 }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O nome do candidato é obrigatório' }),
    (0, class_validator_1.IsString)({ message: 'O nome deve ser uma string' }),
    (0, class_validator_1.MinLength)(2, { message: 'O nome do candidato deve ter pelo menos 2 caracteres' }),
    (0, class_validator_1.MaxLength)(100, { message: 'O nome do candidato deve ter no máximo 100 caracteres' }),
    __metadata("design:type", String)
], CandidatoDto.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'CPF do candidato', example: '123.456.789-00', minLength: 11, maxLength: 14 }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O CPF do candidato é obrigatório' }),
    (0, class_validator_1.IsString)({ message: 'O CPF deve ser uma string' }),
    (0, class_validator_1.MinLength)(11, { message: 'O CPF deve ter pelo menos 11 caracteres' }),
    (0, class_validator_1.MaxLength)(14, { message: 'O CPF deve ter no máximo 14 caracteres' }),
    __metadata("design:type", String)
], CandidatoDto.prototype, "cpf", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Data de nascimento do candidato', example: '1980-01-01' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'A data de nascimento deve ser uma string' }),
    __metadata("design:type", String)
], CandidatoDto.prototype, "dataNascimento", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Biografia do candidato', example: 'Político com experiência em...' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'A biografia deve ser uma string' }),
    __metadata("design:type", String)
], CandidatoDto.prototype, "biografia", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Cargo pleiteado pelo candidato', example: 'Vereador' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'O cargo pleiteado deve ser uma string' }),
    __metadata("design:type", String)
], CandidatoDto.prototype, "cargoPleiteado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID do partido ao qual o candidato pertence', example: 1 }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O ID do partido é obrigatório' }),
    (0, class_validator_1.IsNumber)({}, { message: 'O ID do partido deve ser um número' }),
    __metadata("design:type", Number)
], CandidatoDto.prototype, "partidoId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Nome do partido', example: 'Partido Exemplo' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'O nome do partido deve ser uma string' }),
    __metadata("design:type", String)
], CandidatoDto.prototype, "partidoNome", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Sigla do partido', example: 'PEX' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'A sigla do partido deve ser uma string' }),
    __metadata("design:type", String)
], CandidatoDto.prototype, "partidoSigla", void 0);
class CandidatoComPartidoDto extends CandidatoDto {
}
exports.CandidatoComPartidoDto = CandidatoComPartidoDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Dados completos do partido',
        type: partido_dto_1.PartidoDto
    }),
    __metadata("design:type", partido_dto_1.PartidoDto)
], CandidatoComPartidoDto.prototype, "partido", void 0);
//# sourceMappingURL=candidato.dto.js.map