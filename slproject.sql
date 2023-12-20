-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Vært: 127.0.0.1
-- Genereringstid: 13. 10 2023 kl. 14:04:30
-- Serverversion: 10.4.28-MariaDB
-- PHP-version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `slproject`
--

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `categories`
--

CREATE TABLE `categories` (
  `sale_category_id` int(11) NOT NULL,
  `sale_category_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Data dump for tabellen `categories`
--

INSERT INTO `categories` (`sale_category_id`, `sale_category_name`) VALUES
(1, 'sand'),
(2, 'soil'),
(3, 'gravel');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `transactions`
--

CREATE TABLE `transactions` (
  `sale_transaktion_id` int(11) NOT NULL,
  `sale_date` date DEFAULT NULL,
  `sale_time` time DEFAULT NULL,
  `sale_item` varchar(255) DEFAULT NULL,
  `sale_quantity` int(11) DEFAULT NULL,
  `sale_price` decimal(10,2) DEFAULT NULL,
  `sale_total` decimal(10,2) DEFAULT NULL,
  `sale_paid` decimal(10,2) DEFAULT NULL,
  `sale_balance` decimal(10,2) DEFAULT NULL,
  `sale_category_id` int(11) DEFAULT NULL,
  `sale_vehicles_number` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Data dump for tabellen `transactions`
--

INSERT INTO `transactions` (`sale_transaktion_id`, `sale_date`, `sale_time`, `sale_item`, `sale_quantity`, `sale_price`, `sale_total`, `sale_paid`, `sale_balance`, `sale_category_id`, `sale_vehicles_number`) VALUES
(1, '2023-10-09', '15:16:00', 'strandsand', 4, 125.00, 500.00, 450.00, -50.00, 1, 'Dk45200'),
(2, '2023-10-09', '13:16:00', 'Jord', 4, 350.00, 1400.00, 1500.00, 100.00, 2, 'AF45655'),
(3, '2023-10-09', '13:17:00', 'Grus', 5, 355.00, 1775.00, 1700.00, -75.00, 3, 'BL47654'),
(4, '2023-10-09', '13:21:00', 'Grus', 20, 75.00, 1500.00, 1450.00, -50.00, 3, 'DE45655'),
(6, '2023-10-09', '22:03:00', 'sand', 20, 45.00, 900.00, 900.00, 0.00, 1, 'AF45655'),
(39, '2023-10-09', '22:39:00', 'sandkasse sand', 20, 25.00, 500.00, 500.00, 0.00, 1, 'cl32226'),
(40, '2023-10-10', '08:30:00', 'sand', 40, 20.00, 800.00, 800.00, 0.00, 1, 'AF45655'),
(45, '2023-10-10', '09:40:00', 'Jord', 45, 59.00, 2655.00, 2655.00, 0.00, 2, 'dk12123'),
(51, '2023-10-10', '07:52:00', 'saaand', 14, 220.00, 3080.00, 3080.00, 0.00, 1, 'dk12123'),
(52, '2023-10-10', '10:00:00', 'Grus', 10, 45.00, 450.00, 350.00, -100.00, 3, 'AF45655'),
(65, '2023-10-10', '10:00:00', 'jord', 300, 45.00, 13500.00, 13500.00, 0.00, 2, 'dk12123'),
(105, '2023-10-10', '11:55:00', 'sand', 50, 45.00, 2250.00, 2250.00, 0.00, 1, 'Dk45200'),
(106, '2023-10-10', '14:45:00', 'Sand', 10, 5.00, 50.00, 50.00, 0.00, 1, 'CH45675'),
(107, '2023-10-11', '07:47:00', 'Sand', 25, 45.00, 1125.00, 1125.00, 0.00, 1, 'dk22333'),
(108, '2023-10-11', '10:23:00', 'Grus', 45, 150.00, 6750.00, 6750.00, 0.00, 3, 'DE45655'),
(109, '2023-10-11', '13:05:00', 'sandkasse sand', 20, 35.00, 700.00, 700.00, 0.00, 1, 'cl32226'),
(110, '2023-10-11', '11:06:00', 'Jord', 400, 75.00, 30000.00, 30000.00, 0.00, 2, 'AH82400'),
(111, '2023-10-11', '13:38:00', 'sand', 14, 25.00, 350.00, 350.00, 0.00, 1, 'DE45655'),
(112, '2023-10-11', '11:39:00', 'sand', 25, 20.00, 500.00, 250.00, -250.00, 1, 'dk12123'),
(113, '2023-10-04', '11:39:00', 'sand', 10, 25.00, 250.00, 400.00, 150.00, 1, 'DE45655'),
(114, '2023-10-11', '11:40:00', 'sand', 15, 25.00, 375.00, 380.00, 5.00, 1, 'db45322'),
(115, '2023-10-02', '11:41:00', 'Grus', 40, 80.00, 3200.00, 3500.00, 300.00, 3, 'AF45392'),
(116, '2023-10-02', '11:42:00', 'Jord', 15, 32.00, 480.00, 480.00, 0.00, 2, 'PH43224'),
(117, '2023-10-11', '13:43:00', 'Grus', 25, 45.00, 1125.00, 1200.00, 75.00, 3, 'AF45655'),
(118, '2023-10-01', '14:09:00', 'Jord', 15, 35.00, 525.00, 600.00, 75.00, 2, 'AF45655'),
(119, '2023-10-09', '14:19:00', 'Sand', 25, 35.00, 875.00, 900.00, 25.00, 1, 'DB48200'),
(120, '2023-10-11', '14:44:00', 'Sand', 14, 18.00, 252.00, 252.00, 0.00, 1, 'KL34894'),
(121, '2023-10-11', '14:48:00', 'Sand', 15, 19.00, 285.00, 285.00, 0.00, 1, 'ES45365'),
(122, '2023-10-12', '07:00:00', 'jord', 40, 35.00, 1400.00, 1550.00, 150.00, 2, 'AF45655'),
(123, '2023-10-12', '12:50:00', 'Sand', 8, 25.00, 200.00, 300.00, 100.00, 1, 'AY41874'),
(137, '2023-10-12', '13:29:00', 'sand', 40, 20.00, 800.00, 800.00, 0.00, 1, 'df345544'),
(138, '2023-10-13', '13:00:00', 'Sand', 10, 25.00, 250.00, 300.00, 50.00, 1, 'DE79554'),
(139, '2023-10-13', '13:00:00', 'Sand', 10, 25.00, 250.00, 300.00, 50.00, 1, 'DE79554'),
(140, '2023-10-13', '13:30:00', 'Jord', 25, 45.00, 1125.00, 1125.00, 0.00, 2, 'AU94333'),
(141, '2023-10-13', '13:30:00', 'Jord', 25, 45.00, 1125.00, 1125.00, 0.00, 2, 'AU94333'),
(142, '2023-10-13', '13:28:00', 'Grus', 100, 25.00, 2500.00, 2545.00, 45.00, 3, 'EE34656'),
(143, '2023-10-13', '11:32:00', 'StrandSand', 25, 35.00, 875.00, 900.00, 25.00, 1, 'SL43564'),
(144, '2023-10-13', '11:42:00', 'Jord', 10, 25.00, 250.00, 250.00, 0.00, 2, 'DE43299');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `user_password` char(60) DEFAULT NULL,
  `user_email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Data dump for tabellen `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_password`, `user_email`) VALUES
(1, 'emil', '$2y$10$ERz37kd1EPZKFf2qD/DWBO1.0UldxqL.bzupdm8slQYO4fedVGj.6', 'admin@test.dk');

--
-- Begrænsninger for dumpede tabeller
--

--
-- Indeks for tabel `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`sale_category_id`);

--
-- Indeks for tabel `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`sale_transaktion_id`),
  ADD KEY `sale_category_id` (`sale_category_id`);

--
-- Indeks for tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Brug ikke AUTO_INCREMENT for slettede tabeller
--

--
-- Tilføj AUTO_INCREMENT i tabel `categories`
--
ALTER TABLE `categories`
  MODIFY `sale_category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Tilføj AUTO_INCREMENT i tabel `transactions`
--
ALTER TABLE `transactions`
  MODIFY `sale_transaktion_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=145;

--
-- Tilføj AUTO_INCREMENT i tabel `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Begrænsninger for dumpede tabeller
--

--
-- Begrænsninger for tabel `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`sale_category_id`) REFERENCES `categories` (`sale_category_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
