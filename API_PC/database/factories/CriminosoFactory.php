<?php

namespace Database\Factories;

use App\Models\Criminoso;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Helpers\Converter;

class CriminosoFactory extends Factory
{

    protected $model = Criminoso::class;

    public function definition()
    {

        $listaDatasNsci = ["2000-05-22", "2005-04-21", "2001-03-04", "2003-12-12"];
        $listaobito_foragido = [true, false];
        $listaLocalTra = ["Padaria", "Buteco do Ze", "Amigao", "FarmaciaMarilia"];
        $listaTrabalho = ["Carpinteiro", "Pedreiro", "Pinto", "Vendedor"];

        return [
            'nome' => $this->faker->name,
            'alcunha' => $this->faker->userName,
            'telefone' => $this->faker->phoneNumber,
            'pai' => $this->faker->name,
            'mae' => $this->faker->name,
            'data_de_nascimento' => $this->faker->randomElement($listaDatasNsci),
            'obito' => $this->faker->randomElement($listaobito_foragido),
            'foragido' => $this->faker->randomElement($listaobito_foragido),
            'rg' => $this->faker->unique->postcode(),
            'cpf' => $this->faker->unique->postcode(),
            'naturalidade' => $this->faker->state,
            'nacionalidade' => $this->faker->country,
            'local_de_trabalho' => $this->faker->randomElement($listaLocalTra),
            'profissao' => $this->faker->randomElement($listaTrabalho),
            'estado_civil' => $this->faker->word,
            'grau_de_escolaridade' => $this->faker->word,
            'genero' => $this->faker->word,
            'altura' => round(rand(1, 2) + (mt_rand() / mt_getrandmax()), 2),
            'etnia' => $this->faker->country,
            'foto_perfil_esquerdo' => Converter::imagemEmBase64(base_path("public/imagemSeeder.png")),
            'foto_perfil_direito' => Converter::imagemEmBase64(base_path("public/imagemSeeder.png")),
            'foto_frente' => Converter::imagemEmBase64(base_path("public/imagemSeeder.png")),
            'cor_da_pele' => $this->faker->word,
            'cor_do_cabelo' => $this->faker->word,
            'porte_fisico' => $this->faker->word(),
            'cor_dos_olhos' => $this->faker->word(),
            'tipo_de_cabelo' => $this->faker->word(),
            'usuario_id' => 1,
            'excluido' => false,
            'cep' => $this->faker->numerify('########'), 
            'rua' => $this->faker->name,
            'bairro' => $this->faker->name,
            'numero' => $this->faker->numberBetween(0, 1000),
            'complemento' => $this->faker->randomElement(['Bloco A', 'Bloco B', 'Bloco C', null]),
        ];
    }
}
