angular.module('TPInmobiliaria.controladorEstadisticas', [])

app.controller('ControlEstadisticas', function($scope, $http, $state,jwtHelper, $auth) {
  $scope.mostrarSelect = false;
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

app.controller('ControlVentasPorLocal', function($scope, $http, $state,jwtHelper, $auth, $timeout, ServicioABM) {
  var sucursales = [];
  var cantidadVentasSucursal = [];
  ServicioABM.traer('transacciones/ventasporlocal').then(
    function(rta){
      $scope.ventas = rta.data;
      $("#loadingModal").modal('hide');
    },function(error){
      $("#loadingModal").modal('hide');
      $scope.ventas = [];
  });

  $timeout(function() {
    $scope.ventas.forEach(function(venta){
        cantidadVentasSucursal.push(venta.cantidad);
        sucursales.push(venta.nombresucursal);
    });

    Highcharts.chart('miGrafico', {
      chart: {
          type: 'column',
          options3d: {
                  enabled: true,
                  alpha: 10,
                  beta: 25,
                  depth: 70
              }
      },
      title: {
          text: 'Ventas por Sucursal'
      },
      xAxis: {
          categories: sucursales
      },
      yAxis: {
          title: {text: null}
      },
      series: [{
          name: 'Ventas',
          data: cantidadVentasSucursal
      }]
    });
  }, 1000); 

})

app.controller('ControlVentasPorEmpleado', function($scope, $http, $state,jwtHelper, $auth, $timeout, ServicioABM) {
  $scope.mostrarSelect = true;
  
  ServicioABM.traer("inmuebles").then(function(rta){
      $scope.listaInmuebles = rta.data;
      setTimeout(function () {
          $("#loadingModal").modal('hide');
      }, 1000)
  });

 $scope.ventasPorEmpleado = function(idSucursal){
    var listaEmpleados = [];
    var cantidadVentasEmpleado = [];
    var ventas = [];

    ServicioABM.traerVentasPorEmpleado('transacciones/ventasporempleado/', idSucursal).then(
      function(rta){
        ventas = rta.data;
        $("#loadingModal").modal('hide');
      },function(error){
        $("#loadingModal").modal('hide');
        ventas = [];
    });

    $timeout(function() {
      ventas.forEach(function(venta){
          cantidadVentasEmpleado.push(venta.cantidad);
          listaEmpleados.push(venta.empleado);
          $scope.nombreSucursal = venta.nombresucursal;
      });

  
      Highcharts.chart('miGrafico', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Ventas Por Empleado'
        },
        subtitle: {
            text: 'Ranking de ventas por empleado de la sucursal: ' + $scope.nombreSucursal
        },
        xAxis: {
            categories: listaEmpleados,
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Ventas',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Ventas',
            data: cantidadVentasEmpleado
        }]
      });
    }, 1000); 
  }

})

app.controller('ControlEstadisticasEncuestas', function($scope, $http, $state,jwtHelper, $auth, $timeout, ServicioABM) {


});


app.controller('ControlVentasPorProducto', function($scope, $http, $state,jwtHelper, $auth, $timeout, ServicioABM) {
  var sucursales = [];
  var cantidadVentasSucursal = [];
  ServicioABM.traer('transacciones/ventasporproducto').then(
    function(rta){
      $scope.ventas = rta.data;
      $("#loadingModal").modal('hide');
    },function(error){
      $("#loadingModal").modal('hide');
      $scope.ventas = [];
  });

  $timeout(function() {
    $scope.ventas.forEach(function(venta){
        cantidadVentasSucursal.push(venta.cantidad);
        sucursales.push(venta.nombresucursal);
    });

    Highcharts.chart('miGrafico', {
      chart: {
          type: 'column',
          options3d: {
                  enabled: true,
                  alpha: 10,
                  beta: 25,
                  depth: 70
              }
      },
      title: {
          text: 'Ventas por Producto'
      },
      xAxis: {
          categories: sucursales
      },
      yAxis: {
          title: {text: null}
      },
      series: [{
          name: 'Ventas',
          data: cantidadVentasSucursal
      }]
    });
  }, 1000); 

})