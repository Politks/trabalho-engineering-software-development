#!/bin/bash
set -e

# Script para criar os bancos de dados e seus usuários
# Este script será executado pelo PostgreSQL na inicialização

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  -- Criar usuário partidos
  CREATE USER partidos WITH PASSWORD 'partidos';
  
  -- Criar banco de dados partidos
  CREATE DATABASE partidos;
  
  -- Conceder privilégios
  GRANT ALL PRIVILEGES ON DATABASE partidos TO partidos;
  ALTER DATABASE partidos OWNER TO partidos;
  
  -- Criar usuário candidatos
  CREATE USER candidatos WITH PASSWORD 'candidatos';
  
  -- Criar banco de dados candidatos
  CREATE DATABASE candidatos;
  
  -- Conceder privilégios
  GRANT ALL PRIVILEGES ON DATABASE candidatos TO candidatos;
  ALTER DATABASE candidatos OWNER TO candidatos;
EOSQL

# Conectar ao banco de dados partidos para conceder permissões no schema public
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "partidos" <<-EOSQL
  GRANT ALL ON SCHEMA public TO partidos;
  ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO partidos;
  ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO partidos;
  ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO partidos;
EOSQL

# Conectar ao banco de dados candidatos para conceder permissões no schema public
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "candidatos" <<-EOSQL
  GRANT ALL ON SCHEMA public TO candidatos;
  ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO candidatos;
  ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO candidatos;
  ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO candidatos;
EOSQL
