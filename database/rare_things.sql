-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 28, 2024 at 08:27 AM
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
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `thing_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `comment` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `thing_id`, `user_id`, `date`, `comment`) VALUES
(39, 11, 8, '2024-10-21 08:29:39', 'This looks straight out of an alien invasion scene! The atmosphere and clouds around the glowing light give off such a mysterious vibe. I wonder what’s happening here.'),
(40, 18, 8, '2024-10-21 08:30:31', 'The ghostly figure at the end of the hallway is chilling! It’s like it’s waiting for something... or someone.'),
(41, 14, 9, '2024-10-21 08:32:50', 'The way this UFO is lighting up the night sky is eerie! It looks like it’s scanning the area for something. Gives off major alien vibes!'),
(42, 17, 9, '2024-10-21 08:34:31', 'This beach scene is wonderful. That creature is enormous !'),
(43, 39, 9, '2024-10-21 08:35:05', 'It feels like a moment of first contact. The UFO\'s lights piercing through the clouds make it look so mysterious and otherworldly.'),
(44, 20, 68, '2024-10-21 08:38:00', 'This image feels like a journey through a dream! The boat sailing on what looks like liquid glass is surreal, and the soft lighting adds a magical touch to the whole scene.'),
(45, 21, 37, '2024-10-21 08:48:32', 'That rock totally looks like a troll frozen in time! The shape of its face and the rough texture give it such a lifelike, mystical quality—like it\'s watching over the landscape.');

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
(11, 'Ania', 'children-3374845_1280.jpg', 'Rare thing in the sky', '2024-01-23 23:00:00', 'Krakow', 'ufo', 2, 9),
(14, 'marta', 'fantasy-4697978_1280.jpg', 'ET on my garden', '2024-01-24 23:00:00', 'Washington', 'ufo', -1, 68),
(16, 'Carla', 'northern-lights-4966913_1280.jpg', 'Lights in the sky', '2024-02-18 23:00:00', 'Berlin', 'nature', 2, 77),
(17, 'Mary', 'fantasy-3281842_1280.jpg', 'Big sea creature', '2024-02-18 23:00:00', 'Tarragona', 'nature', 2, 37),
(18, 'guille', 'halloween-1746354_1280.jpg', 'Little ghosts', '2024-02-18 23:00:00', 'Barcelona', 'ghost', 2, 73),
(19, 'marc', 'halloween-4537428_1280.jpg', 'Ghost singer', '2024-02-18 23:00:00', 'Madrid', 'ghost', 0, 45),
(20, 'tania', 'water-4032975_1280.jpg', 'Strange ship on the sea', '2024-02-18 23:00:00', 'Red sea', 'nature', 1, 51),
(21, 'mariano', 'troll-785557_1280.jpg', 'Troll at the forest', '2024-02-22 23:00:00', 'Santpedor', 'nature', 2, 52),
(22, 'john', 'giant-5490737_1280.jpg', 'Giant on the road', '2024-02-23 23:00:00', 'Sevilla', 'nature', 0, 61),
(23, 'mortadelo', 'metro-1662163_1280.jpg', 'Underground shadows', '2024-02-29 23:00:00', 'London', 'city', -1, 168),
(39, 'Ania', 'ufo-8318128_1280.jpg', 'An alien coming from an ufo', '2024-10-07 15:28:57', 'Troya', 'ufo', 1, 0),
(44, 'mortadelo', 'tree-3094982_1280.jpg', 'A light in the forest', '2024-10-07 15:39:59', 'Edinburgh', 'nature', 0, 168),
(48, 'Harry', 'ufo-7149676_1280.jpg', 'Something glowing', '2024-10-21 08:22:56', 'ankara', 'ufo', 0, 170),
(49, 'Jordi', 'james-orr-Tij5HRslPBY-unsplash.jpg', 'Is that a lamp?', '2024-10-21 08:28:57', 'Bangladesh', 'city', 0, 8),
(50, 'Ania', 'invisible-man-3469868_1280.jpg', 'Invisible man', '2024-10-21 08:32:18', 'Chicago', 'city', 0, 9),
(51, 'marta', 'fantasy-5848285_1280.jpg', 'Invasion!', '2024-10-21 08:36:43', 'Los Angeles', 'ufo', 0, 68);

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
(37, 'Mary', 'mary@mail.com', '123456'),
(45, 'marc', 'marc@mail.com', '123456'),
(49, 'Michael', 'michael@mail.com', '123456'),
(51, 'tania', 'tania@tania.com', '123456'),
(52, 'mariano', 'mariano@mail.com', '123456'),
(61, 'john', 'john@john.com', '123456'),
(68, 'marta', 'marta@mail.com', '123456'),
(71, 'ivana', 'ivana@mail.com', '123456'),
(73, 'guille', 'guille@mail.com', '123456'),
(75, 'mireia', 'mireia@mireia.com', '123456'),
(77, 'Carla', 'carla@mail.com', '123456'),
(93, 'johan', 'johan@johan.com', '123456'),
(168, 'mortadelo', 'mortadelo@mail.com', '123456'),
(169, 'filemon', 'filemon@mail.com', '123456'),
(170, 'Harry', 'harry@mail.com', '123456');

-- --------------------------------------------------------

--
-- Table structure for table `votes`
--

CREATE TABLE `votes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `thing_id` int(11) NOT NULL,
  `value` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `votes`
--

INSERT INTO `votes` (`id`, `user_id`, `thing_id`, `value`) VALUES
(126, 93, 11, 1),
(127, 93, 14, -1),
(128, 93, 16, 1),
(129, 93, 17, 1),
(130, 8, 11, 1),
(131, 8, 18, 1),
(132, 8, 21, 1),
(133, 8, 23, -1),
(134, 9, 14, -1),
(135, 9, 18, 1),
(136, 9, 16, 1),
(137, 9, 17, 1),
(138, 9, 39, 1),
(139, 68, 20, 1),
(140, 37, 14, 1),
(141, 37, 21, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `thing_id` (`thing_id`),
  ADD KEY `user_id` (`user_id`);

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
  ADD UNIQUE KEY `unique_vote` (`user_id`,`thing_id`),
  ADD KEY `thing_id` (`thing_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `things`
--
ALTER TABLE `things`
  MODIFY `thing_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=171;

--
-- AUTO_INCREMENT for table `votes`
--
ALTER TABLE `votes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=142;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`thing_id`) REFERENCES `things` (`thing_id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `votes`
--
ALTER TABLE `votes`
  ADD CONSTRAINT `votes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `votes_ibfk_2` FOREIGN KEY (`thing_id`) REFERENCES `things` (`thing_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
