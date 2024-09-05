<?php

namespace Database\Factories;

use App\Models\Endereco;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

class EnderecoFactory extends Factory
{
    
    protected $model = Endereco::class;

    public function definition()
    {
        return [
            
            'cep' => $this->faker->numerify('########'), 
            'rua' => $this->faker->name,
            'bairro' => $this->faker->name,
            'numero' => $this->faker->numberBetween(0, 1000),
            'complemento' => $this->faker->randomElement(['Bloco A', 'Bloco B', 'Bloco C', null]),
            'usuario_id' => 1,
            'excluido' => false
        ];
    }
}