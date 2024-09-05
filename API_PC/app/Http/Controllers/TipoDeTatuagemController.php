<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\TipoDeTatuagem;
use Exception;

class TipoDeTatuagemController extends Controller
{
    public function mostrarPorId($id)
    {
        return TipoDeTatuagem::where('id', $id)->where('excluido', false)->firstOr(
            function() {
                return response("", 404);
        });
    }

    public function mostrarTodos(Request $request)
    {
        $limite = $request->limite ? $request->limite : 10;
        $deslocar = $request->deslocar ? $request->deslocar : 0;
        $resultado = TipoDeTatuagem::where('excluido', false)->orderBy("id");
        $numero_de_dados_totais = count($resultado->get());
        return response()->json(["numero_de_dados_totais" => $numero_de_dados_totais, "deslocar"=>$deslocar,"limite"=>$limite,"resultado" => $resultado->offset($deslocar)->limit($limite)->get()]);
    }

    public function inserir(Request $request)
    {   
        try{
            return TipoDeTatuagem::create([
                "tipo" => $request->tipo,
                "usuario_id" => auth()->user()->id,
                "excluido" => false
            ]);
        }catch(Exception){
            return response("Requisição feita de maneira incorreta", 400);
        }
    }

    public function deletar($id)
    {
        try{
            $dadoExcluido = TipoDeTatuagem::where('excluido', false)->findOrFail($id);
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
           $dadoASerAlterado = TipoDeTatuagem::where('excluido', false)->findOrFail($id); // Alteracao
           foreach ($request->except('_token') as $chave => $valor){
              if($chave == "excluido" || $chave == "usuario_id")
              {
                 continue;
              }
              $dadoASerAlterado->update([$chave => $valor]);
           }
           $dadoASerAlterado->update(["usuario_id" => auth()->user()->id]);
           return $dadoASerAlterado;
           }catch(Exception){
              return response("", 404);
        }
    }
    
}
