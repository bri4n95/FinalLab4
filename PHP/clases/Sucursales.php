<?php
require_once"AccesoDatos.php";
class Sucursal
{
	public $id;
	public $nombre;
 	public $direccion;
 	public $email;
  	public $telefono;
  	public $foto;

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetId()
	{
		return $this->id;
	}
	public function GetNombre()
	{
		return $this->nombre;
	}
	public function GetDireccion()
	{
		return $this->direccion;
	}
	public function GetEmail()
	{
		return $this->email;
	}
	public function GetTelefono()
	{
		return $this->telefono;
	}
	public function GetFoto()
	{
		return $this->foto;
	}

	public function SetId($valor)
	{
		$this->id = $valor;
	}
	public function SetNombre($valor)
	{
		$this->nombre = $valor;
	}
	public function SetDireccion($valor)
	{
		$this->direccion = $valor;
	}
	public function SetEmail($valor)
	{
		$this->email = $valor;
	}
	public function SetTelefono($valor)
	{
		$this->telefono = $valor;
	}
	public function SetFoto($valor)
	{
		$this->foto = $valor;
	}

//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($id=NULL)
	{
		if($id != NULL){
			$obj = Sucursal::TraerUnaSucursal($ID);

			$this->nombre = $obj->nombre;
			$this->direccion = $direccion;
			$this->email = $email;
			$this->telefono = $obj->telefono;
			$this->foto = $obj->foto;
		}
	}

//--METODO DE CLASE
	public static function TraerUnaSucursal($idParametro) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from sucursal where id =:id");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$personaBuscada= $consulta->fetchObject('sucursal');
		return $personaBuscada;				
	}
	
	public static function TraerTodasLasSucursales()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from sucursal");
		$consulta->execute();			
		$arrSucursales= $consulta->fetchAll(PDO::FETCH_CLASS, "sucursal");	
		return $arrSucursales;
	}
	
	public static function BorrarSucursal($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("delete from sucursal WHERE id=:id");
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
	}
	
	public static function ModificarSucursal($sucursal)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				update sucursal 
				set nombre=:nombre,
				direccion=:direccion,
				altura=:altura,
				latitud=:latitud,
				longitud=:longitud,
				email=:email,
				telefono=:telefono,
				foto=:foto
				WHERE id=:id");
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
			$consulta->bindValue(':id',$sucursal->id, PDO::PARAM_INT);
			$consulta->bindValue(':nombre',$sucursal->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':direccion', $sucursal->direccion, PDO::PARAM_STR);
			$consulta->bindValue(':altura', $sucursal->altura, PDO::PARAM_INT);
			$consulta->bindValue(':latitud', $sucursal->latitud, PDO::PARAM_INT);
			$consulta->bindValue(':longitud', $sucursal->longitud, PDO::PARAM_INT);
			$consulta->bindValue(':email', $sucursal->email, PDO::PARAM_STR);
			$consulta->bindValue(':telefono', $sucursal->telefono, PDO::PARAM_STR);
			$consulta->bindValue(':foto', $sucursal->foto, PDO::PARAM_STR);
			return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function InsertarSucursal($sucursal)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into sucursal (nombre,direccion,altura,latitud,longitud,email,telefono,foto,id_encargado)values(:nombre,:direccion,:altura,:latitud,:longitud,:email,:telefono,:foto,:id_encargado)");
		$consulta->bindValue(':nombre',$sucursal->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':direccion', $sucursal->direccion, PDO::PARAM_STR);
		$consulta->bindValue(':altura', $sucursal->altura, PDO::PARAM_INT);
		$consulta->bindValue(':latitud', $sucursal->latitud, PDO::PARAM_STR);
		$consulta->bindValue(':longitud', $sucursal->longitud, PDO::PARAM_STR);
		$consulta->bindValue(':email', $sucursal->email, PDO::PARAM_STR);
		$consulta->bindValue(':telefono', $sucursal->telefono, PDO::PARAM_INT);
		$consulta->bindValue(':foto',$sucursal->foto, PDO::PARAM_STR);
		$consulta->bindValue(':id_encargado',$sucursal->idEncargado, PDO::PARAM_INT);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();			
	}	

}
