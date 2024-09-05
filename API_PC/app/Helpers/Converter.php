<?php

namespace App\Helpers;

class Converter
{
    public static function idadeEmDataDeNascimentoMax($idade)
    {
        $ano = (date('Y') - $idade);
        $dataCompleta = $ano . "-12-31";
        return $dataCompleta;
    }

    public static function idadeEmDataDeNascimentoMin($idade)
    {
        $ano = (date('Y') - $idade) - 1;
        $dataCompleta = $ano . "-01-01";
        return $dataCompleta;
    }
    public static function imagemEmBase64($caminho)
    {
        $data = file_get_contents($caminho);
        return base64_encode($data);
    }
}
