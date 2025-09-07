-- MySQL dump 10.13  Distrib 8.4.6, for Linux (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	8.4.6

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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `Customer_Number` int(5) unsigned zerofill NOT NULL,
  `Username` varchar(30) NOT NULL,
  `First_Name` varchar(150) NOT NULL,
  `Last_Name` varchar(150) NOT NULL,
  `Email` varchar(300) NOT NULL,
  `Date_of_Birth` date NOT NULL,
  `Password` varchar(150) NOT NULL,
  `Last_Login` datetime DEFAULT NULL,
  PRIMARY KEY (`Customer_Number`),
  UNIQUE KEY `Username` (`Username`),
  UNIQUE KEY `Username_2` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (00001,'hong_lu','hong','lu','123qwe@126.com','2001-01-20','12345678',NULL),(00002,'ssss','ssss','ssss','123qwe@126.com','2001-01-20','12345678',NULL),(02221,'aaa','aaa','aaas','3323qwe@126.com','2001-01-20','12345678',NULL),(12212,'qqq2','qq1','ww1','123qwe@126.com','2020-01-20','12345678',NULL),(12218,'qqq211','qq','ww','123qwe@126.com','2020-01-20','12345678',NULL),(12222,'qqq211qq','qq','ww','123qwe@126.com','2020-01-20','12345678',NULL),(12263,'bbbw','qq','ww','123qwe@126.com','2020-01-20','12345678',NULL),(12264,'bbbwew','qq','ww','123qwe@126.com','2020-01-20','12345678',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-07 15:47:45
