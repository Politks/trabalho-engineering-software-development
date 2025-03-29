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
exports.CandidatoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const candidato_service_1 = require("../services/candidato.service");
const partido_service_1 = require("../services/partido.service");
const candidato_dto_1 = require("../dtos/candidato.dto");
let CandidatoController = class CandidatoController {
    constructor(candidatoService, partidoService) {
        this.candidatoService = candidatoService;
        this.partidoService = partidoService;
    }
    async listarTodos() {
        try {
            const candidatos = await this.candidatoService.listarTodos();
            const candidatosEnriquecidos = await Promise.all(candidatos.map(async (candidato) => {
                try {
                    const partido = await this.partidoService.buscarPorId(candidato.partidoId);
                    return Object.assign(Object.assign({}, candidato), { partido });
                }
                catch (error) {
                    return candidato;
                }
            }));
            return candidatosEnriquecidos;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Erro ao listar candidatos', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async buscarPorId(id) {
        try {
            const candidato = await this.candidatoService.buscarPorId(id);
            try {
                const partido = await this.partidoService.buscarPorId(candidato.partidoId);
                return Object.assign(Object.assign({}, candidato), { partido });
            }
            catch (error) {
                return candidato;
            }
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Erro ao buscar candidato', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async listarPorPartido(partidoId) {
        try {
            try {
                const partido = await this.partidoService.buscarPorId(partidoId);
                const candidatos = await this.candidatoService.listarPorPartido(partidoId);
                return candidatos.map((candidato) => (Object.assign(Object.assign({}, candidato), { partido })));
            }
            catch (error) {
                if (error instanceof common_1.HttpException && error.getStatus() === common_1.HttpStatus.NOT_FOUND) {
                    throw new common_1.HttpException('Partido não encontrado', common_1.HttpStatus.NOT_FOUND);
                }
                throw error;
            }
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Erro ao listar candidatos por partido', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async criar(candidatoDto) {
        try {
            try {
                await this.partidoService.buscarPorId(candidatoDto.partidoId);
            }
            catch (error) {
                if (error instanceof common_1.HttpException && error.getStatus() === common_1.HttpStatus.NOT_FOUND) {
                    throw new common_1.HttpException('Partido não encontrado', common_1.HttpStatus.NOT_FOUND);
                }
                throw error;
            }
            const candidato = await this.candidatoService.criar(candidatoDto);
            try {
                const partido = await this.partidoService.buscarPorId(candidato.partidoId);
                return Object.assign(Object.assign({}, candidato), { partido });
            }
            catch (error) {
                return candidato;
            }
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Erro ao criar candidato', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async atualizar(id, candidatoDto) {
        try {
            try {
                await this.partidoService.buscarPorId(candidatoDto.partidoId);
            }
            catch (error) {
                if (error instanceof common_1.HttpException && error.getStatus() === common_1.HttpStatus.NOT_FOUND) {
                    throw new common_1.HttpException('Partido não encontrado', common_1.HttpStatus.NOT_FOUND);
                }
                throw error;
            }
            const candidato = await this.candidatoService.atualizar(id, candidatoDto);
            try {
                const partido = await this.partidoService.buscarPorId(candidato.partidoId);
                return Object.assign(Object.assign({}, candidato), { partido });
            }
            catch (error) {
                return candidato;
            }
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Erro ao atualizar candidato', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remover(id) {
        try {
            await this.candidatoService.remover(id);
            return { message: 'Candidato removido com sucesso' };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Erro ao remover candidato', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.CandidatoController = CandidatoController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos os candidatos', description: 'Retorna uma lista de todos os candidatos com informações detalhadas do partido' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de candidatos retornada com sucesso', type: [candidato_dto_1.CandidatoComPartidoDto] }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Erro interno do servidor' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CandidatoController.prototype, "listarTodos", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Buscar candidato por ID', description: 'Retorna um candidato específico com informações detalhadas do partido' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID do candidato', type: 'number' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Candidato encontrado com sucesso', type: candidato_dto_1.CandidatoComPartidoDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Candidato não encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Erro interno do servidor' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CandidatoController.prototype, "buscarPorId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Listar candidatos por partido', description: 'Retorna uma lista de candidatos de um partido específico' }),
    (0, swagger_1.ApiParam)({ name: 'partidoId', description: 'ID do partido', type: 'number' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de candidatos retornada com sucesso', type: [candidato_dto_1.CandidatoComPartidoDto] }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Partido não encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Erro interno do servidor' }),
    (0, common_1.Get)('partido/:partidoId'),
    __param(0, (0, common_1.Param)('partidoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CandidatoController.prototype, "listarPorPartido", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Criar candidato', description: 'Cria um novo candidato' }),
    (0, swagger_1.ApiBody)({ type: candidato_dto_1.CandidatoDto, description: 'Dados do candidato a ser criado' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Candidato criado com sucesso', type: candidato_dto_1.CandidatoComPartidoDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dados inválidos' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Partido não encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Erro interno do servidor' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [candidato_dto_1.CandidatoDto]),
    __metadata("design:returntype", Promise)
], CandidatoController.prototype, "criar", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar candidato', description: 'Atualiza um candidato existente' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID do candidato', type: 'number' }),
    (0, swagger_1.ApiBody)({ type: candidato_dto_1.CandidatoDto, description: 'Novos dados do candidato' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Candidato atualizado com sucesso', type: candidato_dto_1.CandidatoComPartidoDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dados inválidos' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Candidato ou partido não encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Erro interno do servidor' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, candidato_dto_1.CandidatoDto]),
    __metadata("design:returntype", Promise)
], CandidatoController.prototype, "atualizar", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Remover candidato', description: 'Remove um candidato existente' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID do candidato', type: 'number' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Candidato removido com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Candidato não encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Erro interno do servidor' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CandidatoController.prototype, "remover", null);
exports.CandidatoController = CandidatoController = __decorate([
    (0, swagger_1.ApiTags)('candidatos'),
    (0, common_1.Controller)('candidatos'),
    __metadata("design:paramtypes", [candidato_service_1.CandidatoService,
        partido_service_1.PartidoService])
], CandidatoController);
//# sourceMappingURL=candidato.controller.js.map