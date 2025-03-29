-- Criação do banco de dados politiks e seu usuário
CREATE USER politiks WITH PASSWORD 'politiks';
CREATE DATABASE politiks;
GRANT ALL PRIVILEGES ON DATABASE politiks TO politiks;
ALTER DATABASE politiks OWNER TO politiks;

-- Criação do banco de dados partidos e seu usuário
CREATE USER partidos WITH PASSWORD 'partidos';
CREATE DATABASE partidos;
GRANT ALL PRIVILEGES ON DATABASE partidos TO partidos;
GRANT ALL PRIVILEGES ON DATABASE partidos TO partidos;
