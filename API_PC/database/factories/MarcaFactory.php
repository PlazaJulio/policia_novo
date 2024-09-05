<?php

namespace Database\Factories;

use App\Models\Marca;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Helpers\Converter;

class MarcaFactory extends Factory
{
    
    protected $model = Marca::class;

    public function definition()
    {

        $lista = ['c','t'];
        $cOuT = $this->faker->randomElement($lista);

        return [
            'cicatriz_ou_tatuagem' => $cOuT,
            'descricao' => $this->faker->sentence,
            'parte_do_corpo' => $this->faker->word,
            'foto' => Converter::imagemEmBase64(base_path("public/imagemSeeder.png")),
            'tipo_de_tatuagem_id' => ($cOuT == 't')? random_int(1, 5): null,
            'criminoso_id' => random_int(1, 10),
            'usuario_id' => 1,
            'excluido' => false
        ];
    }
}