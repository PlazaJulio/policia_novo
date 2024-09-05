<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Antecedente;

class AntecedenteSeeder extends Seeder
{
    public function run(): void
    {
        Antecedente::factory()->count(10)->create();
    }
}
