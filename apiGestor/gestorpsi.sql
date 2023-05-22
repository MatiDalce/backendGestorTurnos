-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-04-2023 a las 09:52:10
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestorpsi`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `hour` int(11) NOT NULL,
  `day` int(11) NOT NULL,
  `note` text NOT NULL,
  `patientId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `appointments`
--

INSERT INTO `appointments` (`id`, `hour`, `day`, `note`, `patientId`) VALUES
(5, 1234567891, 1234567891, 'Esto es una NOTA EDITADAAAA', 4),
(6, 12, 1672342344, 'Esta nota e', 5),
(7, 6, 2023, 'Esto es una', 5),
(8, 6, 2023, 'Nuevo', 4),
(9, 6, 2023, 'Hola Dalce', 4),
(11, 7, 2023, 'test juan n', 4),
(12, 2, 2023, 'Sin res', 4),
(16, 9, 2023, 'TEST ESTE', 4),
(17, 8, 2023, 'ESTE ACA SI', 4),
(18, 1234567891, 1234567891, 'HOLA QUE TAL COMPLETO 2222222', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `patients`
--

CREATE TABLE `patients` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `maritalStatus` text DEFAULT NULL,
  `contactPhone` text NOT NULL,
  `dni` int(11) NOT NULL,
  `birthday` int(11) NOT NULL,
  `socialService` text NOT NULL,
  `email` text NOT NULL,
  `personalPhoneNumber` int(15) NOT NULL,
  `academicLevel` text DEFAULT NULL,
  `bloodType` text NOT NULL,
  `takesMedication` varchar(5) DEFAULT NULL,
  `medication` text DEFAULT NULL,
  `hasAllergies` varchar(5) DEFAULT NULL,
  `allergies` text DEFAULT NULL,
  `hasChronicDisease` varchar(5) DEFAULT NULL,
  `chronicDisease` text DEFAULT NULL,
  `familyMembers` text DEFAULT NULL,
  `parents` text DEFAULT NULL,
  `children` text DEFAULT NULL,
  `siblings` text DEFAULT NULL,
  `lastName` text DEFAULT NULL,
  `gender` text DEFAULT NULL,
  `age` text DEFAULT NULL,
  `father` text DEFAULT NULL,
  `mother` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `patients`
--

INSERT INTO `patients` (`id`, `name`, `maritalStatus`, `contactPhone`, `dni`, `birthday`, `socialService`, `email`, `personalPhoneNumber`, `academicLevel`, `bloodType`, `takesMedication`, `medication`, `hasAllergies`, `allergies`, `hasChronicDisease`, `chronicDisease`, `familyMembers`, `parents`, `children`, `siblings`, `lastName`, `gender`, `age`, `father`, `mother`) VALUES
(4, 'EL ELEGIDO', 'casado', '16346346', 1234567892, 1234567891, 'OSPERYH', 'email@email.com', 1234567815, 'Secundario completo', 'Grupo A', '0', 'Ibuprofeno', '0', 'Polen', '0', 'Muerte', 'personas de familia', 'Clotilde y Mauricio', 'mis hijos', 'mis hermanos', 'el apellido', 'masculine', NULL, 'padre', 'madre'),
(5, 'EL ELEGIDO', 'casado', '16346346', 1234567892, 1234567891, 'OSPACA', 'email@email.com', 1234567815, 'Secundario completo', 'Grupo A', '0', 'Ibuprofeno', '0', 'Polen', '0', 'Muerte', 'personas de familia', 'Mauro, Graciela', 'mis hijos', 'mis hermanos', 'el apellido', 'masculine', NULL, 'padre', 'madre');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `patientId` (`patientId`);

--
-- Indices de la tabla `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `patients`
--
ALTER TABLE `patients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`patientId`) REFERENCES `patients` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
