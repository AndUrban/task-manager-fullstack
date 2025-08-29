<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    //Listar todas as tarefas com usuário
    public function index()
    {
        return Task::with('user')->get();
    }

    //Criar nova tarefa para um usuário
    public function store(Request $request, $userId)
    {
        $validated = $request->validate([
            'descricao' => 'required|string|max:255',
        ]);
        
        $validated['user_id'] = $userId;
        $validated['status'] = 'pendente';
        
        return Task::create($validated);
    }

    //Listar tarefas de um usuário específico (com ID)
    public function allTasks()
    {
        return Task::with('user')->get();
    }

    //Excluir tarefa
    public function destroy($taskId)
    {
        $task = Task::findOrFail($taskId);
        $task->delete();

        return response()->json(['message' => 'Tarefa excluída com sucesso']);
    }

    //Alterar/Atualizar status da tarefa
    public function updateStatus(Request $request, $id)
    {
        $task = Task::findOrFail($id);

        $request->validate([
            'status' => 'required|in:pendente,feito',
        ]);

        $task->status = $request->status;
        $task->save();

        return response()->json($task);
    }

}
