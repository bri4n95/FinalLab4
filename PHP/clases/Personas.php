<?php
require_once"AccesoDatos.php";
class Persona
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
	public $nombre;
 	public $apellido;
  	public $email;
  	public $password;
  	public $telefono;
  	public $foto;
  	public $perfil;
  	public $estado;
  	public $idLocal;

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetId()
	{
		return $this->id;
	}
	public function GetIdLocal()
	{
		return $this->idLocal;
	}
	public function GetApellido()
	{
		return $this->apellido;
	}
	public function GetNombre()
	{
		return $this->nombre;
	}
	public function Getemail()
	{
		return $this->email;
	}
	public function GetPassword()
	{
		return $this->password;
	}
	public function GetTelefono()
	{
		return $this->telefono;
	}
	public function GetFoto()
	{
		return $this->foto;
	}
	public function Getperfil()
	{
		return $this->perfil;
	}
	public function GetEstado()
	{
		return $this->estado;
	}

	public function SetId($valor)
	{
		$this->id = $valor;
	}
	public function SetApellido($valor)
	{
		$this->apellido = $valor;
	}
	public function SetNombre($valor)
	{
		$this->nombre = $valor;
	}
	public function Setemail($valor)
	{
		$this->email = $valor;
	}
	public function SetPassword($valor)
	{
		$this->password = $valor;
	}
	public function SetTelefono($valor)
	{
		$this->telefono = $valor;
	}
	public function SetFoto($valor)
	{
		$this->foto = $valor;
	}
	public function Setperfil($valor)
	{
		$this->perfil = $valor;
	}
	public function SetEstado($valor)
	{
		$this->estado = $valor;
	}
//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($email=NULL)
	{
		if($email != NULL){
			$obj = Persona::TraerUnaPersona($email);
			
			$this->apellido = $obj->apellido;
			$this->nombre = $obj->nombre;
			$this->email = $email;
			$this->password = $password;
			$this->telefono = $obj->telefono;
			$this->foto = $obj->foto;
			$this->perfil = $perfil;
			$this->estado = $obj->estado;
		}
	}

//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  	return $this->apellido."-".$this->nombre."-".$this->email."-".$this->foto;
	}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnaPersona($idParametro) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from persona where id =:id");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$personaBuscada= $consulta->fetchObject('persona');
		return $personaBuscada;				
	}

	public static function TraerPersonaLogin($email, $pass) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from persona where email =:email and password =:password");
		$consulta->bindValue(':email', $email, PDO::PARAM_STR);
		$consulta->bindValue(':password', $pass, PDO::PARAM_STR);
		$consulta->execute();
		$personaBuscada= $consulta->fetchObject('persona');
		return $personaBuscada;				
	}
	
	public static function TraerTodasLasPersonas()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from persona");
		$consulta->execute();			
		$arrPersonas= $consulta->fetchAll(PDO::FETCH_CLASS, "persona");	
		return $arrPersonas;
	}

	public static function TraerTodasLasPersonasSinLocal()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from persona where id not in (SELECT id_encargado as 'id' FROM `sucursal` UNION select id_persona as 'id' from `sucursal_empleado`)");
		$consulta->execute();			
		$arrPersonas= $consulta->fetchAll(PDO::FETCH_CLASS, "persona");	
		return $arrPersonas;
	}

	
	public static function BorrarPersona($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("delete from persona	WHERE id=:id");
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		echo("ok");
		
	}
	
	public static function ModificarPersona($persona)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				update persona 
				set nombre=:nombre,
				apellido=:apellido,
				telefono=:telefono,
				email=:email,
				password=:password,
				foto=:foto,
				perfil=:perfil,
				idLocal=:idLocal,
				estado=:estado
				WHERE id=:id");
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
			$consulta->bindValue(':id',$persona->id, PDO::PARAM_INT);
			$consulta->bindValue(':nombre',$persona->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':apellido', $persona->apellido, PDO::PARAM_STR);
			$consulta->bindValue(':telefono', $persona->telefono, PDO::PARAM_STR);
			$consulta->bindValue(':email', $persona->email, PDO::PARAM_INT);
			$consulta->bindValue(':password', $persona->password, PDO::PARAM_STR);
			
			$consulta->bindValue(':foto', $persona->foto, PDO::PARAM_STR);
			$consulta->bindValue(':perfil', $persona->perfil, PDO::PARAM_STR);
			$consulta->bindValue(':estado', $persona->estado, PDO::PARAM_STR);
			$consulta->bindValue(':id_local',$persona->idLocal, PDO::PARAM_INT);

			return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function InsertarPersona($persona)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into persona (nombre,apellido,email,password,telefono,foto,perfil,estado,id_local)values(:nombre,:apellido,:email,:password,:telefono,:foto,:perfil,:estado,:id_local)");
		$consulta->bindValue(':nombre',$persona->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':apellido', $persona->apellido, PDO::PARAM_STR);
		$consulta->bindValue(':email', $persona->email, PDO::PARAM_INT);
		$consulta->bindValue(':password', $persona->password, PDO::PARAM_INT);
		$consulta->bindValue(':telefono', $persona->telefono, PDO::PARAM_INT);
		$consulta->bindValue(':foto',$persona->foto, PDO::PARAM_STR);
		$consulta->bindValue(':perfil',$persona->perfil, PDO::PARAM_STR);
		$consulta->bindValue(':estado',$persona->estado, PDO::PARAM_STR);
		$consulta->bindValue(':id_local',$persona->idLocal, PDO::PARAM_INT);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	
//--------------------------------------------------------------------------------//



	public static function TraerPersonasTest()
	{
		$arrayDePersonas=array();

		$persona = new stdClass();
		$persona->id = "4";
		$persona->nombre = "rogelio";
		$persona->apellido = "agua";
		$persona->email = "333333";
		$persona->foto = "333333.jpg";

		//$objetJson = json_encode($persona);
		//echo $objetJson;
		$persona2 = new stdClass();
		$persona2->id = "5";
		$persona2->nombre = "Bañera";
		$persona2->apellido = "giratoria";
		$persona2->email = "222222";
		$persona2->foto = "222222.jpg";

		$persona3 = new stdClass();
		$persona3->id = "6";
		$persona3->nombre = "Julieta";
		$persona3->apellido = "Roberto";
		$persona3->email = "888888";
		$persona3->foto = "888888.jpg";

		$arrayDePersonas[]=$persona;
		$arrayDePersonas[]=$persona2;
		$arrayDePersonas[]=$persona3;
		 
		

		return  $arrayDePersonas;
				
	}	


}
