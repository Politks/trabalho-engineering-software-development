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
exports.PartidoDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class PartidoDto {
}
exports.PartidoDto = PartidoDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID do partido', example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PartidoDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nome do partido', example: 'Partido Exemplo', minLength: 2, maxLength: 100 }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O nome do partido é obrigatório' }),
    (0, class_validator_1.IsString)({ message: 'O nome deve ser uma string' }),
    (0, class_validator_1.MinLength)(2, { message: 'O nome do partido deve ter pelo menos 2 caracteres' }),
    (0, class_validator_1.MaxLength)(100, { message: 'O nome do partido deve ter no máximo 100 caracteres' }),
    __metadata("design:type", String)
], PartidoDto.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Sigla do partido', example: 'PEX', minLength: 2, maxLength: 20 }),
    (0, class_validator_1.IsNotEmpty)({ message: 'A sigla do partido é obrigatória' }),
    (0, class_validator_1.IsString)({ message: 'A sigla deve ser uma string' }),
    (0, class_validator_1.MinLength)(2, { message: 'A sigla do partido deve ter pelo menos 2 caracteres' }),
    (0, class_validator_1.MaxLength)(20, { message: 'A sigla do partido deve ter no máximo 20 caracteres' }),
    __metadata("design:type", String)
], PartidoDto.prototype, "sigla", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Descrição do partido', example: 'Partido fundado em...' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'A descrição deve ser uma string' }),
    __metadata("design:type", String)
], PartidoDto.prototype, "descricao", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Data de fundação do partido', example: '1980-01-01' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'A data de fundação deve ser uma string' }),
    __metadata("design:type", String)
], PartidoDto.prototype, "dataFundacao", void 0);
//# sourceMappingURL=partido.dto.js.map