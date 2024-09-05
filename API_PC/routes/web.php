<?php

/** @var \Laravel\Lumen\Routing\Router $router */

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->post('/autorizacao/login', 'AutorizacaoController@login');

$router->group(['middleware' => 'auth:api'], function ($router) {
    $router->post('/autorizacao/logout', 'AutorizacaoController@logout');
    $router->post('/autorizacao/refresh', 'AutorizacaoController@refresh');
    
    $router->group(['middleware' => 'pode_alterar'], function ($router) {
        $router->post("/criminoso/inserir", "CriminosoController@inserir");
        $router->delete("/criminoso/{id}", "CriminosoController@deletar");
        $router->patch("/criminoso/{id}", "CriminosoController@alterar");
        
        $router->post("/acusacao/inserir", "AcusacaoController@inserir");
        $router->delete("/acusacao/{id}", "AcusacaoController@deletar");
        $router->patch("/acusacao/{id}", "AcusacaoController@alterar");
        
        $router->post("/antecedente/inserir", "AntecedenteController@inserir");
        $router->delete("/antecedente/{id}", "AntecedenteController@deletar");
        $router->patch("/antecedente/{id}", "AntecedenteController@alterar");
        
        $router->post("/marca/inserir", "MarcaController@inserir");
        $router->delete("/marca/{id}", "MarcaController@deletar");
        $router->patch("/marca/{id}", "MarcaController@alterar");
        
        $router->post("/tipo-de-tatuagem/inserir", "TipoDeTatuagemController@inserir");
        $router->delete("/tipo-de-tatuagem/{id}", "TipoDeTatuagemController@deletar");
        $router->patch("/tipo-de-tatuagem/{id}", "TipoDeTatuagemController@alterar");
    });
    
    $router->group(['middleware' => 'admin'], function ($router){
        $router->get("/usuario/{id}", "UsuarioController@mostrarPorId");
        $router->get("/usuario", "UsuarioController@mostrarTodos");
        $router->post("/usuario/inserir", "UsuarioController@inserir");
        $router->delete("/usuario/{id}", "UsuarioController@deletar");
        $router->patch("/usuario/{id}", "UsuarioController@alterar");
    });

    $router->post("/criminoso/filtro", "FiltroController@filtrarCriminosos");

    $router->get("/criminoso/{id}", "CriminosoController@mostrarPorId");
    $router->get("/criminoso", "CriminosoController@mostrarTodos");

    $router->get("/acusacao/{id}", "AcusacaoController@mostrarPorId");
    $router->get("/acusacao", "AcusacaoController@mostrarTodos");

    $router->get("/antecedente/{id}", "AntecedenteController@mostrarPorId");
    $router->get("/antecedente", "AntecedenteController@mostrarTodos");

    $router->get("/marca/{id}", "MarcaController@mostrarPorId");
    $router->get("/marca/criminoso/{id}", "MarcaController@mostrarMarcasPorCriminosoId");
    $router->get("/marca", "MarcaController@mostrarTodos");

    $router->get("/tipo-de-tatuagem/{id}", "TipoDeTatuagemController@mostrarPorId");
    $router->get("/tipo-de-tatuagem", "TipoDeTatuagemController@mostrarTodos");

    $router->get("/criminoso-antecedente/antecedentes/{id}", "CriminosoAntecedenteController@consultarPorCriminoso");
    $router->get("/criminoso-antecedente/criminosos/{id}", "CriminosoAntecedenteController@consultarPorAntecedente");
    
    $router->get('eu', 'UsuarioController@eu');
});