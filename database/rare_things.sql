-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 24, 2024 at 03:06 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rare_things`
--

-- --------------------------------------------------------

--
-- Table structure for table `things`
--

CREATE TABLE `things` (
  `thing_id` int(11) NOT NULL,
  `user_name` varchar(15) NOT NULL,
  `img_name` varchar(50) NOT NULL,
  `thing_title` varchar(30) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `location` varchar(50) NOT NULL,
  `category` varchar(30) NOT NULL,
  `votes` int(11) NOT NULL DEFAULT 0,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `things`
--

INSERT INTO `things` (`thing_id`, `user_name`, `img_name`, `thing_title`, `date`, `location`, `category`, `votes`, `user_id`) VALUES
(11, 'Ania', 'children-3374845_1280.jpg', 'Rare thing in the sky', '2024-01-23 23:00:00', 'Krakow', 'ufo', 77, 9),
(13, 'ela', 'fantasy-5025727_1280.jpg', 'White UFO', '2024-01-24 23:00:00', 'A coruña', 'ufo', 14, 37),
(14, 'maria', 'fantasy-4697978_1280.jpg', 'ET on my garden', '2024-01-24 23:00:00', 'Washington', 'ufo', -6, 82),
(16, 'Carla', 'northern-lights-4966913_1280.jpg', 'Lights in the sky', '2024-02-18 23:00:00', 'Berlin', 'nature', 2, 77),
(17, 'guillem', 'fantasy-3281842_1280.jpg', 'Big sea creature', '2024-02-18 23:00:00', 'Tarragona', 'nature', -1, 76),
(18, 'garfield', 'halloween-1746354_1280.jpg', 'Little ghosts', '2024-02-18 23:00:00', 'Barcelona', 'ghost', 3, 80),
(19, 'marc', 'halloween-4537428_1280.jpg', 'Ghost singer', '2024-02-18 23:00:00', 'Madrid', 'ghost', 2, 45),
(20, 'tania', 'water-4032975_1280.jpg', 'Strange ship on the sea', '2024-02-18 23:00:00', 'Red sea', 'nature', 1, 51),
(21, 'mariano', 'troll-785557_1280.jpg', 'Troll at the forest', '2024-02-22 23:00:00', 'Santpedor', 'nature', 0, 52),
(22, 'john', 'giant-5490737_1280.jpg', 'Giant on the road', '2024-02-23 23:00:00', 'Sevilla', 'nature', -2, 61),
(23, 'marc', 'metro-1662163_1280.jpg', 'Underground shadows', '2024-02-29 23:00:00', 'London', 'city', 21, 45),
(24, 'Ania', 'invisible-man-3469868_1280.jpg', 'Invisible man', '2024-02-29 23:00:00', 'berlin', 'city', 0, 9);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(15) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `email`, `password`) VALUES
(8, 'Jordi', 'jordi@mail.com', '123456'),
(9, 'Ania', 'ania@mail.com', '123456'),
(37, 'ela', 'ela@ela.com', 'patata'),
(45, 'marc', 'marc@mail.com', '123456'),
(48, 'marc2', 'marc2@mail.com', '123456'),
(49, 'patata', 'patata@mail.com', 'patata'),
(50, 'potato', 'potato@mail.com', '123456'),
(51, 'tania', 'tania@tania.com', 'kdkdkdkdkddk'),
(52, 'mariano', 'mariano@mail.com', 'dkkdkdkdkdkd'),
(59, 'nana', 'nana@nana.com', 'nanananana'),
(61, 'john', 'john@john.com', 'kdkdkdkdd'),
(68, 'pep', 'pep@pep.com', 'lkjsdflaskdjfasd'),
(71, 'ivana', 'ivana@mail.com', 'lkjasdlkfjasdf'),
(73, 'joanot', 'joanot@martorell.cat', 'kdkslskdjdk'),
(75, 'mireia', 'mireia@mireia.com', '123456'),
(76, 'guillem', 'guillem@mail.com', 'patata'),
(77, 'Carla', 'carla@mail.com', 'jajajajaj'),
(78, 'naranjito', 'naranjito@mail.com', 'lalalalal'),
(79, 'mirinda', 'mirinda@mail.com', 'ñañañañañaña'),
(80, 'garfield', 'garfield@miau.com', 'lalalalalalal'),
(82, 'maria', 'maria@mail.com', '123456'),
(84, 'Manolito', 'manolo@manolo.com', '123456'),
(85, 'pepitu', 'pepitu@mail.com', '123456'),
(86, 'Henry', 'henry@mail.com', '123456'),
(87, 'Allan', 'allan@gmail.com', '123456'),
(88, 'miquel', 'miquel@mail.com', '123456'),
(89, 'daniela', 'daniela@mail.com', '123456'),
(90, 'dani', 'dani@mail.com', '123456'),
(91, 'susana', 'susana@mail.com', '123456'),
(92, 'tomek', 'tomek@mail.com', '123456');

-- --------------------------------------------------------

--
-- Table structure for table `votes`
--

CREATE TABLE `votes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `thing_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `votes`
--

INSERT INTO `votes` (`id`, `user_id`, `thing_id`) VALUES
(3, 0, 10),
(5, 0, 11),
(35, 0, 13),
(47, 0, 17),
(45, 0, 20),
(44, 0, 22),
(48, 0, 23),
(27, 8, 10),
(28, 8, 11),
(46, 8, 13),
(30, 8, 16),
(29, 8, 17),
(31, 8, 24),
(33, 87, 10),
(32, 87, 13),
(34, 91, 10),
(42, 92, 10),
(43, 92, 11);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `things`
--
ALTER TABLE `things`
  ADD PRIMARY KEY (`thing_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `votes`
--
ALTER TABLE `votes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_vote` (`user_id`,`thing_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `things`
--
ALTER TABLE `things`
  MODIFY `thing_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT for table `votes`
--
ALTER TABLE `votes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;