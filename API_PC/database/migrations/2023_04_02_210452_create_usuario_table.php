<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::create('usuario', function (Blueprint $table) {
            $table->id();
            $table->string('usuario')->unique();
            $table->string('password');
            $table->string('nome');
            $table->dateTime('ultimo_acesso')->nullable(true);
            $table->boolean('permissao_de_escrita');
            $table->boolean('excluido');
            $table->timestamp('criado_em')->useCurrent();
            $table->timestamp('alterado_em')->useCurrentOnUpdate()->nullable(true);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('usuario');
    }
};
