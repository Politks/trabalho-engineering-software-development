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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartidoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const partido_service_1 = require("../services/partido.service");
const partido_dto_1 = require("../dtos/partido.dto");
let PartidoController = class PartidoController {
    constructor(partidoService) {
        this.partidoService = partidoService;
    }
    async listarTodos() {
        try {
            return await this.partidoService.listarTodos();
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Erro ao listar partidos', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async buscarPorId(id) {
        try {
            return await this.partidoService.buscarPorId(id);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Erro ao buscar partido', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async criar(partidoDto) {
        try {
            return await this.partidoService.criar(partidoDto);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Erro ao criar partido', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async atualizar(id, partidoDto) {
        try {
            return await this.partidoService.atualizar(id, partidoDto);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Erro ao atualizar partido', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remover(id) {
        try {
            await this.partidoService.remover(id);
            return { message: 'Partido removido com sucesso' };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Erro ao remover partido', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.PartidoController = PartidoController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos os partidos', description: 'Retorna uma lista de todos os partidos' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de partidos retornada com sucesso', type: [partido_dto_1.PartidoDto] }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Erro interno do servidor' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PartidoController.prototype, "listarTodos", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Buscar partido por ID', description: 'Retorna um partido específico' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID do partido', type: 'number' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Partido encontrado com sucesso', type: partido_dto_1.PartidoDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Partido não encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Erro interno do servidor' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PartidoController.prototype, "buscarPorId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Criar partido', description: 'Cria um novo partido' }),
    (0, swagger_1.ApiBody)({ type: partido_dto_1.PartidoDto, description: 'Dados do partido a ser criado' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Partido criado com sucesso', type: partido_dto_1.PartidoDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dados inválidos' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Erro interno do servidor' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [partido_dto_1.PartidoDto]),
    __metadata("design:returntype", Promise)
], PartidoController.prototype, "criar", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar partido', description: 'Atualiza um partido existente' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID do partido', type: 'number' }),
    (0, swagger_1.ApiBody)({ type: partido_dto_1.PartidoDto, description: 'Novos dados do partido' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Partido atualizado com sucesso', type: partido_dto_1.PartidoDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dados inválidos' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Partido não encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Erro interno do servidor' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, partido_dto_1.PartidoDto]),
    __metadata("design:returntype", Promise)
], PartidoController.prototype, "atualizar", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Remover partido', description: 'Remove um partido existente' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID do partido', type: 'number' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Partido removido com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Partido não encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Erro interno do servidor' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PartidoController.prototype, "remover", null);
exports.PartidoController = PartidoController = __decorate([
    (0, swagger_1.ApiTags)('partidos'),
    (0, common_1.Controller)('partidos'),
    __metadata("design:paramtypes", [partido_service_1.PartidoService])
], PartidoController);
//# sourceMappingURL=partido.controller.js.map