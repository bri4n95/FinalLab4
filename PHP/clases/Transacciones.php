<?php
require_once"AccesoDatos.php";
class Transaccion
{
	public $id;
	public $id_vendedor;
 	public $id_cliente;
 	public $id_sucursal;
 	public $id_inmueble;
 	public $importe;

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetId()
	{
		return $this->id;
	}


	public function SetId($valor)
	{
		$this->id = $valor;
	}


//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($id=NULL)
	{
		if($id != NULL){
			$obj = Transaccion::TraerUnaTransaccion($ID);

			$this->id_vendedor = $obj->id_vendedor;
			$this->id_cliente = $id_cliente;
			$this->id_sucursal = $id_sucursal;
			$this->id_inmueble = $id_inmueble;
			$this->importe = $importe;
		}
	}

//--METODO DE CLASE
	public static function TraerUnaTransaccion($idParametro) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from transaccion where id =:id");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$transaccionBuscada= $consulta->fetchObject('transaccion');
		return $transaccionBuscada;				
	}
	
	public static function TraerTodasLasTransacciones()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from transaccion");
		$consulta->execute();			
		$arrTransacciones= $consulta->fetchAll(PDO::FETCH_CLASS, "transaccion");	
		return $arrTransacciones;
	}

	public static function TraerVentasPorEmpleado($idSucursal)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT t.id_vendedor as 'vendedor_id', CONCAT(p.nombre, ' ' , p.apellido) AS 'empleado', s.nombre as 'nombresucursal', count(*) as 'cantidad' from sucursal as s, transaccion as t, persona as p where s.id =:idsucursal and s.id = t.id_sucursal and p.id = t.id_vendedor GROUP BY t.id_vendedor");
		$consulta->bindValue(':idsucursal', $idSucursal, PDO::PARAM_INT);
		$consulta->execute();			
		$arrVentasPorEmpleado= $consulta->fetchAll(PDO::FETCH_CLASS, "transaccion");	
		return $arrVentasPorEmpleado;
	}

	public static function TraerVentasPorLocal()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT s.nombre as 'nombresucursal', count(*) as 'cantidad' from sucursal as s, transaccion as t where s.id = t.id_sucursal GROUP BY s.nombre");
		$consulta->execute();			
		$arrVentasPorLocal= $consulta->fetchAll(PDO::FETCH_CLASS, "transaccion");	
		return $arrVentasPorLocal;
	}

public static function TraerVentasPorProducto()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT s.descripcion as 'nombresucursal', count(*) as 'cantidad' from producto as s, transaccion as t where s.id = t.id_inmueble GROUP BY s.descripcion");
		$consulta->execute();			
		$arrVentasPorLocal= $consulta->fetchAll(PDO::FETCH_CLASS, "transaccion");	
		return $arrVentasPorLocal;
	}	


	public static function InsertarTransaccion($transaccion)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into transaccion (id_vendedor,id_cliente,id_sucursal,id_inmueble,importe)values(:id_vendedor,:id_cliente,:id_sucursal,:id_inmueble,:importe)");
		$consulta->bindValue(':id_vendedor',$transaccion->idVendedor, PDO::PARAM_INT);
		$consulta->bindValue(':id_cliente', $transaccion->idCliente, PDO::PARAM_INT);
		$consulta->bindValue(':id_sucursal', $transaccion->idSucursal, PDO::PARAM_INT);
		$consulta->bindValue(':id_inmueble', $transaccion->idInmueble, PDO::PARAM_INT);
		$consulta->bindValue(':importe', $transaccion->importe, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();			
	}	

}
