-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-05-2023 a las 23:07:25
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
  `day` text NOT NULL,
  `note` text NOT NULL,
  `patientId` int(11) NOT NULL,
  `appointmentDate` text NOT NULL,
  `payStatus` text NOT NULL,
  `amountToPay` int(11) NOT NULL,
  `sessionStatus` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `mother` text DEFAULT NULL,
  `sexualOrientation` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT de la tabla `patients`
--
ALTER TABLE `patients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

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
