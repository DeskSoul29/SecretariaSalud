-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 29-08-2022 a las 21:07:15
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
-- Estructura de tabla para la tabla `grupo_establecimientos`
--

DROP TABLE IF EXISTS `grupo_establecimientos`;
CREATE TABLE IF NOT EXISTS `grupo_establecimientos` (
  `id_establecimientos` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id_establecimientos`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `grupo_establecimientos`
--

INSERT INTO `grupo_establecimientos` (`id_establecimientos`, `nombre`) VALUES
(1, 'Establecimientos de Preparación de Alimentos'),
(2, 'Expendios de Carne (Carnicerias Y Famas, De Grandes Superficies, Plazas de mercado'),
(3, 'Establecimientos de Expendido de Alimentos Y Bebidas'),
(4, 'Establecimientos de Alimentos y Bebidas en Grandes Superficies'),
(5, 'Establecimientos de Ensamble de Alimentos y Bebidas (Incluidos los Ubicados en Zonas Francas'),
(6, 'Expendidos de Bebidas Alcohólicas'),
(7, 'Plazas de Mercado o Central de Abastos'),
(8, 'Establecimientos de Almacenamiento de Alimentos y Bebidas (Incluidas las Ubicadas en Zonas Francas'),
(9, 'Ventas de Alimentos y Bebidas en La Vía Pública (Incluidos las Ubicadas en Zonas Francas'),
(10, 'Vehículos Transportadores de Alimentos Y Bebidas'),
(11, 'Acueducto'),
(12, 'Establecimientos Educativos'),
(13, 'Establecimeintos Cuartelarios'),
(14, 'Carcelarios'),
(15, 'Establecimientos Hospitalarios Y Similares'),
(16, 'Establecimientos Comerciales'),
(17, 'Establecimientos de Espectaculos Públicos'),
(18, 'Establecimientos de Diversion Publica'),
(19, 'Establecimientos Industriales'),
(20, 'Vivienda Transitoria'),
(21, 'Vivienda Permanente'),
(22, 'Terminales Protuarios Tráfico Nacional'),
(23, 'Puntos De Entrada (Internacional)'),
(30, 'No identificados');

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
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
(72, 'Betulia', 6),
(74, 'El Carmen de Chucurí', 6),
(75, 'Puerto Wilches', 6),
(76, 'Sabana de Torres', 6),
(77, 'San Vicente de Chuchurí', 6),
(78, 'Bucaramanga', 7),
(79, 'El Playón', 7),
(82, 'Lebrija', 7),
(83, 'Los Santos', 7),
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
-- Estructura de tabla para la tabla `tipos_establecimientos`
--

DROP TABLE IF EXISTS `tipos_establecimientos`;
CREATE TABLE IF NOT EXISTS `tipos_establecimientos` (
  `codigo` decimal(5,2) NOT NULL,
  `nombre_establecimiento` varchar(255) NOT NULL,
  `nivel_riesgo` varchar(100) NOT NULL,
  `grupo_estble` int NOT NULL,
  PRIMARY KEY (`codigo`),
  KEY `establecimientos` (`grupo_estble`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `tipos_establecimientos`
--

INSERT INTO `tipos_establecimientos` (`codigo`, `nombre_establecimiento`, `nivel_riesgo`, `grupo_estble`) VALUES
('1.01', 'Restaurantes Publicos', 'ALTO', 1),
('1.02', 'Comedores Escolares (PAE - PRIVADOS)', 'ALTO', 1),
('1.03', 'Comedores Infantiles (ICBF - INPEC) De Colegios Y Universidades', 'ALTO', 1),
('1.04', 'Comedores Carcelarios (USPEC), Fuerza Militares Policivas', 'ALTO', 1),
('1.05', 'Comedores Hogares Geriátricos Asilos, Hospitales, Casinos de Empresas o Fábricas, Clubes Sociales', 'ALTO', 1),
('1.06', 'Aéreas de Preparación de Hoteles (Incluidos los Ubicados en Zonas Francas), Moteles, Hoteles, Residencias y Casas de Lenocinio', 'ALTO', 1),
('1.07', 'Establecimientos De Preparación de Alimentos Ubicados Al Interior De Las Plazas de Mercado, Centrales de Abasto, Plazoletas de Comidas y Zonas Francas', 'ALTO', 1),
('1.08', 'Panaderías Y/O Pastelerías', 'ALTO', 1),
('1.09', 'Fruterias', 'ALTO', 1),
('1.10', 'Cafetería', 'ALTO', 1),
('1.11', 'Comidas Rapidas', 'ALTO', 1),
('1.12', 'Establecimientos Dedicados A La Organización Y Servicio De Banquetes, Y Aquellos Que Ofrecen Servicios De Alimentación (Menús) A Través De Redes Sociales', 'ALTO', 1),
('2.01', 'Expendio de Carne Bovina', 'ALTO', 2),
('2.02', 'Expendio de Carne Porcina', 'ALTO', 2),
('2.03', 'Expendio de Pollo', 'ALTO', 2),
('2.04', 'Expendio de Carne Otras Especies (Cabro, Ovejo, Bufalo, Conejo)', 'ALTO', 2),
('2.05', 'Expendio de Carne Bovina - Porcina', 'ALTO', 2),
('2.06', 'Expendio de Carne Bovina - Porcina - Pollo', 'ALTO', 2),
('2.07', 'Expendio de Productos Carnicos Comestibles (Visceras Rojas - Blancas', 'ALTO', 2),
('3.01', 'Tienda de Barrio o Cigarrería, Incluidas Las Ubicadas En Zonas Francas', 'ALTO', 3),
('3.02', 'Mini Mercado (Supermercado de Barrio', 'ALTO', 3),
('3.03', 'Expendio de Derivados Carnicos (Charcuterías Y Salsamentrías)', 'ALTO', 3),
('3.04', 'Expendio de Derivados Carnicos (Charcuterías Y Salsamentarías)', 'ALTO', 3),
('3.05', 'Venta de Leche Cruda (Establecimiento)', 'ALTO', 3),
('3.06', 'Expendio Con Operaciones de Porcinado, Troceado o Acondicionado', 'ALTO', 3),
('3.07', 'Expendido de Verduras - Frutas (Local - Establecimiento Y/O Fruver)', 'ALTO', 3),
('3.08', 'Expendio de Dulces', 'ALTO', 3),
('4.01', 'Gran Superficie (Hipermercados - Supermercados)', 'ALTO', 4),
('5.01', 'Ensamble De Refrigerio', 'ALTO', 5),
('5.02', 'Ensamble de Menús', 'ALTO', 5),
('6.01', 'Bares - Discotecas - Cantinas - Tebernas', 'ALTO', 6),
('6.02', 'Cigarrerias - Licoreras - Whiskerias', 'ALTO', 6),
('6.03', 'Clubes Sociales', 'ALTO', 6),
('6.04', 'Prostíbulos', 'ALTO', 6),
('6.05', 'Canchas De Bolo, Canchas de Tejo - Billares - Bingos - Casinos', 'ALTO', 6),
('7.01', 'Centrales de Abasto', 'ALTO', 7),
('7.02', 'Plazas de Mercado', 'ALTO', 7),
('8.01', 'Bodegas para Almacenamiento de Alimentos', 'ALTO', 8),
('8.02', 'Bodegas para Almacenamiento de Bebidas', 'ALTO', 8),
('8.03', 'Dadores de Frío (Establecimientos de Alimentos Y/O Bebidas con Frio)', 'ALTO', 8),
('8.04', 'Puesto Fijo o Estacionario de Alimentos y Bebidas', 'ALTO', 8),
('9.01', 'Puesto Fijo o Estacionario de Alimentos y Bebidas', 'ALTO', 9),
('9.02', 'Puesto Móvil de Alimentos', 'ALTO', 9),
('9.03', 'Plaza de Mercado Móvil', 'ALTO', 9),
('9.04', 'Mercados Campesinos', 'ALTO', 9),
('9.05', 'Food Truck', 'ALTO', 9),
('9.06', 'Comercialización Ambulante de Leche Cruda Para Consumo Humano Directo', 'ALTO', 9),
('10.01', 'Vehiculos Transportadores de Alimentos Perecederos', 'ALTO', 10),
('10.02', 'Vehiculos Transportadores de Carne Y Productos Carnicos Comestibles', 'ALTO', 10),
('10.03', 'Vehiculos Transportadores de Leche Cruda', 'ALTO', 10),
('10.04', 'Vehiculos Transportadores Alimentos No Perecederos', 'ALTO', 10),
('11.01', 'Sistemas de Suministro de Agua para Consumo Humano Urbano', 'ALTO', 11),
('11.02', 'Sistemas de Suministro de Agua para Consumo Humano Rural', 'ALTO', 11),
('11.03', 'Puntos de Captación Y Administradores De Puntos De Suministro o Abasto de Agua - Decreto 1898 de 2016', 'ALTO', 11),
('12.01', 'Jardines Infantes (Educación Preescolar)', 'ALTO', 12),
('12.02', 'Guarderías', 'ALTO', 12),
('12.03', 'Colegios', 'ALTO', 12),
('12.04', 'Universidades (SI ES EL CASO INCLUYE ANFITEATRO)', 'ALTO', 12),
('12.05', 'Institutos de Educación No Formal', 'ALTO', 12),
('12.06', 'Conventos', 'ALTO', 12),
('12.07', 'Seminarios (Actividades de Asociaciones Relogiosas, Educación Superior)', 'ALTO', 12),
('12.08', 'Casas Vecinales (Educación Preescolar)', 'ALTO', 12),
('12.09', 'Servicios de Educación Laboral Especial (Escuelas Comerciales, Centros de Capacitación) Eduación Media Técnica Y De Formación Laboral', 'BAJO', 12),
('12.10', 'Establecimientos de Educación Tecnologica', 'BAJO', 12),
('12.11', 'Establecimientos de Educación Tecnica Profesional', 'BAJO', 12),
('12.12', 'Escuelas Deportivas', 'BAJO', 12),
('12.13', 'Escuelas Culturales', 'BAJO', 12),
('12.14', 'Establecimientos Donde Se Preste Otro Tipo de Educación', 'BAJO', 12),
('13.01', 'Batallones, Culturales Y Afines', 'ALTO', 13),
('14.01', 'Salas de Retenidos', 'ALTO', 14),
('14.02', 'Bases Militares Con Reclusión', 'ALTO', 14),
('14.03', 'Cárcel', 'ALTO', 14),
('14.04', 'Centros de Retención de Menores', 'ALTO', 14),
('15.01', 'Clinicas Y Hospitales con Internación (Con o Sin Morgue)', 'ALTO', 15),
('15.02', 'Prestadores Independientes, IPS Sin Internación', 'ALTO', 15),
('15.03', 'Consultorios Odontologicos', 'ALTO', 15),
('15.04', 'Laboratorios CLinicos Y De Sangre Humanos', 'ALTO', 15),
('15.05', 'Laboratorios Clinicos Y De Sangre Animal', 'ALTO', 15),
('15.06', 'Servicios de Radiologia e Imagenes Diagnosticas', 'ALTO', 15),
('15.07', 'Laboratorios de Medicina Forense (Con o Sin Morgue)', 'ALTO', 15),
('15.08', 'Clinicas Veterinarios', 'ALTO', 15),
('15.09', 'Consultorios Medicos Veterinarios', 'ALTO', 15),
('15.10', 'Centros de Piercing y Tatuajes', 'ALTO', 15),
('15.11', 'Centros de Esteticas para Humanos', 'ALTO', 15),
('15.12', 'Peluquería y Centro de Estética Veterinaria', 'ALTO', 15),
('15.13', 'Peluquerias', 'ALTO', 15),
('16.01', 'Dispensario de Medicamentos - Farmacias - Droguerias', 'ALTO', 16),
('16.02', 'Tiendas Naturistas', 'ALTO', 16),
('16.03', 'Droguerias Veterinarias', 'ALTO', 16),
('16.04', 'Depósitos de Medicamentos', 'ALTO', 16),
('16.05', 'Droguerias (Comercio Al Por Mayor de Productos Farmacéuticos y Medicinales, Cosméticos y Artículos de Tocador)', 'ALTO', 16),
('16.06', 'Comercio de Productos (Comercio Al Por Menor de Equipo Fotográfico, Óptico y de Precisión, Comercio Al Por Menos de Toda Clase de Relojes, Joyas y Articulos de Plata en General, Artículos de Esotéricos, Tiendas de Artpiculos Sexuales (Sex-Shop), Florister', 'ALTO', 16),
('16.07', 'Centros Comerciales', 'BAJO', 16),
('16.08', 'Actividades de Envase y Empaque', 'ALTO', 16),
('16.09', 'Establecimientos Veterinarios (Criadero Mascotas, Venta de Biológicos, Medicamentos e Insumos Veterinarios,  Centros de Atención de Vida Silvestre, Zoocriaderos (destinados a la cria de Animales Silvestres Con fines Comerciales, Coso y/o Centro de bienest', 'ALTO', 16),
('16.10', 'Depositos, Depositos de Materiales de Construcción, Ferreterias, Chatarreria(Comercio Al Por mayor de Materiales de Construcción, Articulos de Ferretería, Pinturas, Productos de Vidrio, Equipo y Materiales de Fontanería y Calefacción)', 'ALTO', 16),
('16.11', 'Bodegas de Reciclaje', 'ALTO', 16),
('16.12', 'Cementerios (Con o Sin Morgue)', 'ALTO', 16),
('16.13', 'Funerarias (Con o Sin Laboratorio de Tanatopraxia)', 'ALTO', 16),
('16.14', 'Morgues', 'ALTO', 16),
('16.15', 'Osarios - Cenizarios - Colombiarios', 'ALTO', 16),
('16.16', 'Establecimientos de Entretenimiento para Adultos y Sitios de Encuentro Sexual (Casas de Lenocinio, Bares Swinger, Salas de Masaje Erótico - Saunas y Turcos Para Población LGBTI, Establecimientos Afines', 'ALTO', 16),
('16.17', 'Saunas, Turcos, Jacuzzi, SPA', 'ALTO', 16),
('16.18', 'Gimnasio', 'BAJO', 16),
('16.19', 'Miscelaneas (Comercio al Por Mayor en Establecimientos No Especializados, Con Surtido Compuesto Principalmente Por Productos Diferentes de Alimentos como Viveres En General, Bebida y Tabaco)', 'BAJO', 16),
('16.20', 'Cacharrerias', 'ALTO', 16),
('16.21', 'Piscinas', 'ALTO', 16),
('17.01', 'Estadios (Instalaciones Deportivas)', 'ALTO', 17),
('17.02', 'Coliseos (Instalaciones Deportivas)', 'ALTO', 17),
('17.03', 'Plazas de Toros', 'ALTO', 17),
('17.04', 'Circo (Actividades de Espectáculos en Vivo', 'ALTO', 17),
('17.05', 'Pistas de Patinaje', 'BAJO', 17),
('17.06', 'Salas de Billar (Comercio al Por Menor en Establecimientos No Especializados, Con Surtido Compuesto Principalmente Por Productos Diferentes de Alimentos(Viveres en General), Bebidas y Tabaco', 'BAJO', 17),
('17.07', 'Escuelas Equicación', 'BAJO', 17),
('17.08', 'Canchas de Tejo (Instalaciones Deportivas', 'BAJO', 17),
('17.09', 'Galleras (Actividades Recreativas y de Esparcimiento)', 'BAJO', 17),
('17.10', 'Campos de Atletismo', 'BAJO', 17),
('17.11', 'Hipódromos', 'BAJO', 17),
('17.12', 'Parques de Atracciones', 'ALTO', 17),
('17.13', 'Parques Temáticos', 'ALTO', 17),
('17.14', 'Picnic, Camping, Pistas de Baile, Juegos Operados Con Monedas', 'BAJO', 17),
('18.01', 'Museos (Actividades de Museos y Preservación de Lugares y Edificios Históricos)', 'BAJO', 18),
('18.02', 'Centros Culturales', 'BAJO', 18),
('18.03', 'Parques Públicos', 'BAJO', 18),
('18.04', 'Parques Naturales (Las Edificaciones) - Jardines Botánicos (Las Edificaciones)', 'BAJO', 18),
('18.05', 'Conchas Acústicas', 'BAJO', 18),
('18.06', 'Bibliotecas', 'BAJO', 18),
('18.07', 'Teatros - Salas de Cine (Actividades de Exhibición de Películas Conematográficas y Videos)', 'BAJO', 18),
('18.08', 'Zoológicos (Las Edificaciones)', 'BAJO', 18),
('18.09', 'Clubes Deportivos (Las Edificaciones)', 'BAJO', 18),
('18.10', 'Centro de Culto Religioso', 'BAJO', 18),
('18.11', 'Club Social (Las Edificaciones) - Club Privado', 'ALTO', 18),
('18.12', 'Parques de Atracciones Dentro de Los Centros Comerciales', 'BAJO', 18),
('18.13', 'Boleras (Organización de Convenciones y Eventos Comerciales)', 'BAJO', 18),
('18.14', 'Bingos y Salones de Juego', 'BAJO', 18),
('18.15', 'Juegos de Azar y Apuestas', 'BAJO', 18),
('19.01', 'Establecimientos Que Realicen Transformación de Madera y Fabricación de Productos de Madera y de Corcho, Excepto Muebles; Fabricación de Articulos de Cestería y Espartería', 'ALTO', 19),
('19.02', 'Coquización, Fabricación de Productos de La Refinación del Petroleo y Actividad de Mezcla de Combustibles', 'ALTO', 19),
('19.03', 'Establecimientos Donde se Realiza La Fabricación De Sustancias y Productos Quimicos', 'ALTO', 19),
('19.04', 'Establecimientos Donde Se Realiza La Fabricación De Productos De Caucho Y De Plástico', 'ALTO', 19),
('19.05', 'Establecimientos Donde Se Realiza La Fabricación De Otros Minerales No Metálicos', 'ALTO', 19),
('19.06', 'Establecimientos Donde Se Realiza La Fabricación De Productos Metalúrgicos Básicos', 'ALTO', 19),
('19.07', 'Establecimientos Donde Se Realiza La Fabricación De Productos De Metal, Excepto Mquinaria Y Equipo ', 'ALTO', 19),
('19.08', 'Establecimientos Donde Se Realiza La Fabricación De Productos Informaticos, Electrónicos y Ópticos', 'ALTO', 19),
('19.09', 'Establecimientos Donde Se Realiza La Fabricación De Aparatos Y Equipos Eléctricos', 'ALTO', 19),
('19.10', 'Establecimientos Donde Se Realiza La Fabricación De Vehiculos Automotores Remolques Y Semiremolques', 'ALTO', 19),
('19.11', 'Establecimientos Donde Se Realiza La Fabricación De Muebles, Colchones Y Somieres', 'ALTO', 19),
('19.12', 'Otras Industrias Manufactureras', 'ALTO', 19),
('19.13', 'Establecimientos Donde Se Realizan Actividades De Distribución Y Tratamiento De Aguas Residuales, Gestión De Desechos Y Actividades De Saneamiento Ambiental', 'ALTO', 19),
('19.14', 'Establecimientos Que Utilicen Como Materia Prima El Cuero, Fábricas De Calzado Y Marroquineria. No Incluye Remontadoras', 'ALTO', 19),
('19.15', 'ESTABLECIMIENTOS QUE UTILICEN COMO MATERIA PRIMA EL CUERO,  FÁBRICAS DE CALZADO Y MARROQUINERIA. NO INCLUYE REMONTADORAS', 'ALTO', 19),
('19.16', 'Establecimientos Que Utilicen Como Materia Prima El Metal. Incluye Recubrimientos Galvánicos, Fundición, Tratamiento Térmico', 'ALTO', 19),
('19.17', 'Fabricación de Papel, Cartón y Productos de Papel y Cartón', 'ALTO', 19),
('19.18', 'Establecimientos Donde Se Realice La Instalación, Mantenimiento y Reparación Especializado De Maquinaria Y Equipo', 'ALTO', 19),
('19.19', 'Establecimientos Donde Se Realicen Actividades Relacionadas Con La Impresión', 'ALTO', 19),
('19.20', 'Establecimientos Donde Se Realicen Actividades De Edición', 'ALTO', 19),
('19.21', 'Establecimientos Que Almacenen, Expendan y Apliquen Plaguicidas', 'ALTO', 19),
('19.22', 'Lavanderias De Ropa Y Ropa Hospitalaria', 'ALTO', 19),
('19.23', 'Estaciones de Servicio (Comercio Al Por Menor De Combustible Para Automotores)', 'ALTO', 19),
('20.01', 'Campamentos', 'ALTO', 20),
('20.02', 'Hogares de Paso', 'ALTO', 20),
('20.03', 'Hoteles (Con Servicio de Restaurante Y/O Piscina)', 'ALTO', 20),
('20.04', 'Hoteles (Sin Servicio de Restaurante Y/O Sin Piscina)', 'BAJO', 20),
('20.05', 'Aparta Hoteles', 'BAJO', 20),
('20.06', 'Centros Vacacionales', 'ALTO', 20),
('20.07', 'Camping', 'BAJO', 20),
('20.08', 'Moteles', 'ALTO', 20),
('20.09', 'Albergues', 'ALTO', 20),
('20.10', 'Residencias - Hostal', 'ALTO', 20),
('20.11', 'Amoblados', 'BAJO', 20),
('20.12', 'Centros y Casas de Rehabilitación y Reposo', 'ALTO', 20),
('20.13', 'Casa de Huéspedes, Posadas Turísticas (Ecohabs Entendido Como Concesiones De Parques Nacionales Para Fines Turísticos) y (Fincas Turísticas, Entre Otros)', 'ALTO', 20),
('20.14', 'Hogares Infantiles', 'ALTO', 20),
('20.15', 'Hogares de Atención a Madres Solteras', 'ALTO', 20),
('20.16', 'Alojamiento En Casa de Huéspedes o Residencias Y/O Alojamiento En Habitaciones En Apartamentos Y Casas Particulaes', 'ALTO', 20),
('21.01', 'Conjuntos Residenciales', 'BAJO', 21),
('21.02', 'Unidades Habitacionales', 'BAJO', 21),
('21.03', 'Hogares Geriátricas (Actividades de Atención En Instituciones Para El Cuidado De Personas Mayores Y/O Discapacitadas)', 'ALTO', 21),
('21.04', 'Orfanatos', 'ALTO', 21),
('21.05', 'Asentamientos Indigenas', 'ALTO', 21),
('21.06', 'Albergues Para Niños', 'ALTO', 21),
('21.07', 'Albergues Para Trabajadores', 'ALTO', 21),
('21.08', 'Albergues A Victimas, Refugiados, Inmigrantes', 'ALTO', 21),
('21.09', 'Hogas Gerontológico (Asilos De Ancianos)', 'ALTO', 21),
('22.01', 'Establecimientos Donde Se Realicen Actividades De Transporte Terrestre', 'ALTO', 22),
('22.02', 'Transporte Acuático De Pasajeros Marítimo Y De Cabotaje', 'ALTO', 22),
('22.03', 'Transporte Aéreo', 'ALTO', 22),
('22.04', 'Almacenamiento Y Actividades Complementarias Al Transporte', 'ALTO', 22),
('22.05', 'Zona Franca', 'ALTO', 22),
('23.01', 'Establecimientos Donde Se Realicen Actividades De Transporte Terrestre', 'ALTO', 23),
('23.02', 'Transporte Acuático', 'ALTO', 23),
('23.03', 'Transporte Aéreo', 'ALTO', 23),
('23.04', 'Almacenamiento Y Actividades Complementarias Al Transporte', 'ALTO', 23),
('30.01', 'Otros', 'ALTO', 30);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` int NOT NULL,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `provincia` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `municipio` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `municipio_extra` varchar(255) DEFAULT NULL,
  `rol` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user` (`user`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `user`, `nombre`, `apellido`, `pass`, `provincia`, `municipio`, `municipio_extra`, `rol`) VALUES
(1, 1004802359, 'Jhan Carlos', 'Ramirez Navarro', '$2a$08$IdYtqOeVAsNK56AQeitNjOvC69ExhrDQWcqKKt3.88kbcu0BlTyH2', 'Comunera', 'Socorro', NULL, 'admin'),
(11, 123456, 'Prueba', 'Apellido', '$2a$08$yO9KdRdMsM0wETPW70fDZetzp8F1MFb0sqTc8ryKRTlC/RZCDVEJK', 'Vélez', 'Vélez', NULL, 'visitante'),
(13, 1234567, 'Prueba', 'Hola', '$2a$08$roLxSNBa2Ft1sQkfXMOefOafEFsp2XCxKqEQJEqKCIiE5TrNZOcvS', 'Vélez', 'Puerto Parra', NULL, 'moderador'),
(14, 12345678, 'Prueba', '3', '$2a$08$IdYtqOeVAsNK56AQeitNjOvC69ExhrDQWcqKKt3.88kbcu0BlTyH2', 'Vélez', 'Vélez', NULL, 'visitante'),
(16, 123456789, 'Prueba', '4', '$2a$08$IdYtqOeVAsNK56AQeitNjOvC69ExhrDQWcqKKt3.88kbcu0BlTyH2', 'García-Rovira', 'Málaga', NULL, 'moderador'),
(17, 12345, 'Prueba', '5', '$2a$08$WnZVt6C4O5522VqpUKbhPOykeLDbGIMRFRGOWElr7WWatkHGaNESi', 'Metropolitana', 'Bucaramanga', 'El Playón', 'visitante'),
(18, 12345784, 'Prueba', 'Pablo2', '$2a$08$YmwI0gM.VQf/JaOc7LWe5ek6nuVzjOWvILJ32sOkwuYli0/DYWwSW', 'García-Rovira', 'Carcasí', NULL, 'visitante'),
(19, 12345622, 'Prueba', 'Pablo', '$2a$08$ZrkbGimqlZjRZAsfcYRIi.8hzNXE/LiiLVE9t4n7ZRMfeVtVNp5Cy', 'García-Rovira', 'Málaga', NULL, 'visitante');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `municipios`
--
ALTER TABLE `municipios`
  ADD CONSTRAINT `municipios_ibfk_1` FOREIGN KEY (`id_provincia`) REFERENCES `provincias` (`id_provincia`);

--
-- Filtros para la tabla `tipos_establecimientos`
--
ALTER TABLE `tipos_establecimientos`
  ADD CONSTRAINT `tipos_establecimientos_ibfk_1` FOREIGN KEY (`grupo_estble`) REFERENCES `grupo_establecimientos` (`id_establecimientos`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
