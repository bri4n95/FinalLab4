<?php 
include "clases/Personas.php";

if ( !empty( $_FILES ) ) 
{
    $temporal = $_FILES[ 'file' ][ 'tmp_name' ];
    $ruta = "..". DIRECTORY_SEPARATOR . 'fotos' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
    move_uploaded_file( $temporal, $ruta );
    echo "correcto";
}else
{
	//echo "_FILES = empty";
}

if(isset($_GET['accion']))
{
	$accion=$_GET['accion'];
	if($accion=="traer")
	{
		$respuesta= array();
		$respuesta['listado']=Persona::TraerTodasLasPersonas();
		$arrayJson = json_encode($respuesta);
		echo  $arrayJson;
	}

}else{//Si es un post entra por el else!

	$DatosPorPost = file_get_contents("php://input");
	$respuesta = json_decode($DatosPorPost);
	//var_dump($respuesta);
	switch($respuesta->datos->accion)
	{
		case "borrar":
		{
			if($respuesta->datos->sucursal->foto!="pordefecto.png")
			{
				unlink("../fotos/".$respuesta->datos->sucursal->foto);
			}
			sucursal::Borrarsucursal($respuesta->datos->sucursal->id);
			break;
		}
		case "insertar":
		{
			if($respuesta->datos->sucursal->foto!="pordefecto.png")
			{
				$milliseconds = round(microtime(true) * 1000);
				$rutaVieja="../fotos/".$respuesta->datos->sucursal->foto;
				$rutaNueva=$milliseconds."-".$respuesta->datos->sucursal->dni.".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
				copy($rutaVieja, "../fotos/".$rutaNueva);
				unlink($rutaVieja);
				$respuesta->datos->sucursal->foto=$rutaNueva;
			}
			sucursal::Insertarsucursal($respuesta->datos->sucursal);
			break;
		}
		case "buscar":
		{
			echo json_encode(sucursal::TraerUnasucursal($respuesta->datos->id));
			break;
		}
		case "modificar":
		{
			if($respuesta->datos->sucursal->foto!="pordefecto.png")
			{
				$rutaVieja="../fotos/".$respuesta->datos->sucursal->foto;
				$rutaNueva=$respuesta->datos->sucursal->dni.".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
				copy($rutaVieja, "../fotos/".$rutaNueva);
				unlink($rutaVieja);
				$respuesta->datos->sucursal->foto=$rutaNueva;
			}
			Sucursal::ModificarSucursal($respuesta->datos->sucursal);
			break;
		}
		case "uploadFoto":
		{
			if($respuesta->datos->sucursal->foto!="pordefecto.png")
			{
				$milliseconds = round(microtime(true) * 1000);
				$rutaVieja="../fotos/".$respuesta->datos->sucursal->foto;
				$rutaNueva=$milliseconds."-".$respuesta->datos->sucursal->nombre.".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
				copy($rutaVieja, "../fotos/".$rutaNueva);
				unlink($rutaVieja);
				$respuesta->datos->sucursal->foto=$rutaNueva;
				echo $respuesta->datos->sucursal->foto=$rutaNueva;//le retorno la ruta de la foto que se subío para asociarla a la sucursal
			}
			break;
		}
		case "uploadFotoInmueble":
		{
			if($respuesta->datos->inmueble->foto!="pordefecto.png")
			{
				$milliseconds = round(microtime(true) * 1000);
				$rutaVieja="../fotos/".$respuesta->datos->inmueble->foto;
				$rutaNueva=$milliseconds."-inmueble.".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
				copy($rutaVieja, "../fotos/".$rutaNueva);
				unlink($rutaVieja);
				$respuesta->datos->inmueble->foto=$rutaNueva;
				echo $respuesta->datos->inmueble->foto=$rutaNueva;//le retorno la ruta de la foto que se subío para asociarla al inmueble
			}
			break;
		}
	}
	
	/*else
	{
		echo 'No se cargo el archivo';
	}*/
	//echo $respuesta->datos->persona->nombre;
}
 ?>