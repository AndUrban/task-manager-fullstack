<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Task;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Criar alguns usuários aleatórios
        $users = User::factory()->count(3)->create();

        // Criar um usuário fixo para referência na demo
        $demoUser = User::factory()->create([
            'name' => 'Demo User',
            'email' => 'demo@example.com',
        ]);

        // Criar tarefas para cada usuário aleatório
        foreach ($users as $user) {
            Task::factory()->count(3)->create([
                'user_id' => $user->id,
                'estado' => 'pendente',
            ]);
        }

        // Criar tarefas específicas para o usuário demo
        Task::factory()->create([
            'descricao' => 'Tarefa concluída de exemplo',
            'estado' => 'feito',
            'user_id' => $demoUser->id,
        ]);

        Task::factory()->create([
            'descricao' => 'Outra tarefa pendente de exemplo',
            'estado' => 'pendente',
            'user_id' => $demoUser->id,
        ]);
    }
}
