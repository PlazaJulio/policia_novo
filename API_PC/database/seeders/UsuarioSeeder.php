<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $currentTime = Carbon::now();

        $usuario = new Usuario;
        $usuario->nome = "admin";
        $usuario->usuario = "admin";
        $usuario->password = Hash::make("123");
        $usuario->ultimo_acesso = $currentTime->toDateTimeString();
        $usuario->permissao_de_escrita = true;
        $usuario->excluido = false;
        $usuario->save();
    }
}
