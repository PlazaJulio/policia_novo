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
        Schema::create('criminoso_antecedente', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('antecedente_id');
            $table->foreign('antecedente_id')->references('id')->on('antecedente');

            $table->unsignedBigInteger('criminoso_id');
            $table->foreign('criminoso_id')->references('id')->on('criminoso');

            $table->timestamp('criado_em')->useCurrent();
            $table->timestamp('alterado_em')->useCurrentOnUpdate()->nullable(true);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('criminoso_antecedente');
    }
};
