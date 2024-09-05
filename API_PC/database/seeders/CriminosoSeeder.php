<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Criminoso;

class CriminosoSeeder extends Seeder
{
    public function run(): void
    {
        Criminoso::factory()->count(10)->create();
    }
}
