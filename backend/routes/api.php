<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TaskController;

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
Route::get('/users', [UserController::class, 'index']);     // Listar usuários
Route::post('/users', [UserController::class, 'store']);    // Criar usuário
Route::delete('/users/{id}', [UserController::class, 'destroy']); // Excluir usuário


// ============================================================================
// ROTAS DE TAREFAS (vinculadas a um usuário específico)
// ============================================================================
Route::post('/users/{id}/tasks', [TaskController::class, 'store']); // Criar tarefa


// ============================================================================
// ROTAS DIRETAS DE TAREFAS
// ============================================================================
Route::get('/tasks', [TaskController::class, 'index']);           // Listar tarefas
Route::delete('/tasks/{id}', [TaskController::class, 'destroy']); // Excluir tarefa
Route::put('/tasks/{id}/status', [TaskController::class, 'updateStatus']); // Atualizar status
