<?php

namespace App\Http\Middleware;

use Closure;

class EhUsuarioAdmin
{
    public function handle($request, Closure $next)
    {
        $usuario = auth()->user();
        if ($usuario->id == 1){
            return $next($request);
        }
        return response("Usuario não autorizado", 401);
    }
}
