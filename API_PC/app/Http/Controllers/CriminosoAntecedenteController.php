<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Criminoso;
use App\Models\Antecedente;
use Exception;

class CriminosoAntecedenteController extends Controller
{
    public function consultarPorCriminoso($id)
    {   
        $criminoso = Criminoso::where('id', $id)->where('excluido', false)->firstOr(
            function() {
                return response("", 404);
        });

        try{
            return $criminoso->antecedentes;
        }catch(Exception){
            return response("", 404);
        }
        
    }

    public function consultarPorAntecedente($id)
    {   
        $antecedentes = Antecedente::where('id', $id)->where('excluido', false)->firstOr(
            function() {
                return response("", 404);
        });

        try{
            return $antecedentes->criminosos;
        }catch(Exception){
            return response("", 404);
        }
    }
}
