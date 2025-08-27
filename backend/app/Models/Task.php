<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    //protected $fillable = ['user_id', 'titulo', 'descricao', 'status'];
    protected $fillable = ['descricao', 'estado', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
