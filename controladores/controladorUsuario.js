angular.module('TPInmobiliaria.controladorUsuario', [])

app.controller('ControlUsuarios', function($scope, $http, $state, jwtHelper, $auth) {
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
	$scope.listaSucursales;

	if($auth.isAuthenticated()){
    $scope.usuarioLogueado = jwtHelper.decodeToken($auth.getToken());
      console.info("usuarioLogueado", $scope.usuarioLogueado);
    }else{
    $("#loadingModal").modal('hide');
      $state.go('inicio');
    }

    //traigo el listado de sucursales para llenar el select del formulario
    ServicioABM.traerSucursales().then(function(rta){
      console.info("rta", rta.data);
      $scope.listaSucursales = rta.data;
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


