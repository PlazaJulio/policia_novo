<?php

namespace Database\Factories;

use App\Models\Antecedente;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Criminoso;

class AntecedenteFactory extends Factory
{
    
    protected $model = Antecedente::class;

    public function definition()
    {
        
        $listaData = ["2000-05-22", "2005-04-21", "2001-03-04", "2003-12-12"];
        $listaHora = ["18:50:21", "15:20:10", "21:00:12", "12:20:12"];

        return [
            'local' => $this->faker->address,
            'data' => $this->faker->randomElement($listaData),
            'hora' => $this->faker->randomElement($listaHora),
            'descricao' => $this->faker->sentence,
            'acusacao_id' => random_int(1, 5),
            'usuario_id' => 1,
            'excluido' => false
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Antecedente $antecedente) {
            // Criação dos relacionamentos
            $criminosos = Criminoso::find(random_int(1, 10));
            $antecedente->criminosos()->attach($criminosos);
        });
    }
}