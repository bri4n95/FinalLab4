<?php
header('Access-Control-Allow-Origin: *');  
/**
 * Step 1: Require the Slim Framework using Composer's autoloader
 *
 * If you are not using Composer, you need to load Slim Framework with your own
 * PSR-4 autoloader.
 */
require 'vendor/autoload.php';
require '../PHP/clases/Personas.php';
require '../PHP/clases/Sucursales.php';
require '../PHP/clases/Inmuebles.php';
require '../PHP/clases/Transacciones.php';

/**
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */

$app = new Slim\App();

/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, `Slim::patch`, and `Slim::delete`
 * is an anonymous function.
 */
/**
* GET: Para consultar y leer recursos
* POST: Para crear recursos
* PUT: Para editar recursos
* DELETE: Para eliminar recursos
*
*  GET: Para consultar y leer recursos */

$app->get('/', function ($request, $response, $args) {
    $response->write("Welcome to Slim!");
    return $response;
});

//****************************************PERSONAS********************************************//

$app->post('/personas/alta/{objeto}', function ($request, $response, $args) {
    $persona = json_decode($args['objeto']);
    $datos = Persona::InsertarPersona($persona);
    $response->write(json_encode($datos));

    return $response;
});


$app->get('/personas[/]', function ($request, $response, $args) {
    $datos = Persona::TraerTodasLasPersonas();
    $response->write(json_encode($datos));//INTERNAL SERVER ERROR 500 -> Porque le es6taba devolviendo una referencia a memoria del servidor (hay que pasar un "string" del objeto transformado a json!!)
    //$response->write("Lista de usuarios");
    
    return $response;
});


$app->get('/personas/sinlocal/', function ($request, $response, $args) {
    $datos = Persona::TraerTodasLasPersonasSinLocal();
    $response->write(json_encode($datos));//INTERNAL SERVER ERROR 500 -> Porque le es6taba devolviendo una referencia a memoria del servidor (hay que pasar un "string" del objeto transformado a json!!)
    //$response->write("Lista de usuarios");
    
    return $response;
});

$app->get('/usuario[/{id}[/{name}]]', function ($request, $response, $args) {
    $response->write("Datos usuario ");
    var_dump($args);
    return $response;
});
/* FORMA DE RECIBIR POR PARAMETROS UN OBJETO EN POST
    POST: Para crear recursos */
$app->post('/alta/{objeto}', function ($request, $response, $args) {
    $persona = json_decode($args['objeto']);
    $datos = Persona::InsertarPersona($persona);
    $response->write($datos);
    return $response;
});

$app->put('/modificar/{objeto}', function ($request, $response, $args) {
   
    $datos = Persona::ModificarPersona($args['id']);
   $response->write("modificar !: ");
    var_dump($args['id']);
    return $response;
});

$app->delete('/personas/borrar/{id}', function ($request, $response, $args) {
    $datos = Persona::BorrarPersona($args['id']);
    $response->write("borrar !: ");
    var_dump($args['id']);
    return $response;
});

//****************************************SUCURSALES********************************************//
$app->post('/sucursal/alta/{objeto}', function ($request, $response, $args) {
    $sucursal = json_decode($args['objeto']);
    $datos = Sucursal::InsertarSucursal($sucursal);
    $response->write($datos);

    return $response;
});

$app->get('/sucursales[/]', function ($request, $response, $args) {
   $datos = Sucursal::TraerTodasLasSucursales();
    $response->write(json_encode($datos));

    return $response;
});
$app->delete('/sucursales/baja/{id}', function ($request, $response, $args) {
 
    $datos = Sucursal::BorrarSucursal($args['id']);
     $response->write("borrar !: ");
    var_dump($args['id']);

    return $response;
});
//****************************************INMUEBLES********************************************//
$app->post('/inmueble/alta/{objeto}', function ($request, $response, $args) {
    $inmueble = json_decode($args['objeto']);
    $datos = Inmueble::InsertarInmueble($inmueble);
    $response->write($datos);

    return $response;
});


$app->get('/inmuebles[/]', function ($request, $response, $args) {
   $datos = Inmueble::TraerTodosLosInmuebles();
    $response->write(json_encode($datos));

    return $response;
});
$app->delete('/inmueble/baja/{id}', function ($request, $response, $args) {
 
    $datos = Inmueble::BorrarInmueble($args['id']);
     $response->write("borrar !: ");
    var_dump($args['id']);

    return $response;
});
//****************************************TRANSACCIONES********************************************//
$app->post('/transaccion/alta/{objeto}', function ($request, $response, $args) {
    $transaccion = json_decode($args['objeto']);
    $datos = Transaccion::InsertarTransaccion($transaccion);
    $response->write($datos);

    return $response;
});


$app->get('/transacciones[/]', function ($request, $response, $args) {
   $datos = Transaccion::TraerTodasLasTransacciones();
    $response->write(json_encode($datos));

    return $response;
});

$app->get('/transacciones/ventasporlocal[/]', function ($request, $response, $args) {
   $datos = Transaccion::TraerVentasPorLocal();
    $response->write(json_encode($datos));

    return $response;
});
$app->get('/transacciones/ventasporproducto[/]', function ($request, $response, $args) {
   $datos = Transaccion::TraerVentasPorProducto();
    $response->write(json_encode($datos));

    return $response;
});

$app->get('/transacciones/ventasporempleado/{idSucursal}', function ($request, $response, $args) {
   $datos = Transaccion::TraerVentasPorEmpleado($args['idSucursal']);
    $response->write(json_encode($datos));

    return $response;
});



$app->run();
