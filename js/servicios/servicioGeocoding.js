angular.module('TPInmobiliaria.servicioGeocoding', [])

.service('ServicioGeocoding', function ($http) {
    var Url="https://maps.googleapis.com/maps/api/geocode/json?address=";
    var MiAPIKey = "+CA&key=AIzaSyB3nA0hT-tFLjMKwjU8q6smHDlwboaeI50";
    var Ciudad = "+Buenos+Aires";

    function traerURL(){
        return Url;
    }

    function traerAPIKey(){
        return MiAPIKey;
    }

    function traerCiudad(){
        return Ciudad;
    }

	this.obtenerCoordenadasMapa = function (direccion, altura) {
		return $http.get(traerURL() + direccion + "+" + altura + "," + traerCiudad() + "," + traerAPIKey()).then(
		function(respuesta){
			console.info("RESPUESTA (Servicio Geocoding): ", respuesta);
			return respuesta; 
		},
		function(error){
			console.info("ERROR (Servicio Geocoding):", error);
			return error;
		});
	}

});