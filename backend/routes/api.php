<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TaskController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Rotas expostas pelo backend em formato REST.
| Todas as rotas abaixo retornam/consomem JSON.
|
| Estrutura atual do sistema:
|   - Usuários: CRUD mínimo (listar, criar, excluir)
|   - Tarefas: vinculadas a usuários (criar), além de exclusão,
|              atualização de status e listagem global
|
*/

/**
 * Teste de conexão
 * GET /api/ping → retorna "pong"
 */
Route::get('/ping', function () {
    return 'pong';
});


// ============================================================================
// ROTAS DE USUÁRIOS
// ============================================================================
/**
 * Listar todos os usuários
 * GET /api/users
 */
Route::get('/users', [UserController::class, 'index']);

/**
 * Criar um novo usuário
 * POST /api/users
 * Body esperado: { "name": "..." }
 */
Route::post('/users', [UserController::class, 'store']);

/**
 * Excluir um usuário (e suas tarefas associadas, se houver)
 * DELETE /api/users/{id}
 */
Route::delete('/users/{id}', [UserController::class, 'destroy']);


// ============================================================================
// ROTAS DE TAREFAS (vinculadas a um usuário específico)
// ============================================================================
/**
 * Criar nova tarefa para um usuário
 * POST /api/users/{id}/tasks
 * Body esperado: { "title": "...", "description": "..." }
 */
Route::post('/users/{id}/tasks', [TaskController::class, 'store']);


// ============================================================================
// ROTAS DIRETAS DE TAREFAS (via id)
// ============================================================================
/**
 * Excluir uma tarefa
 * DELETE /api/tasks/{id}
 */
Route::delete('/tasks/{id}', [TaskController::class, 'destroy']);

/**
 * Atualizar status da tarefa (ex.: pendente → feito)
 * PUT /api/tasks/{id}/status
 * Body esperado: { "status": "done" }
 */
Route::put('/tasks/{id}/status', [TaskController::class, 'updateStatus']);

/**
 * Listar todas as tarefas com o nome do usuário dono
 * GET /api/tasks
 */
Route::get('/tasks', [TaskController::class, 'allTasks']);
