<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TaskController;


Route::get('/ping', function () {
    return 'pong';
});


// ----------------------------------
// ROTAS DE USUÁRIOS
// ----------------------------------

// Listar todos os usuários
Route::get('/users', [UserController::class, 'index']);

// Criar um novo usuário
Route::post('/users', [UserController::class, 'store']);

// Excluir um usuário
Route::delete('/users/{id}', [UserController::class, 'destroy']);


// ----------------------------------
// ROTAS DE TAREFAS (por usuário)
// ----------------------------------

// Listar tarefas de um usuário
Route::get('/users/{id}/tasks', [TaskController::class, 'index']);

// Criar nova tarefa para um usuário
Route::post('/users/{id}/tasks', [TaskController::class, 'store']);


// ----------------------------------
// ROTAS DIRETAS DE TAREFAS (por id)
// ----------------------------------

// Excluir uma tarefa
Route::delete('/tasks/{id}', [TaskController::class, 'destroy']);

// Atualizar status da tarefa
Route::put('/tasks/{id}/status', [TaskController::class, 'updateStatus']);

// Listar todas as tarefas com nome do usuário
Route::get('/tasks', [TaskController::class, 'allTasks']);
