import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CandidatoController } from './controllers/candidato.controller';
import { PartidoController } from './controllers/partido.controller';
import { CandidatoService } from './services/candidato.service';
import { PartidoService } from './services/partido.service';

/**
 * Módulo principal da aplicação.
 * Segue o princípio de Inversão de Dependência (DIP) do SOLID.
 */
@Module({
  imports: [
    HttpModule,
  ],
  controllers: [CandidatoController, PartidoController],
  providers: [CandidatoService, PartidoService],
})
export class AppModule {}
