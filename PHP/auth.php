<?php
include_once '../jwt/vendor/autoload.php';
include_once '/clases/Personas.php';
use \Firebase\JWT\JWT;

$datosDelModeloPorPOST = file_get_contents('php://input'); // Metodo para traer los datos de JS.
$usuario = json_decode($datosDelModeloPorPOST);

$traerPersona = Persona::TraerPersonaLogin($usuario->email, $usuario->password);

if ($traerPersona != null){
	
	$ClaveDeEncriptacion = 'estaEsLaClave';
	$token["id"] = $traerPersona->id;
	$token["id_local"] = $traerPersona->id_local;
	$token["nombre"] = $traerPersona->nombre;
	$token["apellido"] = $traerPersona->apellido;
	$token["email"] = $traerPersona->email;
	$token["perfil"]=$traerPersona->perfil;
	$token["iat"]=time();
	$token["exp"]=time()+120;

	$jwt = JWT::encode($token, $ClaveDeEncriptacion); //&genero el token con los datos que quiero
	$ArrayConToken["ElNombreDelToken"]=$jwt;//Guardo el token en un array (el nombre del token tiene que ser el mismo que en el js)!!
}
else {
 $ArrayConToken["ElNombreDelToken"]= false;
}

echo json_encode($ArrayConToken);//devuelvo el array que contiene el token

?>
