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
exports.CandidatoService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let CandidatoService = class CandidatoService {
    constructor(httpService) {
        this.httpService = httpService;
        this.apiUrl = process.env.CANDIDATOS_API_URL || 'http://localhost:8081/api/candidatos';
    }
    async listarTodos() {
        try {
            const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(this.apiUrl).pipe((0, rxjs_1.catchError)((error) => {
                throw new common_1.HttpException(`Erro ao buscar candidatos: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            })));
            return data;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Erro ao buscar candidatos', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async buscarPorId(id) {
        try {
            const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.apiUrl}/${id}`).pipe((0, rxjs_1.catchError)((error) => {
                var _a;
                if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 404) {
                    throw new common_1.HttpException(`Candidato com ID ${id} não encontrado`, common_1.HttpStatus.NOT_FOUND);
                }
                throw new common_1.HttpException(`Erro ao buscar candidato: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            })));
            return data;
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
            const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.apiUrl}/partido/${partidoId}`).pipe((0, rxjs_1.catchError)((error) => {
                var _a;
                if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 404) {
                    throw new common_1.HttpException(`Partido com ID ${partidoId} não encontrado`, common_1.HttpStatus.NOT_FOUND);
                }
                throw new common_1.HttpException(`Erro ao buscar candidatos do partido: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            })));
            return data;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Erro ao buscar candidatos do partido', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async criar(candidatoDto) {
        try {
            const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.post(this.apiUrl, candidatoDto).pipe((0, rxjs_1.catchError)((error) => {
                var _a, _b;
                if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 400) {
                    throw new common_1.HttpException('Dados inválidos para criar candidato', common_1.HttpStatus.BAD_REQUEST);
                }
                if (((_b = error.response) === null || _b === void 0 ? void 0 : _b.status) === 404) {
                    throw new common_1.HttpException('Partido não encontrado', common_1.HttpStatus.NOT_FOUND);
                }
                throw new common_1.HttpException(`Erro ao criar candidato: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            })));
            return data;
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
            const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.put(`${this.apiUrl}/${id}`, candidatoDto).pipe((0, rxjs_1.catchError)((error) => {
                var _a, _b;
                if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 404) {
                    throw new common_1.HttpException(`Candidato com ID ${id} não encontrado ou partido não encontrado`, common_1.HttpStatus.NOT_FOUND);
                }
                if (((_b = error.response) === null || _b === void 0 ? void 0 : _b.status) === 400) {
                    throw new common_1.HttpException('Dados inválidos para atualizar candidato', common_1.HttpStatus.BAD_REQUEST);
                }
                throw new common_1.HttpException(`Erro ao atualizar candidato: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            })));
            return data;
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
            await (0, rxjs_1.firstValueFrom)(this.httpService.delete(`${this.apiUrl}/${id}`).pipe((0, rxjs_1.catchError)((error) => {
                var _a;
                if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 404) {
                    throw new common_1.HttpException(`Candidato com ID ${id} não encontrado`, common_1.HttpStatus.NOT_FOUND);
                }
                throw new common_1.HttpException(`Erro ao remover candidato: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            })));
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Erro ao remover candidato', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.CandidatoService = CandidatoService;
exports.CandidatoService = CandidatoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], CandidatoService);
//# sourceMappingURL=candidato.service.js.map