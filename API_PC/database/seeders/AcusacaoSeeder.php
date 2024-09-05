<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Acusacao;

class AcusacaoSeeder extends Seeder
{
    public function run(): void
    {
        $roubo = new Acusacao;
        $roubo->tipificacao  = 157;
        $roubo->descricao = "roubo";
        $roubo->usuario_id = 1;
        $roubo->excluido = false;
        $roubo->save();

        $furto = new Acusacao;
        $furto->tipificacao  = 155;
        $furto->descricao = "furto";
        $furto->usuario_id = 1;
        $furto->excluido = false;
        $furto->save();

        $assasinato = new Acusacao;
        $assasinato->tipificacao = 146;
        $assasinato->descricao = "assasinato";
        $assasinato->usuario_id = 1;
        $assasinato->excluido = false;
        $assasinato->save();

        $sequestro = new Acusacao;
        $sequestro->tipificacao = 177;
        $sequestro->descricao = "sequestro";
        $sequestro->usuario_id = 1;
        $sequestro->excluido = false;
        $sequestro->save();

        $vandalismo = new Acusacao;
        $vandalismo->tipificacao = 162;
        $vandalismo->descricao = "vandalismo";
        $vandalismo->usuario_id = 1;
        $vandalismo->excluido = false;
        $vandalismo->save();
    }
}
