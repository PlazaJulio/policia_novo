<?php

namespace App\Http\Controllers;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Models\Acusacao;
use Exception;

class AcusacaoController extends Controller
{
    
    public function __construct()
    {
        //
    }
    public function mostrarPorId($id)
    {
        return Acusacao::where('id', $id)->where('excluido', false)->firstOr(
            function() {
                return response("", 404);
        });
    }

    public function mostrarTodos(Request $request)
    {
        $limite = $request->limite ? $request->limite : 10;
        $deslocar = $request->deslocar ? $request->deslocar : 0;
        $numero_de_dados_totais = Acusacao::count();
        return response()->json(["numero_de_dados_totais" => $numero_de_dados_totais, "deslocar"=>$deslocar,"limite"=>$limite,"resultado" => Acusacao::offset($deslocar)->limit($limite)->where('excluido', false)->orderBy("id")->get()]);
    }

    public function inserir(Request $request)
    {   
        try{
            return Acusacao::create([
                "tipificacao"=> $request->tipificacao,
                "descricao" => $request->descricao,
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
            $dadoExcluido = Acusacao::where('excluido', false)->findOrFail($id);
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
            $dadoASerAlterado = Acusacao::where('excluido', false)->findOrFail($id);
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
