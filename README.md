# 📌 Task Manager Fullstack
## Full Stack System

Gerenciador de tarefas fullstack desenvolvido com **Laravel (PHP)** no backend e **Next.js (React)** no frontend.  
Permite criar usuários, associar tarefas, marcar como concluídas e gerenciar tudo em uma interface simples.

---

## Funcionalidades

### Usuários
- Criar novos usuários
- Listar todos os usuários
- Excluir usuários

### Tarefas
- Criar tarefas vinculadas a um usuário
- Listar todas as tarefas com o nome do usuário
- Excluir tarefas
- Atualizar status (marcar como concluída)

---

## Estrutura do Projeto

task-manager-fullstack/
├── backend/ # Código do servidor Laravel + SQLite  
├── frontend/ # Aplicação React/Next.js  
└── README.md # Documentação  


---

## Tecnologias Utilizadas

### Backend
- PHP 8.x
- [Laravel 11.x](https://laravel.com/)
- SQLite (banco de dados)

### Frontend
- [Next.js 14](https://nextjs.org/)
- React
- Context API
- Axios

### Outros
- Node.js (v18+ recomendado)
- NPM ou Yarn

---

## Rotas da API (principais)

### Usuários
- `GET /api/users` → Listar usuários
- `POST /api/users` → Criar usuário
- `DELETE /api/users/{id}` → Excluir usuário

### Tarefas
- `POST /api/users/{id}/tasks` → Criar tarefa para um usuário
- `GET /api/tasks` → Listar todas as tarefas
- `DELETE /api/tasks/{id}` → Excluir tarefa
- `PUT /api/tasks/{id}/status` → Atualizar status da tarefa

### Teste
- `GET /api/ping` → Retorna `"pong"` (verificação rápida do backend)

---

## Instalação e Execução (Manual)

### 1. Clonar o repositório
```bash
git clone https://github.com/AndUrban/task-manager-fullstack.git
cd task-manager-fullstack
```

### 2. Configurar o Backend (Laravel)
```bash
cd backend
```
Instalar dependências
```bash
composer install
```

Criar arquivo de ambiente
```bash
cp .env.example .env
```

Gerar chave da aplicação
```bash
php artisan key:generate
```

Rodar as migrations
```bash
php artisan migrate
```

Iniciar servidor backend
```bash
php artisan serve
```

📍 O backend estará disponível em:
http://localhost:8000/api

### 3. Configurar o Frontend (Next.js)
```bash
cd ../frontend
```

Instalar dependências
```bash
npm install
```

Iniciar servidor frontend
```bash
npm run dev
```

📍 O frontend estará disponível em:
http://localhost:3000