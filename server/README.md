# Server

Este diretório contém o backend do projeto Link Shortner.

## Como Executar

1. Instale as dependências:
   ```bash
   pnpm install
   ```
2. Configure as variáveis de ambiente no arquivo `.env` (veja o exemplo em `.env.example`).
3. Suba o docker
   ```bash
   docker compose up -d
   ```
4. Crie o banco de dados
   ```bash
   pnpm run db:migrate
   ```
3. Inicie o servidor:
   ```bash
   pnpm run dev
   ```
