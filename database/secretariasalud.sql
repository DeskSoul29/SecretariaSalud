-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 11-08-2022 a las 21:02:40
-- Versión del servidor: 8.0.27
-- Versión de PHP: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `secretariasalud`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `municipios`
--

DROP TABLE IF EXISTS `municipios`;
CREATE TABLE IF NOT EXISTS `municipios` (
  `id_municipio` int NOT NULL AUTO_INCREMENT,
  `nombre_municipio` varchar(100) NOT NULL,
  `id_provincia` int NOT NULL,
  PRIMARY KEY (`id_municipio`),
  KEY `id_provincia` (`id_provincia`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `municipios`
--

INSERT INTO `municipios` (`id_municipio`, `nombre_municipio`, `id_provincia`) VALUES
(1, 'Chima', 1),
(2, 'Confines', 1),
(3, 'Contratación', 1),
(4, 'El Guacamayo', 1),
(5, 'Galán', 1),
(6, 'Gámbita', 1),
(7, 'Guadalupe', 1),
(8, 'Guapotá', 1),
(9, 'Hato', 1),
(10, 'Oiba', 1),
(11, 'Palmar', 1),
(12, 'Palmas del Socorro', 1),
(13, 'Santa Helena del Opón', 1),
(14, 'Simacota', 1),
(15, 'Socorro', 1),
(16, 'Suaita', 1),
(17, 'Capitanejo', 2),
(18, 'Carcasí', 2),
(19, 'Cepitá', 2),
(20, 'Cerrito', 2),
(21, 'Concepción', 2),
(22, 'Enciso', 2),
(23, 'Guaca', 2),
(24, 'Macaravita', 2),
(25, 'Málaga', 2),
(26, 'Molagavita', 2),
(27, 'San Andrés', 2),
(28, 'San José de Miranda', 2),
(29, 'San Miguel', 2),
(30, 'Aratoca', 3),
(31, 'Barichara', 3),
(32, 'Cabrera', 3),
(33, 'Coromoro', 3),
(34, 'Curití', 3),
(35, 'Charalá', 3),
(36, 'Encino', 3),
(37, 'Jórdan', 3),
(38, 'Mogotes', 3),
(39, 'Ocamonte', 3),
(40, 'Onzaga', 3),
(41, 'Páramo', 3),
(42, 'Pinchote', 3),
(43, 'San Joaquín', 3),
(44, 'San Gil', 3),
(45, 'Valle de San José', 3),
(46, 'Villanueva', 3),
(47, 'California', 4),
(48, 'Charta', 4),
(49, 'Matanza', 4),
(50, 'Suratá', 4),
(51, 'Tona', 4),
(52, 'Vetas', 4),
(53, 'Aguada', 5),
(54, 'Albania', 5),
(55, 'Barbosa', 5),
(56, 'Bolívar', 5),
(57, 'Cimitarra', 5),
(58, 'El Peñón', 5),
(59, 'Chipatá', 5),
(60, 'Florián', 5),
(61, 'Guavatá', 5),
(62, 'Güepsa', 5),
(63, 'Jesús María', 5),
(64, 'La Belleza', 5),
(65, 'La paz', 5),
(66, 'Landázuri', 5),
(67, 'Puente Nacional', 5),
(68, 'Puerto Parra', 5),
(69, 'San Benito', 5),
(70, 'Sucre', 5),
(71, 'Vélez', 5),
(72, 'Barrancabermeja', 6),
(73, 'Betulia', 6),
(74, 'El Carmen de Chucurí', 6),
(75, 'Puerto Wilches', 6),
(76, 'Sabana de Torres', 6),
(77, 'San Vicente de Chuchurí', 6),
(78, 'Bucaramanga', 7),
(79, 'El Playón', 7),
(80, 'Floridablanca', 7),
(81, 'Girón', 7),
(82, 'Lebrija', 7),
(83, 'Los Santos', 7),
(84, 'Piedecuesta', 7),
(85, 'Rionegro', 7),
(86, 'Santa Bárbara', 7),
(87, 'Tona ', 7),
(88, 'Zapatoca', 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `provincias`
--

DROP TABLE IF EXISTS `provincias`;
CREATE TABLE IF NOT EXISTS `provincias` (
  `id_provincia` int NOT NULL AUTO_INCREMENT,
  `nombre_provincia` varchar(100) NOT NULL,
  PRIMARY KEY (`id_provincia`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `provincias`
--

INSERT INTO `provincias` (`id_provincia`, `nombre_provincia`) VALUES
(1, 'Comunera'),
(2, 'García-Rovira'),
(3, 'Guanentá'),
(4, 'Soto Norte'),
(5, 'Vélez'),
(6, 'Yariguíes'),
(7, 'Metropolitana');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `provincia` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `municipio` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `rol` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user` (`user`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `user`, `name`, `pass`, `provincia`, `municipio`, `rol`) VALUES
(1, 1004802359, 'Jhan Carlos Ramirez Navarro', '$2a$08$IdYtqOeVAsNK56AQeitNjOvC69ExhrDQWcqKKt3.88kbcu0BlTyH2', 'Comunera', 'Socorro', 'admin');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `municipios`
--
ALTER TABLE `municipios`
  ADD CONSTRAINT `municipios_ibfk_1` FOREIGN KEY (`id_provincia`) REFERENCES `provincias` (`id_provincia`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
