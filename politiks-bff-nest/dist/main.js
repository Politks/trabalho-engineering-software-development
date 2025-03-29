"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
    }));
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Politiks BFF API')
        .setDescription('API do Backend for Frontend (BFF) para o sistema Politiks')
        .setVersion('1.0')
        .addTag('candidatos', 'Operações relacionadas a candidatos')
        .addTag('partidos', 'Operações relacionadas a partidos')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(3000);
    console.log(`Aplicação rodando na porta 3000`);
    console.log(`Documentação Swagger disponível em: http://localhost:3000/api`);
}
bootstrap();
//# sourceMappingURL=main.js.map