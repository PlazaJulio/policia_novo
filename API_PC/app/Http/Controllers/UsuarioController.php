<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;
use Exception;


class UsuarioController extends Controller
{
    
    public function __construct()
    {
        //
    }
    public function mostrarPorId($id)
    {
        return Usuario::where('id', $id)->where('excluido', false)->firstOr(
            function() {
                return response("", 404);
        });
    }

    public function mostrarTodos(Request $request)
    {
        $limite = $request->limite ? $request->limite : 10;
        $deslocar = $request->deslocar ? $request->deslocar : 0;
        $numero_de_dados_totais = Usuario::count();
        return response()->json(["numero_de_dados_totais" => $numero_de_dados_totais, "deslocar"=>$deslocar,"limite"=>$limite,"resultado" => Usuario::offset($deslocar)->limit($limite)->where('excluido', false)->orderBy("id")->get()]);
    }

    public function inserir(Request $request)
    {   
        try{
            return  Usuario::create([
                "usuario" => $request->usuario,
                "nome" => $request->nome,
                'permissao_de_escrita' => $request->permissao_de_escrita,
                "password" => Hash::make($request->password),
                "excluido" => false
            ]);
        }catch(Exception $e){
            return $e;
            return response("Requisição feita de maneira incorreta", 400);
        }
    }

    public function deletar($id)
    {
        try{
            $dadoExcluido = Usuario::where("excluido", false)->findOrFail($id);
            $dadoExcluido->update(["excluido" => true]);
            $dadoExcluido->update(["usuario_id" =>  auth()->user()->id]);
            return $dadoExcluido;
        }catch(Exception){
            return response("", 404);
        }
    }

    public function alterar($id, Request $request)
    {   
        try{
            $dadoASerAlterado = Usuario::where('excluido', false)->findOrFail($id);;
            foreach ($request->except('_token') as $chave => $valor){
                if($chave == "password"){
                    $dadoASerAlterado->update([$chave => Hash::make($valor)]);
                }
                else
                {
                    $dadoASerAlterado->update([$chave => $valor]);
                }    
                
            }
            return $dadoASerAlterado;
        }catch(Exception){
            return response("", 404);
        }
        
        
    }

    public function eu()
    {
        return response()->json(
            auth()->user()
        );
    }

    
}
