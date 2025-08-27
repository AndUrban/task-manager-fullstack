<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //Listar todos os usuários
    public function index()
    {
        return User::all();
    }

    //Criar novo usuário
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|unique:users',
        ]);

        $user = User::create($validated);

        return response()->json($user, 201);
    }

    //Listar tarefas de um usuário específico
    public function tasks($userId)
    {
        $user = User::findOrFail($userId);
        return $user->tasks;
    }


    //Excluir usuário
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'Usuário deletado com sucesso']);
    }
}
