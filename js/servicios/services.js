angular.module('TPInmobiliaria.services', [])

.factory('UsuarioLogueado', function () {
        var usuarioLogueado = {};
        usuarioLogueado.nombre;
        usuarioLogueado.apellido;
        usuarioLogueado.telefono;
        usuarioLogueado.email;
        usuarioLogueado.password;
        usuarioLogueado.estaLogueado = false;

        usuarioLogueado.setNombre = function (value) {
            this.nombre = value;
        };

        usuarioLogueado.setApellido = function (value) {
            this.apellido = value;
        };

        usuarioLogueado.setTelefono = function (value) {
            this.telefono = value;
        };

        usuarioLogueado.setEmail = function (value) {
            this.email = value;
        };

        usuarioLogueado.setPassword = function (value) {
            this.password = value;
        };

        usuarioLogueado.setEstaLogueado = function (value) {
            this.estaLogueado = value;
        };

        usuarioLogueado.getNombre = function () {
            return usuarioLogueado.nombre;
        };

        usuarioLogueado.getApellido = function () {
            return usuarioLogueado.apellido;
        };

        usuarioLogueado.getTelefono = function () {
            return usuarioLogueado.telefono;
        };

        usuarioLogueado.getEmail = function () {
            return usuarioLogueado.email;
        };

        usuarioLogueado.getPassword = function () {
            return usuarioLogueado.password;
        };

        usuarioLogueado.getEstaLogueado = function () {
            return usuarioLogueado.estaLogueado;
        };

        return usuarioLogueado;
});