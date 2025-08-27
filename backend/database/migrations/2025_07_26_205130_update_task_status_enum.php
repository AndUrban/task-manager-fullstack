<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Cria nova tabela com o enum corrigido
        DB::statement("CREATE TABLE IF NOT EXISTS tasks_new (
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            user_id INTEGER NOT NULL,
            descricao TEXT,
            status VARCHAR CHECK (status IN ('pendente', 'feito')) NOT NULL DEFAULT 'pendente',
            created_at DATETIME,
            updated_at DATETIME,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )");

        // Copia os dados da tabela antiga
        DB::statement("INSERT INTO tasks_new (id, user_id, descricao, status, created_at, updated_at)
                       SELECT id, user_id, descricao, status, created_at, updated_at FROM tasks");

        // Substitui a tabela antiga
        DB::statement("DROP TABLE tasks");
        DB::statement("ALTER TABLE tasks_new RENAME TO tasks");
    }

    public function down(): void
    {
        // (Opcional) Reverter para o enum original
        DB::statement("CREATE TABLE IF NOT EXISTS tasks_old (
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            user_id INTEGER NOT NULL,
            descricao TEXT,
            status VARCHAR CHECK (status IN ('pendente', 'execucao', 'finalizada')) NOT NULL DEFAULT 'pendente',
            created_at DATETIME,
            updated_at DATETIME,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )");

        DB::statement("INSERT INTO tasks_old (id, user_id, descricao, status, created_at, updated_at)
                       SELECT id, user_id, descricao, status, created_at, updated_at FROM tasks");

        DB::statement("DROP TABLE tasks");
        DB::statement("ALTER TABLE tasks_old RENAME TO tasks");
    }
};
