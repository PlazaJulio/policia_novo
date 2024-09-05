<?php

namespace App\Http\Controllers;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Models\Antecedente;
use App\Models\Criminoso;

use Exception;

class AntecedenteController extends Controller
{
    
    public function __construct()
    {
        //
    }
    public function mostrarPorId($id)
    {
        return Antecedente::where('id', $id)->where('excluido', false)->firstOr(
            function() {
                return response("", 404);
        });
    }

    public function mostrarTodos(Request $request)
    {
        $limite = $request->limite ? $request->limite : 10;
        $deslocar = $request->deslocar ? $request->deslocar : 0;
        $numero_de_dados_totais = Antecedente::count();
        return response()->json(["numero_de_dados_totais" => $numero_de_dados_totais, "deslocar"=>$deslocar,"limite"=>$limite,"resultado" => Antecedente::offset($deslocar)->limit($limite)->where('excluido', false)->get()]);
    }

    public function inserir(Request $request)
    {   
        try{
            $Antecedente = Antecedente::create([
                "local" => $request->local,
                "data" => $request->data,
                "hora" => $request->hora,
                "descricao" => $request->descricao,
                "acusacao_id" => $request->acusacao_id,
                "usuario_id" => auth()->user()->id,
                "excluido" => false
            ]);

            // Vinculando criminoso a antecedente na tabela intermediaria
            $criminoso = Criminoso::find($request->criminoso_id);
            $Antecedente->criminosos()->attach($criminoso->id);

            return $Antecedente;
        }catch(Exception){
            return response("Requisição feita de maneira incorreta", 400);
        }
    }

    public function deletar($id)
    {
        try{
            $dadoExcluido = Antecedente::where('excluido', false)->findOrFail($id);
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
           $dadoASerAlterado = Antecedente::where('excluido', false)->findOrFail($id); // Alteracao
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

