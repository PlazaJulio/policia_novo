<?php
 
namespace App\Models;
 
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\Factory;
use Database\Factories\AntecedenteFactory;
use App\Models\Criminoso;
 
class Antecedente extends Model
{
    
    protected static function factory(): Factory
    {
        return AntecedenteFactory::new();
    }

    public function criminosos()
    {
        return $this->belongsToMany(Criminoso::class, 'criminoso_antecedente', 'antecedente_id', 'criminoso_id');
    }

    protected $table = 'antecedente';
    protected $fillable = ['local','data','hora','descricao','acusacao_id', 'usuario_id','excluido'];
    const CREATED_AT = 'criado_em';
    const UPDATED_AT = 'alterado_em';
}