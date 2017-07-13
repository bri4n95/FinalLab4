angular.module('TPInmobiliaria.controladorInmueble', [])

app.controller('ControlInmueble', function($scope, $http, $state,jwtHelper, $auth) {
  $scope.flagLogueado = false;
$scope.ADMIN = true;
  if($auth.isAuthenticated()){
    $scope.usuarioLogueado = jwtHelper.decodeToken($auth.getToken());
      $scope.flagLogueado = true;
      console.info("usuario", $scope.usuarioLogueado);
      if($scope.usuarioLogueado.perfil!=="admin")
			{$scope.ADMIN = false;
			console.info("usuarioLogueado", $scope.usuarioLogueado);
		}
  }else{
    $scope.flagLogueado = false;
  }

  $scope.Desloguear=function(){
    $auth.logout();
    $scope.flagLogueado = false;
  }

})

app.controller('ControlAltaInmueble', function($scope, $http, $state, jwtHelper, FileUploader, $auth, ServicioABM, ServicioGeocoding) {
  
   $("#loadingModal").modal('show');
   
  $scope.inmueble = {};
  $scope.inmueble.descripcion = "";
  $scope.inmueble.foto = "";
  $scope.inmueble.precio = "";

  $scope.inmueble.ambientes;
  $scope.inmueble.tipo;
  $scope.inmueble.idSucursal = 0;
  $scope.subidorDeArchivos = new FileUploader({url:'PHP/nexo.php'});
  $scope.subidorDeArchivos.queueLimit = 5;
  $scope.arrayNombresFotos = [];
  $scope.faltanFotos;
  $scope.listaSucursales;

  if($auth.isAuthenticated()){
    setTimeout(function () {
          $("#loadingModal").modal('hide');
      }, 10000)
    $scope.usuarioLogueado = jwtHelper.decodeToken($auth.getToken());
      console.info("usuario", $scope.usuarioLogueado);
  }else{
    $("#loadingModal").modal('hide');
      $state.go('inicio');
  }

  //traigo las sucursales para llenar el select del formulario
  ServicioABM.traerSucursales().then(function(rta){
      $scope.listaSucursales = rta.data;
      setTimeout(function () {
          $("#loadingModal").modal('hide');
      }, 1000)
    });

  $scope.AltaInmueble = function(){
    $scope.inmueble.idVendedor = $scope.usuarioLogueado.id;
    console.info("INMUEBLE ALTA: ", $scope.inmueble);
    $scope.$broadcast('show-errors-check-validity');
    if ($scope.formAltaInmueble.$invalid) { return; }
    if ($scope.arrayNombresFotos.length > 5) {//si no cargó las 3 fotos del inmueble no lo dejo dar el alta
      $scope.faltanFotos = true;
      return; 
    } 
    $("#loadingModal").modal('show');

    for (var i = 0; i < $scope.subidorDeArchivos.queue.length; i++) {
      if (i==0)
        $scope.inmueble.foto = $scope.arrayNombresFotos[i];
      else
        $scope.inmueble.foto = $scope.inmueble.foto + ',' + $scope.arrayNombresFotos[i];
    };
    console.info("inmueble:",$scope.inmueble);

   /* ServicioGeocoding.obtenerCoordenadasMapa($scope.inmueble.direccion, $scope.inmueble.altura).then(
      function(respuesta)
      {
        console.info("RESPUESTA (geocoding): ", respuesta);
        $("#loadingModal").modal('hide');
        if(respuesta.data.results[0] != undefined){
          $scope.inmueble.latitud = respuesta.data.results[0].geometry.location.lat;
          $scope.inmueble.longitud = respuesta.data.results[0].geometry.location.lng;
          console.info("Lat: ",$scope.inmueble.latitud );
          console.info("Long: ",$scope.inmueble.longitud );
          //Si logró obtener las coordenadas de la dirección disparo el alta:
          */ServicioABM.alta("inmueble/alta/", $scope.inmueble).then(
            function(respuesta)
            {
              console.info("RESPUESTA (ctrl alta inmueble): ", respuesta);
              $("#loadingModal").modal('hide');
              $state.go('inmueble.catalogo');
          },
            function(error){
              console.info("ERROR! (ctrl alta inmueble): ", error);
              $("#loadingModal").modal('hide');
              alert("error al cargar inmueble");
            }
          );
        
    
      

  }

  $scope.subidorDeArchivos.onSuccessItem=function(item, response, status, headers){
      //Obtengo el nombre de la foto al momento del upload
      console.info("ITEM", item._file.name);
      $scope.inmueble.foto = item._file.name;
      $http.post('PHP/nexo.php', { datos: {accion :"uploadFotoInmueble",inmueble:$scope.inmueble}})
        .then(function(respuesta) {         
         console.info("respuesta", respuesta);
         $scope.arrayNombresFotos.push(respuesta.data);//guardo en un array los nombres "finales" de las fotos cargadas del inmueble
      },function errorCallback(response) {        
          console.info(response);     
        });
    }
})

app.controller('ControlCatalogoInmueble', function($scope, $http, $state,jwtHelper, $auth,NgMap, $window, ServicioABM) {
  $("#cargandoCatalogoModal").modal('show');
  $scope.flagLogueado = false;
  $scope.listaInmuebles = [];
    


$scope.mostrarSelect = true;
  
  ServicioABM.traer("sucursales").then(function(rta){
      $scope.listaSucursales = rta.data;
      setTimeout(function () {
          $("#loadingModal").modal('hide');
      }, 1000)
  });

$scope.ADMIN = true;
$scope.LOCAL = false;
	    
	   
		 
		 


  if($auth.isAuthenticated()){
    $scope.usuarioLogueado = jwtHelper.decodeToken($auth.getToken());
    //  $scope.flagLogueado = true;	
    console.info("usuarioLogueado", $scope.usuarioLogueado); alert("DEBE SELECCIONAR EL LOCAL DONDE COMPRARA!"); 
 if($scope.usuarioLogueado.perfil!=="admin")
			{$scope.ADMIN = false;
			console.info("usuarioLogueado", $scope.usuarioLogueado);
		}



  }else{
    $scope.flagLogueado = false;
    $("#cargandoCatalogoModal").modal('hide');
      $state.go('inicio');
  }

  $scope.Desloguear=function(){
    $auth.logout();
    $scope.flagLogueado = false;
  }

  $scope.marker = new google.maps.Marker({
        title: 'default'
      });
    $scope.mapa = {};
    $scope.mapa.latitud = '-34.662716';
    $scope.mapa.longitud = '-58.365113';

  //traigo las sucursales para llenar el select del formulario
  ServicioABM.traer("inmuebles").then(function(rta){
      $scope.listaInmuebles = rta.data;
      console.info("inmuebles:", $scope.listaInmuebles);
      for (i = 0; i < $scope.listaInmuebles.length; i++) {
        $scope.listaInmuebles[i].fotosArray = [];//Cargo un nuevo array con obj de tipo json para que el carousel pueda levantar las fotos 
        $scope.listaInmuebles[i].foto = $scope.listaInmuebles[i].foto.split(',');
        for (j = 0; j < $scope.listaInmuebles[i].foto.length; j++) {
          $scope.listaInmuebles[i].fotosArray.push(JSON.parse("{" + '"src"' + ":" + '"' + "./fotos/" + $scope.listaInmuebles[i].foto[j] + '"' + "}"));
        }
      }
      console.info("inmuebles after transformation:", $scope.listaInmuebles);
      setTimeout(function () {
          $("#cargandoCatalogoModal").modal('hide');
      }, 1000)
  });

  $scope.IdSucu;
  
  
  
  $scope.Seleccionar=function(value){  
    $scope.LOCAL = true;
     alert("Local Seleccionado"); 

};
    
  $scope.Borrar=function(inmu){  
    if (confirm('seguro que desea borrar el producto?')) { 
     
      console.info("IDPRODCT: ", inmu.id);
     ServicioABM.Borrar("inmueble/baja/", inmu.id).then(
            function(respuesta)
            {
              console.info("RESPUESTA (BAJA PRODUCTO): ", respuesta);
              $("#loadingModal").modal('hide');
              $state.go('inicio');
          },
            function(error){
              console.info("ERROR!(BAJA PRODUCTO): ", error);
              $("#loadingModal").modal('hide');
              alert("error aldar de baja");
            }
          );
  }
};

  $scope.reservarInmueble=function(inmueble){
   
   
    var objTransaccion = {



      idVendedor : inmueble.id_vendedor,
      idCliente : $scope.usuarioLogueado.id,
      idSucursal :  $scope.IdSucu,
      idInmueble : inmueble.id,
      importe : inmueble.precio
      
    };
    
    
    


  

    ServicioABM.alta("transaccion/alta/", objTransaccion).then(
      function(respuesta){
        console.info("RESPUESTA (ctrl alta transaccion): ", respuesta);
        $("#loadingModal").modal('hide');
        alert("transaccion concretada");
        //$state.go('inmueble.catalogo');
      },
      function(error){
        console.info("ERROR! (ctrl alta transaccion): ", error);
        $("#loadingModal").modal('hide');
        alert("error al cargar transaccion");
      });             
  }

  $scope.mostrarMapaModal = function(inmueble){
      $scope.ModalHeader = inmueble.direccion + " " + inmueble.altura;
      console.info("inmueble: ", inmueble);

        NgMap.getMap("miMapaModal").then(function(map) {
          console.log(map.getCenter());
          console.log(map);

          var myLatLng = {lat: Number(inmueble.latitud), lng: Number(inmueble.longitud)};
          //elimino el marker anterior del mapa
          $scope.marker.setMap(null);

          $scope.marker = new google.maps.Marker({
            position: myLatLng,
            draggable: true,
            animation: google.maps.Animation.DROP,
            title: inmueble.nombre
          });

          $scope.marker.setMap(map);

          $("#myModal").on("shown.bs.modal", function(e) {
          google.maps.event.trigger(map, "resize");
           map.setCenter(myLatLng);// Set here center map coordinates
          });

        });
    }

  /**********************
   *FUNCIONES PAGINACIÓN*
   **********************/
  $scope.currentPage = 0;
  $scope.pageSize = 4;

  $scope.nextPage=function(){
    $scope.currentPage = $scope.currentPage +1;
    $window.scrollTo(0, 0);               
  }

  $scope.backPage=function(){
    $scope.currentPage = $scope.currentPage -1;
    $window.scrollTo(0, 0);               
  }
  
  $scope.numberOfPages=function(){
    return Math.ceil($scope.listaInmuebles.length/$scope.pageSize);                
  }

  function loadPages() {
    console.log('Current page is : ' + $scope.paging.current);
    $scope.currentPage = $scope.paging.current;
  }
  //fin FUNCIONES PAGINACIÓN
})


app.filter('startFrom', function() {
  return function(input, start) {
    start = +start; //parse to int
    return input.slice(start);
  }
});