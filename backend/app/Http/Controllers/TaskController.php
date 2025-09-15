<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // Listar todas as tarefas com usuário
    public function index()
    {
        return Task::with('user')->get();
    }

    // Criar nova tarefa para um usuário
    public function store(Request $request, $userId)
    {
        $validated = $request->validate([
            'descricao' => 'required|string|max:255',
        ]);
        
        $validated['user_id'] = $userId;
        $validated['estado'] = 'pendente'; // ajustado para "estado"
        
        return Task::create($validated);
    }

    // Listar tarefas de um usuário específico (com ID)
    public function allTasks()
    {
        return Task::with('user')->get();
    }

    // Excluir tarefa
    public function destroy($taskId)
    {
        $task = Task::findOrFail($taskId);
        $task->delete();

        return response()->json(['message' => 'Tarefa excluída com sucesso']);
    }

    // Alterar/Atualizar estado da tarefa
    public function updateEstado(Request $request, $id)
    {
        $task = Task::findOrFail($id);

        $request->validate([
            'estado' => 'required|in:pendente,feito',
        ]);

        $task->estado = $request->estado;
        $task->save();

        return response()->json($task);
    }
}
