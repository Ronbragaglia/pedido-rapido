<div align="center">

# 🛵 PedidoRapido

[![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://postgresql.org)
[![Socket.io](https://img.shields.io/badge/Socket.io-Realtime-010101?style=flat-square&logo=socket.io&logoColor=white)](https://socket.io)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker&logoColor=white)](https://docker.com)
[![License](https://img.shields.io/badge/License-CC%20BY--NC%204.0-red?style=flat-square)](LICENSE)

**Plataforma completa de pedidos delivery com rastreamento em tempo real**

</div>

---

## 📖 Sobre

PedidoRapido e uma plataforma de delivery que conecta clientes, restaurantes e entregadores. Faca pedidos, acompanhe em tempo real via WebSocket e gerencie entregas.

## 🏗️ Arquitetura

```mermaid
graph TB
    subgraph Frontend
        R[React 18 + Vite]
        S[Socket.io Client]
    end
    subgraph Backend
        E[Express.js]
        IO[Socket.io Server]
        P[Prisma ORM]
    end
    subgraph Data
        PG[(PostgreSQL 16)]
        RD[(Redis 7)]
    end
    R --> E
    S --> IO
    E --> P --> PG
    IO --> RD
```

## 📡 WebSocket Events

| Evento | Direcao | Descricao |
|--------|---------|-----------|
| `order:new` | Server -> Client | Novo pedido recebido |
| `order:status` | Server -> Client | Status do pedido atualizado |
| `driver:location` | Server -> Client | Localizacao do entregador |

## 📡 API Endpoints

| Metodo | Rota | Descricao | Auth |
|--------|------|-----------|------|
| POST | `/api/auth/register` | Criar conta (com role) | - |
| POST | `/api/auth/login` | Login | - |
| GET | `/api/auth/me` | Perfil | ✅ |
| GET | `/api/restaurants` | Listar restaurantes | - |
| GET | `/api/restaurants/:id` | Detalhes + cardapio | - |
| POST | `/api/restaurants/:id/menu` | Criar item do cardapio | ✅ RESTAURANT |
| POST | `/api/orders` | Criar pedido | ✅ |
| GET | `/api/orders` | Listar pedidos | ✅ |
| PUT | `/api/orders/:id/status` | Atualizar status | ✅ |
| GET | `/api/orders/:id/track` | Rastrear pedido | ✅ |
| GET | `/api/driver/available` | Entregas disponiveis | ✅ DRIVER |
| POST | `/api/driver/accept/:id` | Aceitar entrega | ✅ DRIVER |
| PUT | `/api/driver/complete/:id` | Concluir entrega | ✅ DRIVER |

## 🚀 Rodando com Docker

```bash
docker compose up -d
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:4000

## 📄 Licenca

[CC BY-NC 4.0](LICENSE) — Rone Bragaglia — Uso comercial proibido sem autorizacao
