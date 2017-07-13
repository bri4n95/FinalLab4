angular.module('TPInmobiliaria.controladorUsuario', [])

app.controller('ControlUsuarios', function($scope, $http, $state, jwtHelper, $auth) {
	$scope.flagLogueado = false;
$scope.ADMIN = true;
	if($auth.isAuthenticated()){
	$scope.usuarioLogueado = jwtHelper.decodeToken($auth.getToken());
	  $scope.flagLogueado = true;
	  console.info("usuario", $scope.usuarioLogueado);
    if($scope.usuarioLogueado.perfil!=="admin")
			{$scope.ADMIN = false;
			console.info("usuarioLogueado", $scope.usuarioLogueado);
	 }}else{
	  $scope.flagLogueado = false;
	}

	$scope.Desloguear=function(){
	  $auth.logout();
	  $scope.flagLogueado = false;
	}

});

app.controller('ControlAccesoUsuarios', function($scope, $http, $state, $auth, ServicioABM, jwtHelper) {
	$("#loadingModal").modal('show');
	$scope.usuario={};
	$scope.usuario.nombre = "";
	$scope.usuario.apellido = "";
	$scope.usuario.telefono ;
	$scope.usuario.email = "";
	$scope.usuario.password = "";
	$scope.usuario.password2 = "";
	$scope.usuario.foto = "foto.jpg";
	$scope.usuario.perfil = "";
	$scope.usuario.estado = "activo";
	$scope.usuario.idLocal;
	$scope.listaUsuarios;

	if($auth.isAuthenticated()){
    $scope.usuarioLogueado = jwtHelper.decodeToken($auth.getToken());
      console.info("usuarioLogueado", $scope.usuarioLogueado);
    }else{
    $("#loadingModal").modal('hide');
      $state.go('inicio');
    }

    //traigo el listado de sucursales para llenar el select del formulario
    ServicioABM.traerPersonas().then(function(rta){
      console.info("rta", rta.data);
      $scope.listaUsuarios = rta.data;
      setTimeout(function () {
          $("#loadingModal").modal('hide');
      }, 1000)
    });

	$scope.CrearUsuario = function(){
	  $scope.$broadcast('show-errors-check-validity');
	  if ($scope.formAltaUsuario.$invalid) { return; }
	  $scope.usuario.idLocal = Number($scope.usuario.idLocal);
	  ServicioABM.alta("alta/", $scope.usuario).then(
      function(respuesta){
      console.info("RESPUESTA (ctrl alta usuario): ", respuesta);
      $state.go('inicio');
      },
      function(error){
        console.info("ERROR! (ctrl alta usuario): ", error);
        alert("ERROR AL CREAR USUARIO");
      });
	}

})
app.controller('ControlGrillaUsuario', function($scope, $http, $state, $timeout, $auth, uiGridConstants, i18nService, NgMap, ServicioABM) {
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
    $scope.gridOptions.exporterCsvFilename = 'ListadoUsuarios.csv';
    $scope.gridOptions.exporterCsvColumnSeparator = ';';
    $scope.gridOptions.exporterPdfDefaultStyle = {fontSize: 9};
    $scope.gridOptions.exporterPdfTableStyle = {margin: [1, 1, 1, 1]};
    $scope.gridOptions.exporterPdfHeader = { text: "Listado Usuarios", style: 'headerStyle' };
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


    ServicioABM.traerPersonas().then(function(rta){
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
    if($auth.getPayload().perfil=="admin"  ){
    return [
        { field: 'id', name: 'ID', width: 45},
        { field: 'nombre', name: 'User'},
     
        { field: 'perfil', name: 'Puesto'},
        { field: 'email', name: 'email'},  { field: 'password', name: 'Password'},
        { field: 'telefono', name: 'telefono'},
        { field: 'borrar', name: 'borrar'
        ,cellTemplate:'<button ng-click="grid.appScope.deleteRow(row)" class="btn btn-danger btn-sm"><i class="glyphicon glyphicon-trash">&nbsp;Borrar</i></button>'
        , enableFiltering: false},
       
      ];
    }else if($auth.getPayload().perfil=="encargado" ){
    return [ { field: 'id', name: 'ID', width: 45},
        { field: 'nombre', name: 'User' },
        
        { field: 'email', name: 'email'},
        { field: 'telefono', name: 'telefono'},
         
      ];
    }else {
    return [
        { field: 'id', name: 'ID', width: 45},
        { field: 'nombre', name: 'User' },
        
        { field: 'email', name: 'email'},
        { field: 'telefono', name: 'telefono'}];

      }




  }
	$scope.deleteRow = function(row) {
 
    var index = $scope.gridOptions.data.indexOf(row.entity);
   console.info("row a borrar ",index);
   console.info("row a id ",row.id);
   
    
    if (confirm('seguro que desea borrar al usuario?')) { 
    
    
    ServicioABM.Borrar("personas/borrar/", row.entity.id).then(
            function(respuesta)
            { 
              $scope.gridOptions.data.splice(index, 1);
              console.info("RESPUESTA (BAJA USUARIO): ", respuesta);
              $("#loadingModal").modal('hide');
              
          },
            function(error){
              console.info("ERROR!(BAJA USUARIO): ", error);
              $("#loadingModal").modal('hide');
              alert("error al dar de baja");
            }
          );
  } };
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



