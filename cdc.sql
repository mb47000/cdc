-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 01 avr. 2020 à 22:03
-- Version du serveur :  10.4.11-MariaDB
-- Version de PHP : 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `cdc`
--

-- --------------------------------------------------------

--
-- Structure de la table `cdctext`
--

CREATE TABLE `cdctext` (
  `cdc_idText` int(11) NOT NULL,
  `cdc_nameText` varchar(50) NOT NULL,
  `cdc_text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `cdctext`
--

INSERT INTO `cdctext` (`cdc_idText`, `cdc_nameText`, `cdc_text`) VALUES
(1, 'Index Content', 'Ce texte provient d’une base de donnée et affiche correctement les accents é à è É . Lorem\r\nipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\r\net dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris\r\nnisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate\r\nvelit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\r\nproident, sunt in culpa qui officia deserunt mollit anim id est laborum.');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `cdctext`
--
ALTER TABLE `cdctext`
  ADD PRIMARY KEY (`cdc_idText`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `cdctext`
--
ALTER TABLE `cdctext`
  MODIFY `cdc_idText` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
