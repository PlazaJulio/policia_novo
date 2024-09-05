<?php
 
namespace App\Models;
 
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\Factory;
use Database\Factories\CriminosoFactory;
use App\Models\Antecedente;
 
class Criminoso extends Model
{   

    protected static function factory(): Factory
    {
        return CriminosoFactory::new();
    }

    public function antecedentes()
    {
        return $this->belongsToMany(Antecedente::class, 'criminoso_antecedente', 'criminoso_id', 'antecedente_id');
    }

    protected $table = 'criminoso';
    protected $fillable = ['nome',
                           'alcunha',
                           'telefone',
                           'pai',
                           'mae',
                           'data_de_nascimento',
                           'obito',
                           'foragido',
                           'rg',
                           'cpf',
                           'naturalidade',
                           'nacionalidade',
                           'estado_civil',
                           'grau_de_escolaridade',
                           'local_de_trabalho',
                           'porte_fisico',
                           'cor_dos_olhos',
                           'tipo_de_cabelo',
                           'profissao',
                           'genero',
                           'altura',
                           'etnia',
                           'foto_perfil_esquerdo',
                           'foto_perfil_direito',
                           'foto_frente',
                           'cor_da_pele',
                           'cor_do_cabelo',
                           'cep',
                           'rua',
                           'bairro',
                           'numero',
                           'complemento',
                           'excluido',
                           'excluido',
                           'usuario_id'
                        ];
    const CREATED_AT = 'criado_em';
    const UPDATED_AT = 'alterado_em';
}