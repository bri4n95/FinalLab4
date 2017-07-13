angular.module('TPInmobiliaria.servicioABM', [])

.service('ServicioABM', function ($http) {
    this.Nombre="servicio ABM";
    var Url="http://localhost:8080/BrianRoberts/ws/";

    function traerURL(Parametro){
        return Url;
    }

	this.alta = function (ruta, obj) {
		console.info("Street Figther: ",JSON.stringify(obj));
		return $http.post(traerURL() + ruta + JSON.stringify(obj)).then(
		function(respuesta){
			console.info("RESPUESTA (Servicio Alta): ", respuesta);
			return respuesta; 
		},
		function(error){
			console.info("ERROR (Servicio Alta):", error);
		return error;
		});
	}
	this.Borrar = function(ruta,id){
		return $http.delete(traerURL()+ruta+id)
		.then(function(respuesta) {     	
			
			return respuesta.data;

		}); 
	}
	this.Modificar = function(id){
		return $http.put(traerURL()+id)
		.then(function(respuesta) {     	
			
			return respuesta.data;

		}); 
	}

    this.traerSucursales = function () {
       return $http.get(traerURL() + "inmuebles").then(
		function(respuesta){
			console.info("RESPUESTA (Servicio traerSucursales): ", respuesta);
			return respuesta; 
		},
		function(error){
			console.info("ERROR (Servicio traerSucursales):", error);
		return error;
		});
    }

    this.traerPersonas = function () {
       return $http.get(traerURL()+ "personas").then(
		function(respuesta){
			console.info("RESPUESTA (Servicio traerPersonas): ", respuesta);
			return respuesta; 
		},
		function(error){
			console.info("ERROR (Servicio traerPersonas):", error);
		return error;
		});
    }

    this.traer = function (ruta) {
       return $http.get(traerURL() + ruta).then(
		function(respuesta){
			console.info("RESPUESTA (Servicio traer): ", respuesta);
			return respuesta; 
		},
		function(error){
			console.info("ERROR (Servicio traer):", error);
		return error;
		});
    }

    this.traerPersonasSinLocal = function () {
       return $http.get(traerURL() + "personas/sinlocal/").then(
		function(respuesta){
			console.info("RESPUESTA (Servicio traerPersonas): ", respuesta);
			return respuesta; 
		},
		function(error){
			console.info("ERROR (Servicio traerPersonas):", error);
		return error;
		});
    }

    this.traerVentasPorEmpleado = function (ruta, idSucursal) {
       return $http.get(traerURL() +ruta + idSucursal).then(
		function(respuesta){
			console.info("RESPUESTA (Servicio traerPersonas): ", respuesta);
			return respuesta; 
		},
		function(error){
			console.info("ERROR (Servicio traerPersonas):", error);
		return error;
		});
    }

});