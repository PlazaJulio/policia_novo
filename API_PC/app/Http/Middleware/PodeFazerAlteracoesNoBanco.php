<?php

namespace App\Http\Middleware;

use Closure;

class PodeFazerAlteracoesNoBanco
{
    public function handle($request, Closure $next)
    {
        $usuario = auth()->user();
        if ($usuario->permissao_de_escrita){
            return $next($request);
        }
        return response("Usuario não autorizado", 401);
    }
}
