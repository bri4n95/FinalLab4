-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-07-2017 a las 09:34:10
-- Versión del servidor: 10.1.19-MariaDB
-- Versión de PHP: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `brianroberts`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `apellido` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `password` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `telefono` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `foto` varchar(200) COLLATE utf8_spanish2_ci NOT NULL,
  `perfil` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `estado` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `id_local` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`id`, `nombre`, `apellido`, `email`, `password`, `telefono`, `foto`, `perfil`, `estado`, `id_local`) VALUES
(1, 'BraaADMIN', 'Roberts', 'braa@admin', 'bra123', '12345678', 'foto.jpg', 'admin', 'activo', NULL),
(2, 'EzeENCARGADO', 'robrts', 'eze@encargado', '123456', '123123', 'foto.jpg', 'encargado', 'activo', NULL),
(3, 'MaggyEMPLEADA', 'ROBTS', 'maggy@empleada', '123456', '1235123', 'foto.jpg', 'empleado', 'activo', NULL),
(5, 'asd', 'asd', 'asd@asd.com', 'asd', '12345678', 'foto.jpg', 'cliente', 'activo', 1),
(6, 'qqqq', 'qqqq', 'qqqq@qqqq', 'qqqq', '12345678', 'foto.jpg', 'cliente', 'activo', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id` int(11) NOT NULL,
  `descripcion` text COLLATE utf8_spanish2_ci NOT NULL,
  `precio` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  `ambientes` int(11) NOT NULL,
  `tipo` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  `foto` varchar(200) COLLATE utf8_spanish2_ci NOT NULL,
  `id_sucursal` int(11) NOT NULL,
  `id_vendedor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id`, `descripcion`, `precio`, `ambientes`, `tipo`, `foto`, `id_sucursal`, `id_vendedor`) VALUES
(1, 'Jamon y Morrones', '145', 10, 'Pizza', '1499919439879-inmueble.jpg,1499919440543-inmueble.jpg,1499919441333-inmueble.jpg', 2, 1),
(3, 'Milanesas', '99', 50, 'Minuta', '1499919529292-inmueble.jpg,1499919529718-inmueble.jpg,1499919530396-inmueble.jpg', 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sucursal`
--

CREATE TABLE `sucursal` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `direccion` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `altura` int(11) NOT NULL,
  `latitud` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `longitud` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `telefono` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `foto` varchar(200) COLLATE utf8_spanish2_ci NOT NULL,
  `id_encargado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `sucursal`
--

INSERT INTO `sucursal` (`id`, `nombre`, `direccion`, `altura`, `latitud`, `longitud`, `email`, `telefono`, `foto`, `id_encargado`) VALUES
(1, 'ArgentaLOMAS', 'Palacios', 1223, '-34.6435953', '-58.3673602', 'pedidos@ArgentaLOMAS.com', '42422858', '1486139047983-pepito.jpg;1486139048752-pepito.jpg;1486139049695-pepito.jpg', 3),
(2, 'ArgentaMIAMI', 'Matheu', 1234, '-34.6238923', '-58.3992156', 'pedidos@ArgenaMIAMI.com', '123456', '1486141813353-asd.jpg;1486141813843-asd.jpg;1486141814378-asd.jpg', NULL),
(3, 'ArgentaBANFIELD', 'Palacios', 1233, '-34.6577021', '-58.3554663', 'pedidos@ArgentaBANFIELD.com', '47478585', 'Chrysanthemum.jpg', 1),
(5, 'ArgentaRIVADAVIA', 'cordoba', 1665, '32.6118565', '-115.4614649', 'pedidos@ArgentaRIVADAVIA', '43454642', 'IMG-20150519-WA0003 (1).jpg', 1),
(6, 'ArgentaLANUS', 'Matheu', 1234, '-34.6238923', '-58.3992156', 'pedidos@ArgentaLANUS.com', '45456868', '1486141813353-asd.jpg;1486141813843-asd.jpg;1486141814378-asd.jpg', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transaccion`
--

CREATE TABLE `transaccion` (
  `id` int(11) NOT NULL,
  `id_vendedor` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_sucursal` int(11) NOT NULL,
  `id_inmueble` int(11) NOT NULL,
  `importe` varchar(30) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `transaccion`
--

INSERT INTO `transaccion` (`id`, `id_vendedor`, `id_cliente`, `id_sucursal`, `id_inmueble`, `importe`) VALUES
(1, 1, 1, 1, 1, '145'),
(2, 1, 1, 1, 3, '99'),
(3, 1, 1, 3, 2, '20'),
(4, 1, 1, 5, 3, '99');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_sucursal_sucursal1` (`id_sucursal`);

--
-- Indices de la tabla `sucursal`
--
ALTER TABLE `sucursal`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_sucursal_encargado1` (`id_encargado`);

--
-- Indices de la tabla `transaccion`
--
ALTER TABLE `transaccion`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `persona`
--
ALTER TABLE `persona`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT de la tabla `sucursal`
--
ALTER TABLE `sucursal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `transaccion`
--
ALTER TABLE `transaccion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `fk_sucursal_sucursal1` FOREIGN KEY (`id_sucursal`) REFERENCES `sucursal` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `sucursal`
--
ALTER TABLE `sucursal`
  ADD CONSTRAINT `fk_sucursal_encargado1` FOREIGN KEY (`id_encargado`) REFERENCES `persona` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
