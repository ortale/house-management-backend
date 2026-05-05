-- MySQL dump 10.13  Distrib 8.0.45, for Linux (x86_64)
--
-- Host: localhost    Database: house_management
-- ------------------------------------------------------
-- Server version	8.0.45-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `certificates`
--

DROP TABLE IF EXISTS `certificates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `certificates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `date` date NOT NULL,
  `expireDate` date NOT NULL,
  `houseId` int NOT NULL,
  `emailSent` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `houseId` (`houseId`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certificates`
--

LOCK TABLES `certificates` WRITE;
/*!40000 ALTER TABLE `certificates` DISABLE KEYS */;
INSERT INTO `certificates` VALUES (15,'EICR 4 Lockwood Square SE16 2HS','2023-12-13','2028-12-13',28,0),(16,'EPC 4 lockwood','2023-12-16','2033-12-15',28,0),(17,'FAIC  4 Lockwood Square SE16 2HS','2026-04-14','2027-04-14',28,1),(18,'PAT 4 Lockwood Square SE16 2HS','2026-04-19','2027-04-19',28,0),(19,'EICR - 9 Hallam SW9 6JN','2024-09-04','2029-09-04',29,0),(20,'FAIC 9 Hallam SW9 6JN','2026-04-01','2027-04-01',29,0),(21,'Gas Certificate - Flat 9 Hallam SW9 6JN','2024-06-24','2025-06-24',29,1),(22,'PAT  - Flat 9, Hallam House Gosling Way SW9 6JN','2026-04-01','2027-04-01',29,0),(23,'EICR  - 12 Marden Square SE16 2HZ','2024-09-04','2029-09-04',30,0),(24,'Energy performance certificate (EPC) – Find an energy certificate – GOV.UK','2024-12-23','2034-12-22',30,0),(25,'FAIC 12 Marden Square London SE16 2HZ','2026-03-14','2027-03-14',30,1),(26,'Pat 12 Marden Square SE16 2HZ','2025-12-05','2026-12-05',30,1),(32,'EICR 26 Dighton Court SE5 0PR','2023-12-13','2028-12-13',32,0),(33,'FAIC','2025-08-10','2026-08-10',32,0),(34,'GasCert-37713501745','2023-06-26','2024-06-26',32,0),(35,'Electrical Certificate','2022-09-13','2027-09-13',33,0),(36,'EPC','2018-11-02','2028-11-01',33,0),(37,'FAIC + Extinguisher + Fire Blanket','2025-02-16','2026-02-16',33,0),(38,'PAT','2025-01-16','2026-01-16',33,1),(39,'Gas','2024-06-26','2025-06-26',33,1),(40,'EPC','2019-01-21','2029-01-21',34,0),(41,'FAIC','2026-03-30','2027-03-30',34,1),(42,'PAT','2026-03-30','2027-03-30',34,1),(43,'EICR','2023-12-13','2028-12-13',35,0),(44,'EPC','2023-12-15','2033-12-15',35,0),(45,'FAIC','2024-04-17','2025-04-17',35,1),(46,'PAT','2024-02-25','2025-02-25',35,0),(47,'EICR','2023-12-13','2028-11-30',36,0),(48,'EICR','2023-02-02','2028-02-02',37,0),(49,'EPC','2018-09-20','2028-09-20',37,0),(50,'FAIC','2025-02-20','2026-02-20',37,1),(51,'PAT','2025-02-20','2026-02-20',37,1),(52,'Cert Test','2024-03-26','2025-03-26',38,1),(53,'HMO License','2025-02-13','2028-02-12',33,0),(54,'HMO License','2020-12-29','2025-12-28',34,1),(55,'EICR','2024-08-22','2029-08-22',34,0),(56,'HMO Licence','2026-04-05','2031-04-05',30,1),(57,'EICR','2024-08-16','2028-04-05',31,0),(58,'EPC','2024-10-07','2034-10-06',31,0),(59,'FAIC','2026-04-11','2027-04-11',31,1),(60,'PAT','2026-04-11','2027-04-11',31,1),(61,'HMO Licence','2024-12-29','2025-12-28',37,1),(62,'Energy performance certificate (EPC)','2025-09-02','2035-09-02',27,0),(63,'Energy performance certificate (EPC)','2025-09-02','2035-09-02',32,0),(64,'PAT 238 Lucey Way SE16 3UG','2025-08-10','2026-08-10',36,0),(65,'FAIC 238 Lucey Way SE16 3UG','2025-08-10','2026-08-10',36,0);
/*!40000 ALTER TABLE `certificates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `houses`
--

DROP TABLE IF EXISTS `houses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `houses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `astExpDate` date DEFAULT NULL,
  `emailSent` tinyint NOT NULL DEFAULT '0',
  `emailSentDate` date DEFAULT NULL,
  `rentAmount` double(10,2) NOT NULL DEFAULT '0.00',
  `feePercent` double DEFAULT '0',
  `rentDate` int NOT NULL,
  `astExpEmailSentDate` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `houses`
--

LOCK TABLES `houses` WRITE;
/*!40000 ALTER TABLE `houses` DISABLE KEYS */;
INSERT INTO `houses` VALUES (27,'01 Folkestone House - SE17 2RS','info@realanthonyestate.co.uk','2027-02-28',0,'2026-04-30',2600.00,NULL,1,'2026-02-28'),(28,'04 Lockwood Square - SE16 2HS','info@realanthonyestate.co.uk','2026-12-08',0,'2026-04-07',2750.00,NULL,8,NULL),(29,'9 Hallam House - SW9 6JN','info@realanthonyestate.co.uk','2026-12-20',0,'2026-04-20',2100.00,NULL,21,'2025-12-20'),(30,'12 Marden Square - SE16 2HZ','info@realanthonyestate.co.uk','2026-05-14',0,'2026-04-14',2100.00,NULL,15,'2026-04-14'),(31,'14 Bessingham Walk - SE4 2HZ','info@realanthonyestate.co.uk','2026-11-15',0,'2026-04-15',2250.00,NULL,16,'2025-09-15'),(32,'26 Dighton Court - SE5 0PR','info@realanthonyestate.co.uk','2027-02-28',0,'2026-04-18',2800.00,NULL,1,NULL),(34,'109 Marden Square - SE16 2JA','info@realanthonyestate.co.uk','2026-08-09',0,'2026-04-09',2450.00,NULL,10,'2025-07-09'),(35,'120 New Place Square - SE16 2HR','info@realanthonyestate.co.uk','2026-11-19',0,'2026-04-19',2350.00,NULL,20,'2025-11-19'),(36,'238 Lucey Way - SE16 3UG','info@realanthonyestate.co.uk','2027-04-16',0,'2026-04-16',3075.00,NULL,17,'2026-04-16'),(37,'246 Lucey Way - SE16 3UG','info@realanthonyestate.co.uk','2026-08-01',0,'2026-05-01',2750.00,NULL,2,'2025-08-01');
/*!40000 ALTER TABLE `houses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` text COLLATE utf8mb4_general_ci NOT NULL,
  `rentAmount` decimal(10,0) NOT NULL,
  `feeAmount` decimal(10,0) NOT NULL,
  `paymentDate` date NOT NULL,
  `dueDate` date NOT NULL,
  `emailSent` tinyint NOT NULL DEFAULT '0',
  `houseId` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-05 15:22:34
