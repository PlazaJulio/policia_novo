<?php

namespace App\Http\Controllers;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Models\Criminoso;
use App\Helpers\Converter;

use Exception;

class CriminosoController extends Controller
{
    
    public function __construct()
    {
        //
    }

    private static function jaFezJoinComTabelaAparencia(&$jaFezJoin, $criminosos){
        if(!$jaFezJoin){
            $criminosos->join("aparencia", "criminoso.aparencia_id", "=", "aparencia.id");
            $jaFezJoin = true;
        }
    }

    public function mostrarPorId($id)
    {
        return Criminoso::where('id', $id)->where('excluido', false)->firstOr(
            function() {
                return response("", 404);
        });
    }

    public function mostrarTodos(Request $request)
    {
        $limite = $request->limite ? $request->limite : 10;
        $deslocar = $request->deslocar ? $request->deslocar : 0;
        $numero_de_dados_totais = Criminoso::count();
        return response()->json(["numero_de_dados_totais" => $numero_de_dados_totais, "deslocar"=>$deslocar,"limite"=>$limite,"resultado" => Criminoso::offset($deslocar)->limit($limite)->where('excluido', false)->get()]);
    }

    public function inserir(Request $request)
    {   
        try{
            return Criminoso::create([
                "nome" => $request->nome,
                "alcunha" => $request->alcunha,
                "telefone" => $request->telefone,
                "pai" => $request->pai,
                "mae" => $request->mae,
                "data_de_nascimento" => $request->data_de_nascimento,
                "obito" => $request->obito,
                "foragido" => $request->foragido,
                "rg" => $request->rg,
                "cpf" => $request->cpf,
                "naturalidade" => $request->naturalidade,
                "nacionalidade" => $request->nacionalidade,
                "local_de_trabalho" => $request->local_de_trabalho,
                "profissao" => $request->profissao,
                "estado_civil" => $request->estado_civil,
                "grau_de_escolaridade" => $request->grau_de_escolaridade,
                "genero" => $request->genero,
                "altura" => $request->altura,
                "etnia" => $request->etnia,
                "porte_fisico" => $request->porte_fisico,
                "cor_dos_olhos" => $request->cor_dos_olhos,
                "cor_da_pele" => $request->cor_da_pele,
                "cor_do_cabelo" => $request->cor_do_cabelo,
                "tipo_de_cabelo" => $request->tipo_de_cabelo,
                "foto_perfil_esquerdo" => $request->foto_perfil_esquerdo,
                "foto_perfil_direito" => $request->foto_perfil_direito,
                "foto_frente" => $request->foto_frente,
                "endereco_id" => $request->endereco_id,
                "usuario_id" => auth()->user()->id,
                'cep' => $request->cep, 
                'rua' => $request->rua,
                'bairro' => $request->bairro,
                'numero' => $request->numero,
                "excluido" => false
                
            ]);
        }catch(Exception $e){
            return response("Requisição feita de maneira incorreta", 400);
        }
    }

    public function deletar($id)
    {
        try{
            $dadoExcluido = Criminoso::where('excluido', false)->findOrFail($id);
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
           $dadoASerAlterado = Criminoso::where('excluido', false)->findOrFail($id); //Alteracao
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

