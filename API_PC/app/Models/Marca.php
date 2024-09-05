<?php
 
namespace App\Models;
use Database\Factories\MarcaFactory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Model;
 
class Marca extends Model
{
    protected static function factory(): Factory
    {
        return MarcaFactory::new();
    }

    protected $table = 'marca';
    protected $fillable = [
        'cicatriz_ou_tatuagem', 
        'descricao', 
        'parte_do_corpo', 
        'foto', 
        'tipo_de_tatuagem_id', 
        'criminoso_id', 
        'usuario_id', 
        'excluido'
    ];
    const CREATED_AT = 'criado_em';
    const UPDATED_AT = 'alterado_em';
}