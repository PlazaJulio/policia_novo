<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Marca;
use App\Helpers\Converter;
use Exception;

class FiltroController extends Controller
{
    public function filtrarCriminosos(Request $request){
        try{
            $criminosos = Marca::query()->rightJoin("criminoso", "criminoso.id", "=", "marca.criminoso_id");
            $criminosos->select('criminoso.*')->distinct();
            $limite = 10;
            $deslocar = 0;
            foreach ($request->except('_token') as $chave => $valor){
                if($chave == "usuario_id"){
                    continue;
                }
                else if($chave == "limite"){
                    $limite = $valor > 0 ? $valor : 1;
                }
                else if($chave == "deslocar"){
                    $deslocar = $valor;
                }
                else if($chave == "cicatriz_ou_tatuagem"){
                    $criminosos->where("cicatriz_ou_tatuagem", $valor);
                }
                else if($chave == "parte_do_corpo"){
                    if ($request->cicatriz_ou_tatuagem != null){
                        $criminosos->where("parte_do_corpo", $valor);
                    }
                    continue;
                }
                else if($chave == "tipo_de_tatuagem_id"){
                    if ($request->cicatriz_ou_tatuagem == "t"){
                        $criminosos->where("tipo_de_tatuagem_id", $valor);
                    }
                    continue;
                }
                else if($chave == "nome" || $chave == "alcunha" || $chave == "pai" || $chave == "mae" || $chave == "profissao" || $chave == "descricao"){
                    $criminosos->where($chave, "LIKE", "%". $valor ."%");
                }
                else if ($chave == "idade_min" || $chave == "idade_max"){
                   
                    if($request->idade_min != null && $request->idade_max != null){
                        $maiorData = Converter::idadeEmDataDeNascimentoMax($request->idade_min);
                        $menorData = Converter::idadeEmDataDeNascimentoMin($request->idade_max);
                        $criminosos->whereBetween('data_de_nascimento', [$menorData, $maiorData]);
                    }
                    continue;
                }
                else if ($chave == "altura_min" || $chave == "altura_max") {
                    if ($request->altura_max != null && $request->altura_min != null) {
                        $criminosos->whereBetween("altura", [$request->altura_min, $request->altura_max]);
                    }
                    continue;
                }
                else{
                    $criminosos->where($chave, $valor);
                }
            }
            $criminosos->where("criminoso.excluido", false);
            $numero_de_dados_totais = count($criminosos->get());
            return response()->json(["numero_de_dados_totais" => $numero_de_dados_totais, "deslocar" => $deslocar, "limite" => $limite,  "resultado" =>$criminosos->offset($deslocar)->limit($limite)->orderBy("criminoso.id")->get()]);
        }catch(Exception $ex){
            return $ex;
            return response("Requisição feita de maneira incorreta", 400);
        }
    }
}
