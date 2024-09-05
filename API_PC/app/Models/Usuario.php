<?php
 
namespace App\Models;
 
use Illuminate\Database\Eloquent\Model;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Laravel\Lumen\Auth\Authorizable;

class Usuario extends Model implements AuthenticatableContract, AuthorizableContract, JWTSubject
{
    use Authenticatable, Authorizable;
 
    protected $table = 'usuario';
    protected $fillable = ['usuario', 'password', 'nome', 'ultimo_acesso', 'permissao_de_escrita', 'excluido',];
    protected $hidden = ['password'];
    const CREATED_AT = 'criado_em';
    const UPDATED_AT = 'alterado_em';
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    public function getJWTCustomClaims()
    {
        return [];
    }
}