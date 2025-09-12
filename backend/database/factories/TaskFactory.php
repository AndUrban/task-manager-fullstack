<?php

namespace Database\Factories;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    protected $model = Task::class;

    public function definition(): array
    {
        return [
            'descricao' => $this->faker->sentence(4),
            'estado' => $this->faker->randomElement(['pendente', 'feito']),
            'user_id' => User::factory(), // Cria user se não passar manualmente
        ];
    }
}
