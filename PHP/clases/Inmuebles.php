<?php
require_once"AccesoDatos.php";
class Inmueble
{
	public $id;
	public $descripcion;
 	public $direccion;
 	public $precio;
  	public $tipo;
  	public $foto;

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetId()
	{
		return $this->id;
	}
	public function GetIdSucursal()
	{
		return $this->idSucursal;
	}
	public function Getdescripcion()
	{
		return $this->descripcion;
	}
	public function GetDireccion()
	{
		return $this->direccion;
	}
	public function Getprecio()
	{
		return $this->precio;
	}
	public function GetTipo()
	{
		return $this->tipo;
	}
	public function GetFoto()
	{
		return $this->foto;
	}

	public function SetId($valor)
	{
		$this->id = $valor;
	}
	public function SetIdSucursal($valor)
	{
		$this->idSucursal = $valor;
	}
	public function SetDescripcion($valor)
	{
		$this->descripcion = $valor;
	}
	public function SetDireccion($valor)
	{
		$this->direccion = $valor;
	}
	public function SetPrecio($valor)
	{
		$this->precio = $valor;
	}
	public function Settipo($valor)
	{
		$this->tipo = $valor;
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
			$obj = Inmueble::TraerUnInmueble($ID);

			$this->descripcion = $obj->descripcion;
			$this->direccion = $direccion;
			$this->precio = $precio;
			$this->tipo = $obj->tipo;
			$this->foto = $obj->foto;
		}
	}

//--METODO DE CLASE
	public static function TraerUnInmueble($idParametro) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from producto where id =:id");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$inmuebleBuscado= $consulta->fetchObject('inmueble');
		return $inmuebleBuscado;				
	}
	
	public static function TraerTodosLosInmuebles()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from producto");
		$consulta->execute();			
		$arrInmuebles= $consulta->fetchAll(PDO::FETCH_CLASS, "inmueble");	
		return $arrInmuebles;
	}
	
	public static function BorrarInmueble($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("delete from producto WHERE id=:id");
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
	}
	
	public static function ModificarInmueble($inmueble)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				update producto 
				set descripcion=:descripcion,
				direccion=:direccion,
				altura=:altura,
				latitud=:latitud,
				longitud=:longitud,
				precio=:precio,
				ambientes=:ambientes,
				oferta=:oferta,
				tipo=:tipo,
				foto=:foto,
				id_sucursal = :idsucursal,
				id_vendedor = :idvendedor
				WHERE id=:id");
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
			$consulta->bindValue(':id',$inmueble->id, PDO::PARAM_INT);
			$consulta->bindValue(':descripcion',$inmueble->descripcion, PDO::PARAM_STR);
			$consulta->bindValue(':direccion', $inmueble->direccion, PDO::PARAM_STR);
			$consulta->bindValue(':altura', $inmueble->altura, PDO::PARAM_INT);
			$consulta->bindValue(':latitud', $inmueble->latitud, PDO::PARAM_STR);
			$consulta->bindValue(':longitud', $inmueble->longitud, PDO::PARAM_STR);
			$consulta->bindValue(':precio', $inmueble->precio, PDO::PARAM_STR);
			$consulta->bindValue(':ambientes', $inmueble->ambientes, PDO::PARAM_INT);
			$consulta->bindValue(':oferta', $inmueble->tipoOferta, PDO::PARAM_STR);
			$consulta->bindValue(':tipo', $inmueble->tipo, PDO::PARAM_STR);
			$consulta->bindValue(':foto', $inmueble->foto, PDO::PARAM_STR);
			$consulta->bindValue(':id_sucursal',$inmueble->idVendedor, PDO::PARAM_INT);
			$consulta->bindValue(':id_vendedor',$inmueble->idSucursal, PDO::PARAM_INT);
			return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function InsertarInmueble($inmueble)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into producto 
		(descripcion,tipo,precio,ambientes,foto,id_sucursal,id_vendedor)
		values(:descripcion,:tipo,:precio,:ambientes,:foto,:id_sucursal,:id_vendedor)");
		$consulta->bindValue(':descripcion',$inmueble->descripcion, PDO::PARAM_STR);
		$consulta->bindValue(':tipo', $inmueble->tipo, PDO::PARAM_STR);
		$consulta->bindValue(':precio', $inmueble->precio, PDO::PARAM_STR);
		$consulta->bindValue(':ambientes', $inmueble->ambientes, PDO::PARAM_INT);
		//$consulta->bindValue(':oferta', $inmueble->tipoOferta, PDO::PARAM_STR);

		$consulta->bindValue(':foto',$inmueble->foto, PDO::PARAM_STR);
		$consulta->bindValue(':id_sucursal',"2", PDO::PARAM_INT);//$consulta->bindValue(':id_sucursal',$inmueble->idSucursal, PDO::PARAM_INT);
			$consulta->bindValue(':id_vendedor',$inmueble->idVendedor, PDO::PARAM_INT);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();			
	}	

	public static function InsertarInmueble2($inmueble)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into producto 
		(descripcion,tipo,precio,ambientes,foto,id_sucursal,id_vendedor)
		values(:descripcion,:tipo,:precio,:ambientes,:foto,:id_sucursal,:id_vendedor)");
		$consulta->bindValue(':descripcion',"asd", PDO::PARAM_STR);
		$consulta->bindValue(':tipo', "asd", PDO::PARAM_STR);
		$consulta->bindValue(':precio', "2", PDO::PARAM_STR);
		$consulta->bindValue(':ambientes',"2", PDO::PARAM_INT);
		//$consulta->bindValue(':oferta', $inmueble->tipoOferta, PDO::PARAM_STR);

		$consulta->bindValue(':foto',"asd", PDO::PARAM_STR);
		$consulta->bindValue(':id_sucursal',"2", PDO::PARAM_INT);
		$consulta->bindValue(':id_vendedor',"2", PDO::PARAM_INT);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();			
	}	

}
