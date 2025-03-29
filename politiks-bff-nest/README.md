# Politiks BFF com NestJS

Backend for Frontend (BFF) para o sistema Politiks, implementado com NestJS e TypeScript.

## Descrição

Este BFF (Backend for Frontend) serve como uma camada intermediária entre o frontend e as APIs de backend do sistema Politiks. Ele é responsável por:

1. Agregar dados de múltiplas APIs (politiks-api e partidos-api)
2. Transformar e enriquecer os dados para atender às necessidades específicas do frontend
3. Simplificar a interface de comunicação para o cliente

## Arquitetura

O projeto segue os princípios SOLID e utiliza os seguintes padrões de design:

- **Padrão Facade**: Simplifica a interface com as APIs subjacentes
- **Padrão DTO (Data Transfer Object)**: Desacopla a API da camada de domínio
- **Injeção de Dependência**: Facilita o teste e a manutenção do código
- **Princípio de Responsabilidade Única (SRP)**: Cada classe tem uma única responsabilidade

## Estrutura do Projeto

```
src/
├── controllers/        # Controladores da aplicação
├── services/           # Serviços para comunicação com as APIs
├── dtos/               # Data Transfer Objects
├── interfaces/         # Interfaces que definem a estrutura dos dados
├── app.module.ts       # Módulo principal da aplicação
└── main.ts             # Ponto de entrada da aplicação
```

## Tecnologias Utilizadas

- **NestJS**: Framework para construção de aplicações server-side eficientes e escaláveis
- **TypeScript**: Superset tipado de JavaScript
- **Axios**: Cliente HTTP para comunicação com as APIs
- **class-validator**: Validação de DTOs
- **class-transformer**: Transformação de objetos

## Endpoints

### Candidatos

- `GET /candidatos`: Lista todos os candidatos com informações detalhadas do partido
- `GET /candidatos/:id`: Busca um candidato por ID com informações detalhadas do partido
- `GET /candidatos/partido/:partidoId`: Lista candidatos por partido com informações detalhadas do partido
- `POST /candidatos`: Cria um novo candidato
- `PUT /candidatos/:id`: Atualiza um candidato existente
- `DELETE /candidatos/:id`: Remove um candidato

### Partidos

- `GET /partidos`: Lista todos os partidos
- `GET /partidos/:id`: Busca um partido por ID
- `POST /partidos`: Cria um novo partido
- `PUT /partidos/:id`: Atualiza um partido existente
- `DELETE /partidos/:id`: Remove um partido

## Como Executar

1. Instale as dependências:
```bash
npm install
```

2. Inicie a aplicação em modo de desenvolvimento:
```bash
npm run start:dev
```

3. A aplicação estará disponível em `http://localhost:3000`

## Configuração

As URLs das APIs são configuradas nos serviços:

- politiks-api: `http://localhost:8080/api`
- partidos-api: `http://localhost:8081/api`

## Boas Práticas Implementadas

- **Clean Code**: Código limpo e legível
- **SOLID**: Princípios de design orientado a objetos
- **DRY (Don't Repeat Yourself)**: Evita duplicação de código
- **YAGNI (You Aren't Gonna Need It)**: Implementa apenas o necessário
- **Tratamento de Erros**: Tratamento adequado de exceções
- **Validação de Dados**: Validação de entrada com class-validator
- **Documentação**: Código bem documentado com comentários JSDoc
