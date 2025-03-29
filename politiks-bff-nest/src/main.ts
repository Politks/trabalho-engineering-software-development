import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuração global de pipes para validação de DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));
  
  // Configuração de CORS
  app.enableCors({
    origin: '*', // Em produção, especificar origens permitidas
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Politiks BFF API')
    .setDescription('API do Backend for Frontend (BFF) para o sistema Politiks')
    .setVersion('1.0')
    .addTag('candidatos', 'Operações relacionadas a candidatos')
    .addTag('partidos', 'Operações relacionadas a partidos')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
  console.log(`Aplicação rodando na porta 3000`);
  console.log(`Documentação Swagger disponível em: http://localhost:3000/api`);
}

bootstrap();
