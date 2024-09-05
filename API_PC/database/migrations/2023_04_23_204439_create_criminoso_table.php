<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('criminoso', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->string('alcunha');
            $table->string('telefone')->nullable(true);
            $table->string('pai');
            $table->string('mae');
            $table->date('data_de_nascimento');
            $table->boolean('obito');
            $table->boolean('foragido');
            $table->string('rg');
            $table->string('cpf');
            $table->string('naturalidade')->nullable(true);
            $table->string('nacionalidade')->nullable(true);
            $table->string('local_de_trabalho')->nullable(true);
            $table->string('profissao')->nullable(true);
            $table->string('estado_civil')->nullable('true');
            $table->string('grau_de_escolaridade')->nullable('true');
            $table->string('genero');
            $table->float('altura')->nullable('true');
            $table->string('etnia')->nullable('true');
            $table->string('porte_fisico');
            $table->string('cor_dos_olhos');
            $table->string('cor_da_pele');
            $table->string('cor_do_cabelo');
            $table->string('tipo_de_cabelo');
            $table->text('foto_perfil_esquerdo');
            $table->text('foto_perfil_direito');
            $table->text('foto_frente');
            $table->string('cep')->nullable(true);
            $table->string('rua')->nullable(true);
            $table->string('bairro')->nullable(true);
            $table->integer('numero')->nullable(true);
            $table->string('complemento')->nullable(true);
            $table->boolean('excluido');

            $table->unsignedBigInteger('usuario_id');
            $table->foreign('usuario_id')->references('id')->on('usuario');

            $table->timestamp('criado_em')->useCurrent();
            $table->timestamp('alterado_em')->useCurrentOnUpdate()->nullable(true);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('criminoso');
    }
};
