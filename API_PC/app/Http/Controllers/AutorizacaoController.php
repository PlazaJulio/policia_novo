<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Laravel\Lumen\Routing\Controller as BaseController;
use App\Models\Usuario;
use Carbon\Carbon;

class AutorizacaoController extends BaseController
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }


    public function login()
    {
        $credentials = request(['usuario', 'password']);
        if (! $token = auth()->attempt($credentials)) {
            return response()->json([
                'error' => 'Unauthorized'
            ], 401);
        }
        else if (auth()->user()->excluido && auth()->user()->id != 1){
            return response()->json([
                'error' => 'Unauthorized'
            ], 401);
        }

        $dadoASerAlterado = Usuario::where('id', auth()->user()->id )->where('excluido', false);
        $currentTime = Carbon::now();

        $dadoASerAlterado->update(["ultimo_acesso" => $currentTime->toDateTimeString()]); 
        return $this->respondWithToken($token);
    }


    public function refresh()
    {
        $token = Auth::refresh();
        return $this->respondWithToken($token);
    }


    public function logout()
    {
        auth()->logout();
        return response()->json([
            'message' => 'Logout with success!'
        ], 200);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::factory()->getTTL() * 60 
        ]);
    }
}