<?php
 
namespace App\Models;
 
use Illuminate\Database\Eloquent\Model;
 
class TipoDeTatuagem extends Model
{
    protected $table = 'tipo_de_tatuagem';
    protected $fillable = ['tipo', 'usuario_id', 'excluido'] ;
    const CREATED_AT = 'criado_em';
    const UPDATED_AT = 'alterado_em';
}