angular.module('TPInmobiliaria.controladorSucursal', [])

app.controller('ControlSucursales', function($scope, $http, $state,jwtHelper, $auth) {
  $scope.flagLogueado = false;

  if($auth.isAuthenticated()){
    $scope.usuarioLogueado = jwtHelper.decodeToken($auth.getToken());
      $scope.flagLogueado = true;
      console.info("usuario", $scope.usuarioLogueado);
  }else{
    $scope.flagLogueado = false;
  }

  $scope.Desloguear=function(){
    $auth.logout();
    $scope.flagLogueado = false;
  }

})

app.controller('ControlAltaSucursal', function($scope, $http, $state, jwtHelper, FileUploader, $auth, ServicioABM, ServicioGeocoding) {
  $("#loadingModal").modal('show');
  $scope.sucursal = {};
  $scope.sucursal.nombre;
  $scope.sucursal.localidad;
  $scope.sucursal.direccion;
  $scope.sucursal.altura;
  $scope.sucursal.latitud;
  $scope.sucursal.longitud;
  $scope.sucursal.email = "suc@suc.com";
  $scope.sucursal.telefono = 123456;
  $scope.sucursal.foto = "";
  $scope.sucursal.idEncargado;
  $scope.subidorDeArchivos = new FileUploader({url:'PHP/nexo.php'});
  $scope.subidorDeArchivos.queueLimit = 3;
  $scope.arrayNombresFotos = [];
  $scope.faltanFotos;
  $scope.listaPersonas;

  if($auth.isAuthenticated()){
    $scope.usuarioLogueado = jwtHelper.decodeToken($auth.getToken());
      console.info("usuario", $scope.usuarioLogueado);
  }else{
    $("#loadingModal").modal('hide');
      $state.go('inicio');
  }

  //traigo los usuarios que no tienen un local asignado para llenar los select del formulario
  ServicioABM.traerPersonasSinLocal().then(function(rta){
      $scope.listaPersonas = rta.data;
      setTimeout(function () {
          $("#loadingModal").modal('hide');
      }, 1000)
    });

  $scope.AltaSucursal = function(){
    $scope.$broadcast('show-errors-check-validity');
    if ($scope.formAltaSucursal.$invalid) { return; }
    if ($scope.arrayNombresFotos.length < 3) {//si no cargó las 3 fotos de la sucursal no lo dejo dar el alta
      $scope.faltanFotos = true;
      return; 
    } 
    $("#loadingModal").modal('show');

    for (var i = 0; i < $scope.subidorDeArchivos.queue.length; i++) {
      if (i==0)
        $scope.sucursal.foto = $scope.arrayNombresFotos[i].data;
      else
        $scope.sucursal.foto = $scope.sucursal.foto + ';' + $scope.arrayNombresFotos[i].data;
    };

    ServicioGeocoding.obtenerCoordenadasMapa($scope.sucursal.direccion, $scope.sucursal.altura).then(
      function(respuesta){
        console.info("RESPUESTA (geocoding): ", respuesta);
        $("#loadingModal").modal('hide');
        if(respuesta.data.results[0] != undefined){
          $scope.sucursal.latitud = respuesta.data.results[0].geometry.location.lat;
          $scope.sucursal.longitud = respuesta.data.results[0].geometry.location.lng;
          console.info("Lat: ",$scope.sucursal.latitud );
          console.info("Long: ",$scope.sucursal.longitud );
          //Si logró obtener las coordenadas de la dirección disparo el alta:
          ServicioABM.alta("sucursal/alta/", $scope.sucursal).then(
          function(respuesta){
            console.info("RESPUESTA (ctrl alta sucursal): ", respuesta);
            $("#loadingModal").modal('hide');
            $state.go('sucursal.grilla');
          },
          function(error){
            console.info("ERROR! (ctrl alta sucursal): ", error);
            $("#loadingModal").modal('hide');
            alert("error al cargar sucursal");
          });
        }else{
          alert("No se pudo obtener las coordenadas para la direccion ingresada");
        }
      },
      function(error){
        console.info("ERROR! (geocoding): ", error);
        $("#loadingModal").modal('hide');
        alert("error al obtener coordenadas");
      });

    
  }

  $scope.subidorDeArchivos.onSuccessItem=function(item, response, status, headers){
      //Obtengo el nombre de la foto al momento del upload
      console.info("ITEM", item._file.name);
      $scope.sucursal.foto = item._file.name;
      $http.post('PHP/nexo.php', { datos: {accion :"uploadFoto",sucursal:$scope.sucursal}})
        .then(function(respuesta) {         
         console.info("respuesta", respuesta);
         $scope.arrayNombresFotos.push(respuesta);//guardo en un array los nombres "finales" de las fotos cargadas a la sucursal
      },function errorCallback(response) {        
          console.info(response);     
        });
    }

})

app.controller('ControlGrillaSucursal', function($scope, $http, $state, $timeout, uiGridConstants, i18nService, NgMap, ServicioABM) {
    $("#cargandoGrillaModal").modal('show');
    // Objeto de configuracion de la grilla.
    $scope.gridOptions = {};
    $scope.gridOptions.enableGridMenu = true;
    $scope.gridOptions.paginationPageSizes = [25, 50, 75];
    // Configuracion de la paginacion
    $scope.gridOptions.paginationPageSize = 25;
    $scope.gridOptions.columnDefs = columnDefs();
    // Activo la busqueda en todos los campos.
    $scope.gridOptions.enableFiltering = true;
    // Configuracion del idioma.
    i18nService.setCurrentLang('es');

    //Exprot cfg------------------------------------
    $scope.gridOptions.exporterCsvFilename = 'ListadoSucursales.csv';
    $scope.gridOptions.exporterCsvColumnSeparator = ';';
    $scope.gridOptions.exporterPdfDefaultStyle = {fontSize: 9};
    $scope.gridOptions.exporterPdfTableStyle = {margin: [1, 1, 1, 1]};
    $scope.gridOptions.exporterPdfHeader = { text: "Listado Sucursales", style: 'headerStyle' };
    $scope.gridOptions.exporterPdfTableHeaderStyle = {fontSize: 10, bold: true, italics: true, color: 'red'};
    $scope.gridOptions.exporterPdfOrientation = 'portrait';
    $scope.gridOptions.exporterPdfPageSize = 'LETTER';
    $scope.gridOptions.exporterPdfMaxGridWidth = 500;
    $scope.gridOptions.exporterPdfCustomFormatter = function ( docDefinition ) {
      docDefinition.styles.headerStyle = { fontSize: 22, bold: true, color: '#1E90FF', alignment:'center' };
      docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
      return docDefinition;
    };
    $scope.export_column_type = 'all';
    $scope.export_row_type = 'all';
    $scope.export_format = 'csv';

    $scope.gridOptions.exporterHeaderFilter = function( displayName ) { 
      if( displayName === 'Name' ) { 
        return 'Person Name'; 
      } else { 
        return displayName;
      } 
    };

    $scope.gridOptions.exporterFieldCallback = function( grid, row, col, input ) {
      if( col.name == 'gender' ){
        switch( input ){
          case 1:
            return 'female';
            break;
          case 2:
            return 'male';
            break;
          default:
            return 'unknown';
            break;
        }
      } else {
        return input;
      }
    };
    $scope.gridOptions.onRegisterApi = function(gridApi){ 
      $scope.gridApi = gridApi;
    };

    //Exprot cfg------------------------------------

    $scope.marker = new google.maps.Marker({
        title: 'default'
      });
    $scope.mapa = {};
    $scope.mapa.latitud = '-34.662716';
    $scope.mapa.longitud = '-58.365113';


    ServicioABM.traerSucursales().then(function(rta){
      // Cargo los datos en la grilla.
      console.info("rta", rta.data);
      $scope.gridOptions.data = rta.data;
      setTimeout(function () {
          $("#cargandoGrillaModal").modal('hide');
      }, 1000)
      
    });


//TODO: SACAR HARDCODED ARRAY ************************
   /* var myArray = Array();
    myArray[0] = JSON.parse('{"id":1,"nombre":"Sucursal 1", "data" : "dataa", "fecha" : "01-01-2000"}');
    myArray[1] = JSON.parse('{"id":2,"nombre":"Sucursal 2", "data" : "dataa", "fecha" : "02-02-2000"}');
    myArray[2] = JSON.parse('{"id":3,"nombre":"Sucursal 3", "data" : "dataa", "fecha" : "03-03-2000"}');
    $scope.gridOptions.data = myArray;

    console.log(uiGridConstants);*/
//TODO: SACAR HARDCODED ARRAY ***********************

    function columnDefs () {
      return [
        { field: 'id', name: 'ID', width: 45},
        { field: 'nombre', name: 'sucursal'
        },
        { field: 'direccion', name: 'direccion'},
        { name: 'Mapa', enableFiltering: false,
          cellTemplate:'<center><button type="button" class="btn btn-info" data-toggle="modal" data-target="#myModal" ng-click="grid.appScope.mostrarMapaModal(row.entity)">Mapa</button></center>', width: 75
        },
        { field: 'email', name: 'email'},
        { field: 'telefono', name: 'telefono'}
      ];
    }

    $scope.mostrarMapaModal = function(rowEntity){
      $scope.ModalHeader = rowEntity.nombre;
      console.info("rowEntity: ", rowEntity);

        NgMap.getMap("miMapaModal").then(function(map) {
          console.log(map.getCenter());
          console.log(map);

          var myLatLng = {lat: Number(rowEntity.latitud), lng: Number(rowEntity.longitud)};
          //elimino el marker anterior del mapa
          $scope.marker.setMap(null);

          $scope.marker = new google.maps.Marker({
            position: myLatLng,
            draggable: true,
            animation: google.maps.Animation.DROP,
            title: rowEntity.nombre
          });

          $scope.marker.setMap(map);

          $("#myModal").on("shown.bs.modal", function(e) {
          google.maps.event.trigger(map, "resize");
           map.setCenter(myLatLng);// Set here center map coordinates
          });

        });
    }

    $scope.export = function(){
      if ($scope.export_format == 'csv') {
        var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
        $scope.gridApi.exporter.csvExport( $scope.export_row_type, $scope.export_column_type, myElement );
      }else if ($scope.export_format == 'pdf') {
        $scope.gridApi.exporter.pdfExport( $scope.export_row_type, $scope.export_column_type );
      }
    }

});

