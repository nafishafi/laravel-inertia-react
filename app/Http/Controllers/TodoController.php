<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Inertia\Inertia;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index(){
        return Inertia::render('Todo', [
            'todos' => Todo::latest()->paginate(2)
        ]);

    }
    
    public function edit(Todo $todo){
        return Inertia::render('Edit', [
            'todo' => $todo
        ]);

    }

    public function update(Request $request, Todo $todo){
        $data = $request->validate([
            'name' => 'required|min:3'
        ]);
        $todo->update($data);

        return redirect(route("todo.index"))->with('message', 'Data berhasil diupdate');
    }
    
    public function updateComplete(Request $request, Todo $todo){
        $data = $request->validate([
            'is_complete' => 'boolean'
        ]);
        $todo->update($data);

        return back()->with('message', 'Data berhasil diupdate');

        // return redirect(route("todo.index"))->with('message', 'Data berhasil diupdate');
    }

    public function store(Request $request){
        $data = $request->validate(
            [
            'name' => 'required|min:3',
            'is_complete' => 'boolean'
            ],
            [
                'name.required' => 'Tidak boleh kosong',
                'name.min' => 'Minimal 3 character'
            ]
        );
        Todo::create($data);

        return back()->with('message', 'Todo berhasil disimpan');
    }
    
}