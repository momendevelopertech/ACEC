-- MySQL dump 10.13  Distrib 8.4.3, for Win64 (x86_64)
--
-- Host: localhost    Database: acec_dashboard
-- ------------------------------------------------------
-- Server version	8.4.3

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
-- Table structure for table `blog_posts`
--

DROP TABLE IF EXISTS `blog_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog_posts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title_ar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title_en` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `excerpt_ar` text COLLATE utf8mb4_unicode_ci,
  `excerpt_en` text COLLATE utf8mb4_unicode_ci,
  `content_ar` longtext COLLATE utf8mb4_unicode_ci,
  `content_en` longtext COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tags` json DEFAULT NULL,
  `author_id` bigint unsigned DEFAULT NULL,
  `is_published` tinyint(1) NOT NULL DEFAULT '1',
  `published_at` timestamp NULL DEFAULT NULL,
  `meta_title_ar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_title_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_desc_ar` text COLLATE utf8mb4_unicode_ci,
  `meta_desc_en` text COLLATE utf8mb4_unicode_ci,
  `views` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `blog_posts_slug_unique` (`slug`),
  KEY `blog_posts_author_id_foreign` (`author_id`),
  CONSTRAINT `blog_posts_author_id_foreign` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_posts`
--

LOCK TABLES `blog_posts` WRITE;
/*!40000 ALTER TABLE `blog_posts` DISABLE KEYS */;
INSERT INTO `blog_posts` VALUES (1,'importance-safety-engineering','+�+�+�+�+� +�+�+�+�+� +�+�+�+�+�+�+� +�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+�','The Importance of Safety Engineering in Industrial Projects','+�+�+�+� +�+�+� +�+�+� +�+�+�+�+� +�+�+�+�+�+�+� +�+� +�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+++�.','Learn about the role of safety engineering in protecting industrial facilities and reducing risks.','<p>+�+�+�+�+� +�+�+�+�+� +�+�+�+�+�+�+� +�+� +�+�+� +�+�+�+�+�+�+� +�+� +�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+�. +�+�+�+� +�+�+� +�+�+�+�+�+�+� +�+�+�+�+� +�+�+++�+� +�+�+�+�+�+�+� +�+�+�+�+++�+�+� +�+�+�+�+�+� +�+�+�+�+�+++� +�+�+�+� +�++++ +�+�+++�+�+�+�.</p><p>+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+�+�+� +�+�+�+�++ +�+�+�+�+�+� +�+�+�+�+�+�+� +�+�+� +�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+� +�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+� +�+�+++�+� +�+�+�+�+� +�+�+�+�+�+�+� +�+� +�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+�+�.</p>','<p>Safety engineering is one of the most important aspects in the design and implementation of industrial projects. It includes the design of alarm and fire suppression systems, risk assessment, and emergency planning.</p><p>In Saudi Arabia, relevant authorities such as Civil Defense and MODON require integrated safety systems in all industrial facilities.</p>',NULL,'safety','[\"safety\", \"industrial\", \"compliance\"]',NULL,1,'2026-05-06 06:38:02','+�+�+�+�+� +�+�+�+�+� +�+�+�+�+�+�+� +�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+� | +�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�','The Importance of Safety Engineering in Industrial Projects | ACEC Blog',NULL,NULL,20,'2026-05-06 06:38:02','2026-05-10 05:00:13'),(2,'modon-requirements-guide','+�+�+�+� +�+�+�+�+�+++�+� +�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+�','MODON Requirements Guide for New Factories','+�+� +�+� +�+�+�+�+� +�+�+�+�+�+� +�+� +�+�+�+�+�+++�+� +�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+� +�+�+�+�+�+�+�+�.','Everything you need to know about Saudi Authority for Industrial Cities requirements.','<p>+�+�+� +�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+++� +�+�+�+�+�+�+� (+�+�+�) +�+�+�+�+�+� +�+� +�+�+�+�+�+�+�+++�+� +�+�+�+�+�+�+�+�+� +�+�+�+� +�+�+� +�+�+�+�+�+�+�+� +�+�+� +�+�+� +�+�+�+�+� +�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+�.</p><p>+�+�+�+� +�+�+� +�+�+�+�+�+�+�+++�+� +�+�+�+�+++++�+� +�+�+�+�+++�+�+�+� +�+�+�+++�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+++�+�+�+� +�+�+�+�+�+�+�.</p>','<p>The Saudi Authority for Industrial Cities and Technology Zones (MODON) sets a range of requirements and standards that must be complied with when designing and building new factories.</p><p>These requirements include layout plans, safety systems, ventilation, industrial lighting, and licensing requirements.</p>',NULL,'compliance','[\"MODON\", \"factory\", \"compliance\"]',NULL,1,'2026-05-06 06:38:02','+�+�+�+� +�+�+�+�+�+++�+� +�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+� | +�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�','MODON Requirements Guide for New Factories | ACEC Blog',NULL,NULL,20,'2026-05-06 06:38:02','2026-05-10 05:00:15'),(3,'future-engineering-saudi','+�+�+�+�+�+� +�+�+�+�+�+�+� +�+� +�+�+�+� 2030','The Future of Engineering in Vision 2030','+�+�+� +�+�+�+�+� +�+�+�+�+�+�+� +�+� +�+�+�+�+� +�+�+�+�+� +�+�+�+� +�+�+�+�+�+�+� 2030.','How engineering contributes to achieving Saudi Vision 2030 goals.','<p>+�+�+� +�+�+�+�+�+�+� +�+�+�+�+� +�+�+�+�+�+� +�+� +�+�+�+�+� +�+�+�+�+� +�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+�+� 2030. +�+� +�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+++�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+�+� +�+�+�+� +�+�+�+�+�+�+�+�+� +�+�+�+�+� +�+�+�+�+�+�+� +�+� +�+�+�+� +�+�+�+�+�+� +�+�+�+�.</p>','<p>Engineering is a fundamental pillar in achieving the goals of Saudi Vision 2030. Through major projects and urban and industrial development, engineers play a pivotal role in building a better future.</p>',NULL,'general','[\"vision2030\", \"future\", \"engineering\"]',NULL,1,'2026-05-06 06:38:02','+�+�+�+�+�+� +�+�+�+�+�+�+� +�+� +�+�+�+� 2030 | +�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�','The Future of Engineering in Vision 2030 | ACEC Blog',NULL,NULL,20,'2026-05-06 06:38:02','2026-05-10 05:00:15');
/*!40000 ALTER TABLE `blog_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
INSERT INTO `cache` VALUES ('laravel-cache-livewire-rate-limiter:16d36dff9abd246c67dfac3e63b993a169af77e6','i:1;',1778317241),('laravel-cache-livewire-rate-limiter:16d36dff9abd246c67dfac3e63b993a169af77e6:timer','i:1778317241;',1778317241);
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_locks_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `certifications`
--

DROP TABLE IF EXISTS `certifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `certifications` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name_ar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description_ar` text COLLATE utf8mb4_unicode_ci,
  `description_en` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `issuer_ar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `issuer_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `issue_date` date DEFAULT NULL,
  `expiry_date` date DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certifications`
--

LOCK TABLES `certifications` WRITE;
/*!40000 ALTER TABLE `certifications` DISABLE KEYS */;
INSERT INTO `certifications` VALUES (1,'+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+�+�','Saudi Council of Engineers Membership ','+�+�+�+�+� +�+�+�+�+�+� +�+� +�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+�+� +�+�+�+�+� +�+�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�.','Accredited membership from the Saudi Council of Engineers for all our working engineers.',NULL,'+�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+�+�','Saudi Council of Engineers',NULL,NULL,1,1,'2026-05-06 06:38:02','2026-05-06 06:42:17'),(2,'+�+�+�+�+� +�+�+�+�+�+�+� +�+� +�+�+�+�+�+� +�+�+�+�+�+�','Civil Defense Safety Certificate','+�+�+�+�+� +�+�+�+�+�+� +�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+� +�+�+++�+� +�+�+�+�+�+�+�.','Accredited certificate from the General Directorate of Civil Defense for safety systems design.',NULL,'+�+�+�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+�','General Directorate of Civil Defense',NULL,NULL,2,1,'2026-05-06 06:38:02','2026-05-06 06:38:02'),(3,'+�+�+�+�+� ISO 9001 +�+�+�+�+�+�','ISO 9001 Quality Certification','+�+++�+� +�+�+�+�+� +�+�+�+� +�+�+�+�+� +�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+�.','Certified quality management system according to international standards.',NULL,'+�+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+�+�','International Organization for Standardization',NULL,NULL,3,1,'2026-05-06 06:38:02','2026-05-06 06:38:02');
/*!40000 ALTER TABLE `certifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name_ar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'Dr. Sulaiman Al Habib','Dr. Sulaiman Al Habib',NULL,NULL,0,1,'2026-05-05 10:53:10','2026-05-05 10:53:10'),(2,'McDonald\'s','McDonald\'s',NULL,NULL,1,1,'2026-05-05 10:53:10','2026-05-05 10:53:10'),(3,'PepsiCo','PepsiCo',NULL,NULL,2,1,'2026-05-05 10:53:10','2026-05-05 10:53:10'),(4,'STC','STC',NULL,NULL,3,1,'2026-05-05 10:53:10','2026-05-05 10:53:10'),(5,'Leejam','Leejam',NULL,NULL,4,1,'2026-05-05 10:53:10','2026-05-05 10:53:10'),(6,'Deemah','Deemah',NULL,NULL,5,1,'2026-05-05 10:53:10','2026-05-05 10:53:10'),(7,'SRMG','SRMG',NULL,NULL,6,1,'2026-05-05 10:53:10','2026-05-05 10:53:10'),(8,'Amlak','Amlak',NULL,NULL,7,1,'2026-05-05 10:53:10','2026-05-05 10:53:10'),(9,'Flyadeal','Flyadeal',NULL,NULL,8,1,'2026-05-05 10:53:10','2026-05-05 10:53:10'),(10,'Floward','Floward',NULL,NULL,9,1,'2026-05-05 10:53:10','2026-05-05 10:53:10'),(11,'Gulf Aluminum','Gulf Aluminum',NULL,NULL,10,1,'2026-05-05 10:53:10','2026-05-05 10:53:10'),(12,'SME Marketplace','SME Marketplace',NULL,NULL,11,1,'2026-05-05 10:53:10','2026-05-05 10:53:10'),(13,'momen','momen',NULL,'https://test.ac-ec.com.sa/',12,1,'2026-05-05 10:53:10','2026-05-06 06:44:57');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hero_sections`
--

DROP TABLE IF EXISTS `hero_sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hero_sections` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `lang` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitle` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `stat1_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stat1_label` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stat2_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stat2_label` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stat3_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stat3_label` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stat4_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stat4_label` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cta1_text` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cta1_link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cta2_text` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cta2_link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hero_sections`
--

LOCK TABLES `hero_sections` WRITE;
/*!40000 ALTER TABLE `hero_sections` DISABLE KEYS */;
INSERT INTO `hero_sections` VALUES (1,'ar','+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+�+�+�+�','+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+�','+�+�+�+�+�+�+� +�+�+�+�+�+�+�+�+� +�+� +�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+�+�.','50+','+�+�+�+�+� +�+�+�+�','15+','+�+�+� +�+�+�+�','30+','+�+�+�+�','6','+�+�+�+�+� +�+�+�+�+�+�','+�+�+�+� +�+�+�+�+�+�+�','/ar/contact','+�+�+�+� +�+�+� +�+�+�+�+�+�+�','/ar/services',NULL,'2026-05-06 06:38:02','2026-05-06 06:38:02'),(2,'en','Building the Future with Exceptional Engineering','Arab Charter Engineering Consultants','Your trusted partners in delivering engineering projects with the highest standards of quality and safety in Saudi Arabia.','50+','Completed Projects','15+','Years Experience','30+','Clients','6','Specialized Services','Book Consultation','/en/contact','Our Services','/en/services',NULL,'2026-05-06 06:38:02','2026-05-06 06:38:02');
/*!40000 ALTER TABLE `hero_sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_postings`
--

DROP TABLE IF EXISTS `job_postings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_postings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title_ar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title_en` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description_ar` text COLLATE utf8mb4_unicode_ci,
  `description_en` text COLLATE utf8mb4_unicode_ci,
  `requirements_ar` text COLLATE utf8mb4_unicode_ci,
  `requirements_en` text COLLATE utf8mb4_unicode_ci,
  `location_ar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `salary_range` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_postings`
--

LOCK TABLES `job_postings` WRITE;
/*!40000 ALTER TABLE `job_postings` DISABLE KEYS */;
INSERT INTO `job_postings` VALUES (1,'+�+�+�+�+� +�+�+�+� +�+�+�','Senior Civil Engineer','+�+�+�+� +�+� +�+�+�+�+� +�+�+�+� +�+� +�+�+�+� +�+� +�+�+� +�+� 8 +�+�+�+�+� +�+� +�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+�+�.','We are looking for a civil engineer with at least 8 years of experience in design and supervision of construction projects.','+�+�+�+�+�+�+�+�+� +�+�+�+�+� +�+�+�+�+�+� +�+�+�+� 8+ +�+�+�+�+�+� +�+�+�+�+� AutoCAD +�Revit+� +�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+�+�.','Bachelor in Civil Engineering, 8+ years experience, proficiency in AutoCAD and Revit, SCE membership.','+�+�+�+�+�+�+� +�+�+�+�+�+�+�+�','Riyadh, Saudi Arabia','full-time',NULL,1,NULL,'2026-05-06 06:38:02','2026-05-06 06:38:02'),(2,'+�+�+�+�+� +�+�+�+�+�','Safety Engineer','+�+++�+�+� +�+�+�+�+� +�+�+�+�+� +�+�+�+�+� +�+� +�+�+�+�+� +�+�+++�+� +�+�+�+�+�+�+� +�+� +�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+�.','Safety engineer specialized in fire protection and industrial safety systems design required.','+�+�+�+�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+� 5+ +�+�+�+�+� +�+� +�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+� +�+�+�+++�+� NFPA +�SBC.','Engineering degree, 5+ years in safety engineering, knowledge of NFPA and SBC systems.','+�+�+�+�+�+�+� +�+�+�+�+�+�+�+�','Riyadh, Saudi Arabia','full-time',NULL,1,NULL,'2026-05-06 06:38:02','2026-05-06 06:38:02'),(3,'+�+�+�+� +�+�+�+�+�','Interior Designer','+�+�+�+� +�+� +�+�+�+� +�+�+�+�+� +�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+�.','We are looking for a creative interior designer to design commercial and residential spaces.','+�+�+�+�+�+�+�+�+� +�+�+�+�+� +�+�+�+�+�+� +�+�+�+� 3+ +�+�+�+�+�+� +�+�+�+�+� 3D Max +�+� SketchUp.','Interior Design degree, 3+ years experience, proficiency in 3D Max or SketchUp.','+�+�+�+� +�+�+�+�+�+�+�+�','Jeddah, Saudi Arabia','full-time',NULL,1,NULL,'2026-05-06 06:38:02','2026-05-06 06:38:02');
/*!40000 ALTER TABLE `job_postings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` smallint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subject` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `service_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT '0',
  `is_replied` tinyint(1) NOT NULL DEFAULT '0',
  `reply_text` text COLLATE utf8mb4_unicode_ci,
  `replied_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,'Ahmed','ahmed@test.com',NULL,NULL,'This is a test message for verification',NULL,0,0,NULL,NULL,'2026-05-06 03:14:54','2026-05-06 03:14:54'),(2,'test','t@t.com',NULL,NULL,'test message for rate limit',NULL,0,0,NULL,NULL,'2026-05-06 03:39:39','2026-05-06 03:39:39'),(3,'test','t@t.com',NULL,NULL,'test message for rate limit',NULL,0,0,NULL,NULL,'2026-05-06 03:39:39','2026-05-06 03:39:39'),(4,'test','t@t.com',NULL,NULL,'test message for rate limit',NULL,0,0,NULL,NULL,'2026-05-06 03:39:40','2026-05-06 03:39:40'),(5,'test','t@t.com',NULL,NULL,'test message for rate limit',NULL,0,0,NULL,NULL,'2026-05-06 03:39:40','2026-05-06 03:39:40'),(6,'test','t@t.com',NULL,NULL,'test message for rate limit',NULL,0,0,NULL,NULL,'2026-05-06 03:39:40','2026-05-06 03:39:40'),(7,'Test','test@test.com',NULL,NULL,'Hello',NULL,0,0,NULL,NULL,'2026-05-06 03:48:38','2026-05-06 03:48:38'),(8,'Test User','test@test.com',NULL,NULL,'Testing contact form',NULL,0,0,NULL,NULL,'2026-05-06 04:24:37','2026-05-06 04:24:37'),(9,'Test User','test@example.com','+966500000000','Test message','This is a test message from the contact form',NULL,0,0,NULL,NULL,'2026-05-06 04:37:37','2026-05-06 04:37:37');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2026_05_05_125051_create_acec_tables',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `page_views`
--

DROP TABLE IF EXISTS `page_views`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `page_views` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `page` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lang` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ip_hash` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `page_views`
--

LOCK TABLES `page_views` WRITE;
/*!40000 ALTER TABLE `page_views` DISABLE KEYS */;
/*!40000 ALTER TABLE `page_views` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title_ar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title_en` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description_ar` text COLLATE utf8mb4_unicode_ci,
  `description_en` text COLLATE utf8mb4_unicode_ci,
  `content_ar` longtext COLLATE utf8mb4_unicode_ci,
  `content_en` longtext COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gallery` json DEFAULT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location_ar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `client_ar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `client_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `year` int DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT '0',
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `meta_title_ar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_title_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `projects_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,'hospital-complex-riyadh','+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+�+�','Hospital Complex in Riyadh','+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+� +�+�+�+�+�+� +�+�+� 200 +�+�+�+� +�+� +�+�+�+� +�+�+�+�+�+�+� +�+�+++�+�+� +�+�+�+�+�+�+�+�.','Complete engineering design and supervision for a 200-bed hospital complex with all supporting medical facilities.','+�+�+� +�+�+�+�+�+�+� +�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+�+�+�+�+�+�+� +�+�+�+�+�+�+� +�+� +�+�+�+�+�+�+� +�+�+� +�+�+�+� +�+�+�+�+� +�+�+�+�+�+�+�. +�+� +�+�+�+�+�+�+�+� +�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+� +�+�+�+�+�+�.','The project included integrated architectural, structural, and MEP design, with supervision of all implementation phases. Highest safety and construction quality standards were maintained.',NULL,NULL,'healthcare','+�+�+�+�+�+�+� +�+�+�+�+�+�+�+�','Riyadh, Saudi Arabia','+�+�+�+�+�+� +�+�+�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+�','Specialized Hospitals Group',2024,1,1,1,'+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+�+� | +�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�','Hospital Complex in Riyadh | ACEC','2026-05-06 06:38:02','2026-05-06 06:38:02'),(2,'commercial-tower-jeddah','+�+�+� +�+�+�+�+� +�+�+�+�','Commercial Tower in Jeddah','+�+�+�+�+� +�+�+�+�+� +�+�+�+� +�+�+�+�+� +�+�+�+�+�+�+� 30 +++�+�+�+�+� +�+� +�+�+�+�+� +�+�+�+�+�+� +�+�+++�+�+�+�.','Engineering design for a 30-story commercial tower with multi-level parking.','+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+�+� +�+�+�+++�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+� +�+�+�+�+�+�.','The project included feasibility study, architectural and structural design, and fire safety and protection systems.',NULL,NULL,'commercial','+�+�+�+� +�+�+�+�+�+�+�+�','Jeddah, Saudi Arabia','+�+�+�+� +�+�+�+++�+�+� +�+�+�+�+�+�+�','Real Estate Development Co.',2023,1,2,1,'+�+�+� +�+�+�+�+� +�+�+�+� | +�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�','Commercial Tower in Jeddah | ACEC','2026-05-06 06:38:02','2026-05-06 06:38:02'),(3,'industrial-factory-dammam','+�+�+�+� +�+�+�+�+� +�+�+�+�+�+�+�','Industrial Factory in Dammam','+�+�+�+�+� +�+�+�+� +�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+� +�+�+�+�+�+�+++�+� +�+�+� +�+� +�+�+++�+� +�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+� +�+�+++�+�+�.','Design of a complete industrial factory according to MODON requirements with advanced ventilation and industrial lighting systems.','+�+�+� +�+�+�+�+�+�+� +�+�+�+�+++++�+� +�+�+�+�+++�+�+�+� +�+�+�+�+�+�+� +�+�+�+++�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+++�+�+�+� +�+�+�+�+�+�+�.','The design included equipment layout plans, handling systems, production flow, and licensing requirements.',NULL,NULL,'industrial','+�+�+�+�+�+�+� +�+�+�+�+�+�+�+�','Dammam, Saudi Arabia','+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+�','Advanced Industries Co.',2024,1,3,1,'+�+�+�+� +�+�+�+�+� +�+�+�+�+�+�+� | +�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�','Industrial Factory in Dammam | ACEC','2026-05-06 06:38:02','2026-05-06 06:38:02'),(4,'educational-complex','+�+�+�+� +�+�+�+�+�+�','Educational Complex','+�+�+�+�+� +�+�+�+�+�+� +�+�+� +�+�+�+� +�+�+�+�+�+� +�+�+� +�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+�+�.','Design and supervision of an educational complex with schools and integrated sports facilities.','+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+�+� +�+�+�+++�+� +�+�+�+�+�+�+� +�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+� +�+�+�+�+�+�+�.','The project included architectural and structural design and safety systems in compliance with Ministry of Education standards.',NULL,NULL,'education','+�+�+�+�+�+�+� +�+�+�+�+�+�+�+�','Riyadh, Saudi Arabia','+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�','Private Education Foundation',2023,0,4,1,'+�+�+�+� +�+�+�+�+�+� | +�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�','Educational Complex | ACEC','2026-05-06 06:38:02','2026-05-06 06:38:02'),(5,'luxury-residential-villas','+�+�+� +�+�+�+�+� +�+�+�+�+�','Luxury Residential Villas','+�+�+�+�+� 12 +�+�+�+� +�+�+�+�+� +�+�+�+�+� +�+� +�+�+�+�+� +�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+�.','Design of 12 luxury residential villas with private gardens and integrated recreational facilities.','+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+� +�+�+++�+� +�+�+�+� +�+�+�+�+�+� +�+� +�+�+�+�+�+�.','The project included interior and exterior design with smart home control systems.',NULL,NULL,'residential','+�+�+�+�+�+�+� +�+�+�+�+�+�+�+�','Riyadh, Saudi Arabia','+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�','Residential Construction Co.',2024,0,5,1,'+�+�+� +�+�+�+�+� +�+�+�+�+� | +�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�','Luxury Residential Villas | ACEC','2026-05-06 06:38:02','2026-05-06 06:38:02'),(6,'restaurant-interior-design','+�+�+�+�+� +�+�+�+�+� +�+�+++�+� +�+�+�+�','Luxury Restaurant Interior Design','+�+�+�+�+� +�+�+�+�+� +�+�+�+�+�+� +�+�+++�+� +�+�+�+� +�+�+�+� 200 +�+�+�+� +�+� +�+�+�+�+� +�+�+�+�+�+� +�+�+�+�.','Complete interior design for a luxury restaurant with 200-seat capacity featuring modern lighting and decor.','+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+� +�+� +�+�+�+�+�+� +�+�+++�+� +�+�+�+�+�+�+� +�+�+�+�+�+�.','The design included material, color, and furniture selection while complying with safety and health regulations.',NULL,NULL,'interior','+�+�+�+� +�+�+�+�+�+�+�+�','Jeddah, Saudi Arabia','+�+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+�','Luxury Hospitality Group',2025,0,6,1,'+�+�+�+�+� +�+�+�+�+� +�+�+++�+� +�+�+�+� | +�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�','Luxury Restaurant Interior Design | ACEC','2026-05-06 06:38:02','2026-05-06 06:38:02');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sections_config`
--

DROP TABLE IF EXISTS `sections_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sections_config` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `section_key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_ar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_visible` tinyint(1) NOT NULL DEFAULT '1',
  `order` int NOT NULL DEFAULT '0',
  `custom_settings` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sections_config_section_key_unique` (`section_key`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sections_config`
--

LOCK TABLES `sections_config` WRITE;
/*!40000 ALTER TABLE `sections_config` DISABLE KEYS */;
INSERT INTO `sections_config` VALUES (1,'hero','+�+�+�+�+� +�+�+�+�+�+�+�','Hero Section',1,0,NULL,'2026-05-05 10:53:10','2026-05-05 10:53:10'),(2,'stats','+�+�+�+�+�+�+�+�+�+�','Statistics',1,1,NULL,'2026-05-05 10:53:10','2026-05-05 10:53:10'),(3,'services','+�+�+�+�+�+�+�','Services',1,2,NULL,'2026-05-05 10:53:10','2026-05-05 10:53:10'),(4,'projects','+�+�+�+�+�+�+�+�','Projects',1,3,NULL,'2026-05-05 10:53:10','2026-05-05 10:53:10'),(5,'about','+�+� +�+�+�','About Us',1,4,NULL,'2026-05-05 10:53:11','2026-05-05 10:53:11'),(6,'why_us','+�+�+�+�+� +�+�+�','Why Us',1,5,NULL,'2026-05-05 10:53:11','2026-05-05 10:53:11'),(7,'clients','+�+�+�+�+�+�+�','Clients',1,6,NULL,'2026-05-05 10:53:11','2026-05-05 10:53:11'),(8,'cta','+�+�+�+� +�+�+�+�+�+�+�','Call to Action',1,7,NULL,'2026-05-05 10:53:11','2026-05-05 10:53:11');
/*!40000 ALTER TABLE `sections_config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title_ar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title_en` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description_ar` text COLLATE utf8mb4_unicode_ci,
  `description_en` text COLLATE utf8mb4_unicode_ci,
  `content_ar` longtext COLLATE utf8mb4_unicode_ci,
  `content_en` longtext COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT '0',
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `meta_title_ar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_title_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_desc_ar` text COLLATE utf8mb4_unicode_ci,
  `meta_desc_en` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `services_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'engineering-consulting','Building2','+�+�+�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+�','Engineering Consulting','+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+�+�+� +�+�+�+�+� +�+�+�+�+�+� 15 +�+�+�+�+� +�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+�+�.','We provide specialized and integrated engineering consultancy for various construction and industrial projects, with over 15 years of experience in Saudi Arabia.','<p>+�+�+�+� +�+�+�+�+�+�+� +�+� +�+�+�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+�: +�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+�+�+�+� +�+�+�+�+� +�+�+�+�+�+�+�+�+� +�+�+� +�+�+�+�+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+� +�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+�.</p><p>+�+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+� +�+�+� +�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+�+�.</p>','<p>Our engineering consultancy services include: feasibility studies, technical project reviews, project management, technical specifications, and verification of compliance with Saudi and international standards.</p><p>Our specialized team provides innovative engineering solutions that combine quality, efficiency, and commitment to deadlines.</p>',NULL,1,1,1,'+�+�+�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+� | +�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�','Engineering Consulting | ACEC','+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+� +�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+�+�','Specialized engineering consulting services in Saudi Arabia','2026-05-06 06:38:01','2026-05-06 06:38:01'),(2,'safety-engineering','ShieldAlert','+�+�+�+�+� +�+�+�+�+�+�+�','Safety Engineering','+�+�+�+� +�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+� +�+�+�+� +�+�+� +�+�+�+� +�+�+�+�+�+� +�+�+�+� +�+�+�+�+� +�+�+++�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+�+�+�.','We ensure the highest safety and protection standards for your facilities through comprehensive inspection and accurate assessment of all civil defense and safety requirements.','<p>+�+�+�+�+� +�+�+�+�+� +�+�+�+�+�+�+�: +�+�+�+�+� +�+�+++�+� +�+�+�+�+�+�+� +�+�+�+�+++�+�+�+� +�+�+�+�+� +�+�+�+�+�+++�+� +�++++ +�+�+++�+�+�+� +�+�+�+�+�+�+�+�+� +�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+� +�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+�.</p>','<p>Safety engineering services: design of alarm and fire suppression systems, risk assessment, emergency and evacuation plans, personnel training, and obtaining civil defense accreditations.</p>',NULL,1,2,1,'+�+�+�+�+� +�+�+�+�+�+�+� | +�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�','Safety Engineering | ACEC','+�+�+�+�+� +�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+� +�+� +�+�+�+�+�+�+�+�','Safety engineering and civil defense services in Saudi Arabia','2026-05-06 06:38:01','2026-05-06 06:38:01'),(3,'engineering-supervision','Eye','+�+�+�+�+�+�+� +�+�+�+�+�+�+�','Engineering Supervision','+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+� +�+�+� +�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+�.','We undertake full supervision of your project execution to ensure quality and compliance with specified specifications and schedules.','<p>+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+�: +�+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+�+�+� +�+�+�+�+�+� +�+� +�+�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+�+�+�+�+�+� +�+�+�+�+� +�+�+�+�+�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+�.</p>','<p>Engineering supervision services: field execution follow-up, quality verification, invoice review, contractor coordination, and preparation of periodic progress reports.</p>',NULL,1,3,1,'+�+�+�+�+�+�+� +�+�+�+�+�+�+� | +�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�','Engineering Supervision | ACEC','+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+� +�+�+� +�+�+�+�+�+�+�+� +�+� +�+�+�+�+�+�+�+�','Engineering supervision services for projects in Saudi Arabia','2026-05-06 06:38:01','2026-05-06 06:38:01'),(4,'interior-design','Paintbrush','+�+�+�+�+�+�+� +�+�+�+�+�+�+�','Interior Design','+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+� +�+�+�+� +�+�+� +�+�+�+�+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+++�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+� +�+�+�+�+�+�+�+�+�+�.','We create elegant interior spaces that combine modern aesthetics with practical functionality, specially designed to reflect your identity and meet your needs.','<p>+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+�: +�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+�+� +�+�+�+++�+�+� +�+�+�+�+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+�.</p>','<p>Interior design services: offices and commercial complexes, restaurants and cafes, healthcare facilities, hotels, and industrial facilities.</p>',NULL,0,4,1,'+�+�+�+�+�+�+� +�+�+�+�+�+�+� | +�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�','Interior Design | ACEC','+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+�+�+� +�+� +�+�+�+�+�+�+�+�','Professional interior design services in Saudi Arabia','2026-05-06 06:38:01','2026-05-06 06:38:01'),(5,'factory-design','Factory','+�+�+�+�+� +�+�+�+�+�+�+�','Factory Design','+�+�+�+� +�+�+�+�+� +�+�+�+�+� +�+�+�+� +�+�+�+� +�+�+�+�+� +�+�+�+�+�+�+� +�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+�+�+�+�.','We design modern factories that achieve maximum operational efficiency while complying with industrial safety standards and future expansion potential.','<p>+�+�+�+�+� +�+�+�+�+� +�+�+�+�+�+�+�: +�+�+�+�+++++�+� +�+�+�+�+++�+�+�+� +�+�+�+�+�+�+�+� +�+�+++�+� +�+�+�+�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+�+�+�+� +�+�+++�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+�+� +�+�+�+++�+�+�+� +�+�+�+�+�+�+� +�+� +�+�+�+�+�+� +�+�+�+�+�+�+�.</p>','<p>Factory design services: equipment layout plans, handling systems, production flow, industrial ventilation and lighting systems, and licensing requirements from relevant authorities.</p>',NULL,0,5,1,'+�+�+�+�+� +�+�+�+�+�+�+� | +�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�','Factory Design | ACEC','+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+� +�+�+�+�+�+�+�+�','Factory and industrial facilities design in Saudi Arabia','2026-05-06 06:38:01','2026-05-06 06:38:01'),(6,'modon-compliance','CheckCircle','+�+�+�+�+�+� +�+�+�','MODON Compliance','+�+�+�+�+�+�+� +�+� +�+�+�+�+�+�+� +�+�+�+� +�+�+++�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+++� +�+�+�+�+�+�+� (+�+�+�) +�+�+�+�+�+� +�+�+�+�+�+� +�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+�.','We help you meet all requirements of the Saudi Authority for Industrial Cities and Technology Zones (MODON) and expedite obtaining the necessary licenses.','<p>+�+�+�+�+� +�+�+�+�+�+�+�+�: +�+�+�+�+�+� +�+�+�+�+++++�+� +�+�+� +�+�+�+�+�+++�+� +�+�+�+� +�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+++�+�+�+�+� +�+�+�+�+�+�+� +�+� +�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+++++�+�+� +�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+�+�+++�+�.</p>','<p>Compliance services: review of plans according to MODON requirements, preparation of required documents, coordination with the authority, follow-up on plan approval, and ensuring full compliance with requirements.</p>',NULL,0,6,1,'+�+�+�+�+�+� +�+�+� | +�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�','MODON Compliance | ACEC','+�+�+�+�+� +�+�+�+�+�+� +�+�+� +�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+� +�+�+�+�+�+�+�+�','MODON and industrial cities compliance services in Saudi Arabia','2026-05-06 06:38:01','2026-05-06 06:38:01');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('aZ90jKXhjrsPJUcUq6mJdslFMAtGuq6X9CGqjvKn',1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36','eyJfdG9rZW4iOiJMSTlOTTNVelRuWVZ6VlhVT1loMk5NdExtVmpNeE5rS29VRFVlQkdVIiwidXJsIjpbXSwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cLzEyNy4wLjAuMTo4MDAwXC9hZG1pblwvdGVhbS1tZW1iZXJzIiwicm91dGUiOiJmaWxhbWVudC5hZG1pbi5yZXNvdXJjZXMudGVhbS1tZW1iZXJzLmluZGV4In0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfSwibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiOjEsInBhc3N3b3JkX2hhc2hfd2ViIjoiZDFmZjAxYjJkOGUyNzgwNzIxZWEzODY3YTBlMjVhNTU4NGQxOThjYmZmYThjNGZiZGMxZWUwNzA3MzVhOTY5MSIsInRhYmxlcyI6eyJkODI0ZTA2NzlmN2FmYWM4M2FlNWUzNjYxZGZhN2I0NV9jb2x1bW5zIjpbeyJ0eXBlIjoiY29sdW1uIiwibmFtZSI6Im5hbWUiLCJsYWJlbCI6Ik5hbWUiLCJpc0hpZGRlbiI6ZmFsc2UsImlzVG9nZ2xlZCI6dHJ1ZSwiaXNUb2dnbGVhYmxlIjpmYWxzZSwiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0IjpudWxsfSx7InR5cGUiOiJjb2x1bW4iLCJuYW1lIjoiZW1haWwiLCJsYWJlbCI6IkVtYWlsIiwiaXNIaWRkZW4iOmZhbHNlLCJpc1RvZ2dsZWQiOnRydWUsImlzVG9nZ2xlYWJsZSI6ZmFsc2UsImlzVG9nZ2xlZEhpZGRlbkJ5RGVmYXVsdCI6bnVsbH0seyJ0eXBlIjoiY29sdW1uIiwibmFtZSI6InN1YmplY3QiLCJsYWJlbCI6IlN1YmplY3QiLCJpc0hpZGRlbiI6ZmFsc2UsImlzVG9nZ2xlZCI6dHJ1ZSwiaXNUb2dnbGVhYmxlIjpmYWxzZSwiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0IjpudWxsfSx7InR5cGUiOiJjb2x1bW4iLCJuYW1lIjoic2VydmljZV90eXBlIiwibGFiZWwiOiJTZXJ2aWNlIiwiaXNIaWRkZW4iOmZhbHNlLCJpc1RvZ2dsZWQiOnRydWUsImlzVG9nZ2xlYWJsZSI6ZmFsc2UsImlzVG9nZ2xlZEhpZGRlbkJ5RGVmYXVsdCI6bnVsbH0seyJ0eXBlIjoiY29sdW1uIiwibmFtZSI6ImlzX3JlYWQiLCJsYWJlbCI6IlJlYWQiLCJpc0hpZGRlbiI6ZmFsc2UsImlzVG9nZ2xlZCI6dHJ1ZSwiaXNUb2dnbGVhYmxlIjpmYWxzZSwiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0IjpudWxsfSx7InR5cGUiOiJjb2x1bW4iLCJuYW1lIjoiY3JlYXRlZF9hdCIsImxhYmVsIjoiUmVjZWl2ZWQiLCJpc0hpZGRlbiI6ZmFsc2UsImlzVG9nZ2xlZCI6dHJ1ZSwiaXNUb2dnbGVhYmxlIjpmYWxzZSwiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0IjpudWxsfV0sImMzODY4M2UwODYyNzhlZWEwMzljMWNjNDk2MjdkZWM4X2NvbHVtbnMiOlt7InR5cGUiOiJjb2x1bW4iLCJuYW1lIjoibmFtZV9hciIsImxhYmVsIjoiTmFtZSBhciIsImlzSGlkZGVuIjpmYWxzZSwiaXNUb2dnbGVkIjp0cnVlLCJpc1RvZ2dsZWFibGUiOmZhbHNlLCJpc1RvZ2dsZWRIaWRkZW5CeURlZmF1bHQiOm51bGx9LHsidHlwZSI6ImNvbHVtbiIsIm5hbWUiOiJuYW1lX2VuIiwibGFiZWwiOiJOYW1lIGVuIiwiaXNIaWRkZW4iOmZhbHNlLCJpc1RvZ2dsZWQiOnRydWUsImlzVG9nZ2xlYWJsZSI6ZmFsc2UsImlzVG9nZ2xlZEhpZGRlbkJ5RGVmYXVsdCI6bnVsbH0seyJ0eXBlIjoiY29sdW1uIiwibmFtZSI6InBvc2l0aW9uX2FyIiwibGFiZWwiOiJQb3NpdGlvbiBhciIsImlzSGlkZGVuIjpmYWxzZSwiaXNUb2dnbGVkIjp0cnVlLCJpc1RvZ2dsZWFibGUiOmZhbHNlLCJpc1RvZ2dsZWRIaWRkZW5CeURlZmF1bHQiOm51bGx9LHsidHlwZSI6ImNvbHVtbiIsIm5hbWUiOiJwb3NpdGlvbl9lbiIsImxhYmVsIjoiUG9zaXRpb24gZW4iLCJpc0hpZGRlbiI6ZmFsc2UsImlzVG9nZ2xlZCI6dHJ1ZSwiaXNUb2dnbGVhYmxlIjpmYWxzZSwiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0IjpudWxsfSx7InR5cGUiOiJjb2x1bW4iLCJuYW1lIjoiaW1hZ2UiLCJsYWJlbCI6IkltYWdlIiwiaXNIaWRkZW4iOmZhbHNlLCJpc1RvZ2dsZWQiOnRydWUsImlzVG9nZ2xlYWJsZSI6ZmFsc2UsImlzVG9nZ2xlZEhpZGRlbkJ5RGVmYXVsdCI6bnVsbH0seyJ0eXBlIjoiY29sdW1uIiwibmFtZSI6ImVtYWlsIiwibGFiZWwiOiJFbWFpbCBhZGRyZXNzIiwiaXNIaWRkZW4iOmZhbHNlLCJpc1RvZ2dsZWQiOnRydWUsImlzVG9nZ2xlYWJsZSI6ZmFsc2UsImlzVG9nZ2xlZEhpZGRlbkJ5RGVmYXVsdCI6bnVsbH0seyJ0eXBlIjoiY29sdW1uIiwibmFtZSI6ImxpbmtlZGluIiwibGFiZWwiOiJMaW5rZWRpbiIsImlzSGlkZGVuIjpmYWxzZSwiaXNUb2dnbGVkIjp0cnVlLCJpc1RvZ2dsZWFibGUiOmZhbHNlLCJpc1RvZ2dsZWRIaWRkZW5CeURlZmF1bHQiOm51bGx9LHsidHlwZSI6ImNvbHVtbiIsIm5hbWUiOiJvcmRlciIsImxhYmVsIjoiT3JkZXIiLCJpc0hpZGRlbiI6ZmFsc2UsImlzVG9nZ2xlZCI6dHJ1ZSwiaXNUb2dnbGVhYmxlIjpmYWxzZSwiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0IjpudWxsfSx7InR5cGUiOiJjb2x1bW4iLCJuYW1lIjoiaXNfYWN0aXZlIiwibGFiZWwiOiJJcyBhY3RpdmUiLCJpc0hpZGRlbiI6ZmFsc2UsImlzVG9nZ2xlZCI6dHJ1ZSwiaXNUb2dnbGVhYmxlIjpmYWxzZSwiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0IjpudWxsfSx7InR5cGUiOiJjb2x1bW4iLCJuYW1lIjoiY3JlYXRlZF9hdCIsImxhYmVsIjoiQ3JlYXRlZCBhdCIsImlzSGlkZGVuIjpmYWxzZSwiaXNUb2dnbGVkIjpmYWxzZSwiaXNUb2dnbGVhYmxlIjp0cnVlLCJpc1RvZ2dsZWRIaWRkZW5CeURlZmF1bHQiOnRydWV9LHsidHlwZSI6ImNvbHVtbiIsIm5hbWUiOiJ1cGRhdGVkX2F0IiwibGFiZWwiOiJVcGRhdGVkIGF0IiwiaXNIaWRkZW4iOmZhbHNlLCJpc1RvZ2dsZWQiOmZhbHNlLCJpc1RvZ2dsZWFibGUiOnRydWUsImlzVG9nZ2xlZEhpZGRlbkJ5RGVmYXVsdCI6dHJ1ZX1dfX0=',1778317190),('gZ768dqdwKQuRlVqMl05ruhu4z5nSqL7C7CPsYfN',1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36','eyJfdG9rZW4iOiIxSFdiNVc4Uk14UmUxbUdIam5OY2J6QXRhVnY3Q2p1YTU3TUpzNDY4IiwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119LCJfcHJldmlvdXMiOnsidXJsIjoiaHR0cDpcL1wvbG9jYWxob3N0OjgwMDBcL2FkbWluXC90aGVtZXMiLCJyb3V0ZSI6ImZpbGFtZW50LmFkbWluLnJlc291cmNlcy50aGVtZXMuaW5kZXgifSwibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiOjEsInBhc3N3b3JkX2hhc2hfd2ViIjoiYWUzOGM1Y2NlZGUwZWMxMTY0MWVkMDRlYmIzZDJhN2U5NzBiOGEwYWY4NWNkMWE5ODExY2ViNTk3NGVjNGRmMyIsInRhYmxlcyI6eyJkODI0ZTA2NzlmN2FmYWM4M2FlNWUzNjYxZGZhN2I0NV9jb2x1bW5zIjpbeyJ0eXBlIjoiY29sdW1uIiwibmFtZSI6Im5hbWUiLCJsYWJlbCI6Ik5hbWUiLCJpc0hpZGRlbiI6ZmFsc2UsImlzVG9nZ2xlZCI6dHJ1ZSwiaXNUb2dnbGVhYmxlIjpmYWxzZSwiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0IjpudWxsfSx7InR5cGUiOiJjb2x1bW4iLCJuYW1lIjoiZW1haWwiLCJsYWJlbCI6IkVtYWlsIiwiaXNIaWRkZW4iOmZhbHNlLCJpc1RvZ2dsZWQiOnRydWUsImlzVG9nZ2xlYWJsZSI6ZmFsc2UsImlzVG9nZ2xlZEhpZGRlbkJ5RGVmYXVsdCI6bnVsbH0seyJ0eXBlIjoiY29sdW1uIiwibmFtZSI6InN1YmplY3QiLCJsYWJlbCI6IlN1YmplY3QiLCJpc0hpZGRlbiI6ZmFsc2UsImlzVG9nZ2xlZCI6dHJ1ZSwiaXNUb2dnbGVhYmxlIjpmYWxzZSwiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0IjpudWxsfSx7InR5cGUiOiJjb2x1bW4iLCJuYW1lIjoic2VydmljZV90eXBlIiwibGFiZWwiOiJTZXJ2aWNlIiwiaXNIaWRkZW4iOmZhbHNlLCJpc1RvZ2dsZWQiOnRydWUsImlzVG9nZ2xlYWJsZSI6ZmFsc2UsImlzVG9nZ2xlZEhpZGRlbkJ5RGVmYXVsdCI6bnVsbH0seyJ0eXBlIjoiY29sdW1uIiwibmFtZSI6ImlzX3JlYWQiLCJsYWJlbCI6IlJlYWQiLCJpc0hpZGRlbiI6ZmFsc2UsImlzVG9nZ2xlZCI6dHJ1ZSwiaXNUb2dnbGVhYmxlIjpmYWxzZSwiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0IjpudWxsfSx7InR5cGUiOiJjb2x1bW4iLCJuYW1lIjoiY3JlYXRlZF9hdCIsImxhYmVsIjoiUmVjZWl2ZWQiLCJpc0hpZGRlbiI6ZmFsc2UsImlzVG9nZ2xlZCI6dHJ1ZSwiaXNUb2dnbGVhYmxlIjpmYWxzZSwiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0IjpudWxsfV0sIjNhZGRkNWIyMjg4ZTQ0NWIyZTNlZWVhMTI1ZGQ3MDQzX2NvbHVtbnMiOlt7InR5cGUiOiJjb2x1bW4iLCJuYW1lIjoibmFtZSIsImxhYmVsIjoiTmFtZSIsImlzSGlkZGVuIjpmYWxzZSwiaXNUb2dnbGVkIjp0cnVlLCJpc1RvZ2dsZWFibGUiOmZhbHNlLCJpc1RvZ2dsZWRIaWRkZW5CeURlZmF1bHQiOm51bGx9LHsidHlwZSI6ImNvbHVtbiIsIm5hbWUiOiJuYW1lX2FyIiwibGFiZWwiOiJOYW1lIGFyIiwiaXNIaWRkZW4iOmZhbHNlLCJpc1RvZ2dsZWQiOnRydWUsImlzVG9nZ2xlYWJsZSI6ZmFsc2UsImlzVG9nZ2xlZEhpZGRlbkJ5RGVmYXVsdCI6bnVsbH0seyJ0eXBlIjoiY29sdW1uIiwibmFtZSI6InNsdWciLCJsYWJlbCI6IlNsdWciLCJpc0hpZGRlbiI6ZmFsc2UsImlzVG9nZ2xlZCI6dHJ1ZSwiaXNUb2dnbGVhYmxlIjpmYWxzZSwiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0IjpudWxsfSx7InR5cGUiOiJjb2x1bW4iLCJuYW1lIjoiaXNfYWN0aXZlIiwibGFiZWwiOiJJcyBhY3RpdmUiLCJpc0hpZGRlbiI6ZmFsc2UsImlzVG9nZ2xlZCI6dHJ1ZSwiaXNUb2dnbGVhYmxlIjpmYWxzZSwiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0IjpudWxsfSx7InR5cGUiOiJjb2x1bW4iLCJuYW1lIjoiY3JlYXRlZF9hdCIsImxhYmVsIjoiQ3JlYXRlZCBhdCIsImlzSGlkZGVuIjpmYWxzZSwiaXNUb2dnbGVkIjpmYWxzZSwiaXNUb2dnbGVhYmxlIjp0cnVlLCJpc1RvZ2dsZWRIaWRkZW5CeURlZmF1bHQiOnRydWV9LHsidHlwZSI6ImNvbHVtbiIsIm5hbWUiOiJ1cGRhdGVkX2F0IiwibGFiZWwiOiJVcGRhdGVkIGF0IiwiaXNIaWRkZW4iOmZhbHNlLCJpc1RvZ2dsZWQiOmZhbHNlLCJpc1RvZ2dsZWFibGUiOnRydWUsImlzVG9nZ2xlZEhpZGRlbkJ5RGVmYXVsdCI6dHJ1ZX1dLCJmNTYzYTE4NjI1YWZlNzE5MzI0OWQ4ZTBlNmEzM2I3OV9jb2x1bW5zIjpbeyJ0eXBlIjoiY29sdW1uIiwibmFtZSI6Im5hbWUiLCJsYWJlbCI6Ik5hbWUiLCJpc0hpZGRlbiI6ZmFsc2UsImlzVG9nZ2xlZCI6dHJ1ZSwiaXNUb2dnbGVhYmxlIjpmYWxzZSwiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0IjpudWxsfSx7InR5cGUiOiJjb2x1bW4iLCJuYW1lIjoiZW1haWwiLCJsYWJlbCI6IkVtYWlsIiwiaXNIaWRkZW4iOmZhbHNlLCJpc1RvZ2dsZWQiOnRydWUsImlzVG9nZ2xlYWJsZSI6ZmFsc2UsImlzVG9nZ2xlZEhpZGRlbkJ5RGVmYXVsdCI6bnVsbH0seyJ0eXBlIjoiY29sdW1uIiwibmFtZSI6InN1YmplY3QiLCJsYWJlbCI6IlN1YmplY3QiLCJpc0hpZGRlbiI6ZmFsc2UsImlzVG9nZ2xlZCI6dHJ1ZSwiaXNUb2dnbGVhYmxlIjpmYWxzZSwiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0IjpudWxsfSx7InR5cGUiOiJjb2x1bW4iLCJuYW1lIjoic2VydmljZV90eXBlIiwibGFiZWwiOiJTZXJ2aWNlIHR5cGUiLCJpc0hpZGRlbiI6ZmFsc2UsImlzVG9nZ2xlZCI6dHJ1ZSwiaXNUb2dnbGVhYmxlIjpmYWxzZSwiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0IjpudWxsfSx7InR5cGUiOiJjb2x1bW4iLCJuYW1lIjoibGFuZyIsImxhYmVsIjoiTGFuZyIsImlzSGlkZGVuIjpmYWxzZSwiaXNUb2dnbGVkIjp0cnVlLCJpc1RvZ2dsZWFibGUiOmZhbHNlLCJpc1RvZ2dsZWRIaWRkZW5CeURlZmF1bHQiOm51bGx9LHsidHlwZSI6ImNvbHVtbiIsIm5hbWUiOiJpc19yZWFkIiwibGFiZWwiOiJSZWFkIiwiaXNIaWRkZW4iOmZhbHNlLCJpc1RvZ2dsZWQiOnRydWUsImlzVG9nZ2xlYWJsZSI6ZmFsc2UsImlzVG9nZ2xlZEhpZGRlbkJ5RGVmYXVsdCI6bnVsbH0seyJ0eXBlIjoiY29sdW1uIiwibmFtZSI6ImlzX3JlcGxpZWQiLCJsYWJlbCI6IlJlcGxpZWQiLCJpc0hpZGRlbiI6ZmFsc2UsImlzVG9nZ2xlZCI6dHJ1ZSwiaXNUb2dnbGVhYmxlIjpmYWxzZSwiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0IjpudWxsfSx7InR5cGUiOiJjb2x1bW4iLCJuYW1lIjoiY3JlYXRlZF9hdCIsImxhYmVsIjoiQ3JlYXRlZCBhdCIsImlzSGlkZGVuIjpmYWxzZSwiaXNUb2dnbGVkIjp0cnVlLCJpc1RvZ2dsZWFibGUiOmZhbHNlLCJpc1RvZ2dsZWRIaWRkZW5CeURlZmF1bHQiOm51bGx9XSwiMjBhOTM1MjA5ZmM3OGJhNzY2ZmQwZDRiYTAyZDkzZGNfY29sdW1ucyI6W3sidHlwZSI6ImNvbHVtbiIsIm5hbWUiOiJ0aXRsZV9hciIsImxhYmVsIjoiVGl0bGUgYXIiLCJpc0hpZGRlbiI6ZmFsc2UsImlzVG9nZ2xlZCI6dHJ1ZSwiaXNUb2dnbGVhYmxlIjpmYWxzZSwiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0IjpudWxsfSx7InR5cGUiOiJjb2x1bW4iLCJuYW1lIjoidGl0bGVfZW4iLCJsYWJlbCI6IlRpdGxlIGVuIiwiaXNIaWRkZW4iOmZhbHNlLCJpc1RvZ2dsZWQiOnRydWUsImlzVG9nZ2xlYWJsZSI6ZmFsc2UsImlzVG9nZ2xlZEhpZGRlbkJ5RGVmYXVsdCI6bnVsbH0seyJ0eXBlIjoiY29sdW1uIiwibmFtZSI6ImxvY2F0aW9uX2FyIiwibGFiZWwiOiJMb2NhdGlvbiBhciIsImlzSGlkZGVuIjpmYWxzZSwiaXNUb2dnbGVkIjp0cnVlLCJpc1RvZ2dsZWFibGUiOmZhbHNlLCJpc1RvZ2dsZWRIaWRkZW5CeURlZmF1bHQiOm51bGx9LHsidHlwZSI6ImNvbHVtbiIsIm5hbWUiOiJsb2NhdGlvbl9lbiIsImxhYmVsIjoiTG9jYXRpb24gZW4iLCJpc0hpZGRlbiI6ZmFsc2UsImlzVG9nZ2xlZCI6dHJ1ZSwiaXNUb2dnbGVhYmxlIjpmYWxzZSwiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0IjpudWxsfSx7InR5cGUiOiJjb2x1bW4iLCJuYW1lIjoidHlwZSIsImxhYmVsIjoiVHlwZSIsImlzSGlkZGVuIjpmYWxzZSwiaXNUb2dnbGVkIjp0cnVlLCJpc1RvZ2dsZWFibGUiOmZhbHNlLCJpc1RvZ2dsZWRIaWRkZW5CeURlZmF1bHQiOm51bGx9LHsidHlwZSI6ImNvbHVtbiIsIm5hbWUiOiJzYWxhcnlfcmFuZ2UiLCJsYWJlbCI6IlNhbGFyeSByYW5nZSIsImlzSGlkZGVuIjpmYWxzZSwiaXNUb2dnbGVkIjp0cnVlLCJpc1RvZ2dsZWFibGUiOmZhbHNlLCJpc1RvZ2dsZWRIaWRkZW5CeURlZmF1bHQiOm51bGx9LHsidHlwZSI6ImNvbHVtbiIsIm5hbWUiOiJpc19hY3RpdmUiLCJsYWJlbCI6IklzIGFjdGl2ZSIsImlzSGlkZGVuIjpmYWxzZSwiaXNUb2dnbGVkIjp0cnVlLCJpc1RvZ2dsZWFibGUiOmZhbHNlLCJpc1RvZ2dsZWRIaWRkZW5CeURlZmF1bHQiOm51bGx9LHsidHlwZSI6ImNvbHVtbiIsIm5hbWUiOiJleHBpcmVzX2F0IiwibGFiZWwiOiJFeHBpcmVzIGF0IiwiaXNIaWRkZW4iOmZhbHNlLCJpc1RvZ2dsZWQiOnRydWUsImlzVG9nZ2xlYWJsZSI6ZmFsc2UsImlzVG9nZ2xlZEhpZGRlbkJ5RGVmYXVsdCI6bnVsbH0seyJ0eXBlIjoiY29sdW1uIiwibmFtZSI6ImNyZWF0ZWRfYXQiLCJsYWJlbCI6IkNyZWF0ZWQgYXQiLCJpc0hpZGRlbiI6ZmFsc2UsImlzVG9nZ2xlZCI6ZmFsc2UsImlzVG9nZ2xlYWJsZSI6dHJ1ZSwiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0Ijp0cnVlfSx7InR5cGUiOiJjb2x1bW4iLCJuYW1lIjoidXBkYXRlZF9hdCIsImxhYmVsIjoiVXBkYXRlZCBhdCIsImlzSGlkZGVuIjpmYWxzZSwiaXNUb2dnbGVkIjpmYWxzZSwiaXNUb2dnbGVhYmxlIjp0cnVlLCJpc1RvZ2dsZWRIaWRkZW5CeURlZmF1bHQiOnRydWV9XX19',1778312599),('UYd6RFooKD7ge5vUGI5k62dQrXBncbR7BRHk5faM',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.22621.4249','eyJfdG9rZW4iOiJTa2VycUdRcFZnNFhCdzRqYU9zdGwybUVHUkJrdmxqeDhMYlZyc0JKIiwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==',1778305740),('wNTRNFxFwX6rxLl9FdQX0DzMODcFPiK0qCVigc6F',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.22621.4249','eyJfdG9rZW4iOiI2eDJPY1Z3ck0zYUFpaE5kazk0MThoV0NSUmc4MnQ3eWs2dnJSVzJhIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cLzEyNy4wLjAuMTo4MDAwIiwicm91dGUiOm51bGx9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19',1778306879);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `settings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci,
  `group` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'text',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `settings_key_unique` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES (1,'site_name_ar','+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+�+�','general','text','2026-05-06 06:38:01','2026-05-06 06:38:01'),(2,'site_name_en','Arab Charter Engineering Consultants G�� ACEC','general','text','2026-05-06 06:38:01','2026-05-06 06:38:01'),(3,'site_tagline_ar','+�+�+�+�+�+�+� +�+� +�+�+�+�+�+� +�+�+�+�+�+�+�','general','text','2026-05-06 06:38:01','2026-05-06 06:38:01'),(4,'site_tagline_en','Your Partners in Engineering Excellence','general','text','2026-05-06 06:38:01','2026-05-06 06:38:01'),(5,'default_lang','ar','general','text','2026-05-06 06:38:01','2026-05-06 06:38:01'),(6,'logo','','general','image','2026-05-06 06:38:01','2026-05-06 06:38:01'),(7,'phone','+966 500 037 049','contact','text','2026-05-06 06:38:02','2026-05-06 06:38:02'),(8,'whatsapp','+966500037049','contact','text','2026-05-06 06:38:02','2026-05-06 06:38:02'),(9,'email','info@ac-ec.com.sa','contact','text','2026-05-06 06:38:02','2026-05-06 06:38:02'),(10,'address_ar','+�+�+�+� +�+�+� +�+� +�+�+�+�+�+�+�+�+�+� +�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+�+�','contact','text','2026-05-06 06:38:02','2026-05-06 06:38:02'),(11,'address_en','Omar Bin Abdulaziz Street, Al Zahraa District, Riyadh, Saudi Arabia','contact','text','2026-05-06 06:38:02','2026-05-06 06:38:02'),(12,'working_hours_ar','+�+�+�+�+� - +�+�+�+�+�+�+� 9:00 +�+�+�+�+�+� - 6:00 +�+�+�+�+�','contact','text','2026-05-06 06:38:02','2026-05-06 06:38:02'),(13,'working_hours_en','Sunday to Thursday, 9:00 AM - 6:00 PM','contact','text','2026-05-06 06:38:02','2026-05-06 06:38:02'),(14,'google_maps_url','','contact','text','2026-05-06 06:38:02','2026-05-06 06:38:02'),(15,'linkedin','','social','text','2026-05-06 06:38:02','2026-05-06 06:38:02'),(16,'twitter','','social','text','2026-05-06 06:38:02','2026-05-06 06:38:02'),(17,'instagram','','social','text','2026-05-06 06:38:02','2026-05-06 06:38:02'),(18,'meta_title_ar','+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+� | +�+�+�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�','seo','text','2026-05-06 06:38:02','2026-05-06 06:38:02'),(19,'meta_title_en','ACEC | Engineering Consultants & Safety Engineering','seo','text','2026-05-06 06:38:02','2026-05-06 06:38:02'),(20,'meta_desc_ar','+�+�+�+� +�+�+�+�+� +�+� +�+�+�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+� +�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+�+�','seo','text','2026-05-06 06:38:02','2026-05-06 06:38:02'),(21,'meta_desc_en','Specialized in engineering consultancy, safety engineering and supervision in Saudi Arabia','seo','text','2026-05-06 06:38:02','2026-05-06 06:38:02'),(22,'google_analytics_id','','seo','text','2026-05-06 06:38:02','2026-05-06 06:38:02');
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team_members`
--

DROP TABLE IF EXISTS `team_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team_members` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name_ar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `position_ar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `position_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bio_ar` text COLLATE utf8mb4_unicode_ci,
  `bio_en` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `linkedin` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_members`
--

LOCK TABLES `team_members` WRITE;
/*!40000 ALTER TABLE `team_members` DISABLE KEYS */;
INSERT INTO `team_members` VALUES (1,'+�. +�+�+�+� +�+�+�+�+�+�+�','Eng. Ahmed Al-Khaldi','+�+�+�+�+�+� +�+�+�+�+�','General Manager','+�+�+�+� +�+�+�+� +�+� 20 +�+�+�+�+� +�+� +�+�+�+� +�+�+�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+� +�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+�+�.','Over 20 years of experience in engineering consulting and major project management in Saudi Arabia.',NULL,NULL,NULL,1,1,'2026-05-06 06:38:02','2026-05-06 06:38:02'),(2,'+�. +�+�+�+� +�+�+�+�+�+�+�','Eng. Mohammed Al-Otaibi','+�+�+�+� +�+�+� +�+�+�+�+�+�+�','Safety Department Manager','+�+�+�+�+� +�+� +�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+++�+� +�+�+�+�+�+�+� +�+� +�+�+�+�+�+� +�+� +�+�+�+� +�+�+�+�+� +�+� +�+�+�+�+�+++�+� +�+�+�+�+�+� +�+�+�+�+�+�.','Specialized in safety engineering and fire protection systems with extensive experience in civil defense requirements.',NULL,NULL,NULL,2,1,'2026-05-06 06:38:02','2026-05-06 06:38:02'),(3,'+�. +�+�+�+� +�+�+�+�+�+�','Eng. Sarah Al-Shamari','+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+�','Interior Design Manager','+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+� +�+�+� +�+�+�+�+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+++�+�+�+� +�+�+�+�+�+�+� +�+� +�+�+�+�+� +�+�+�+�+�+�+�+�.','Specialized interior designer combining modern aesthetics with practical functionality across various projects.',NULL,NULL,NULL,3,1,'2026-05-06 06:38:02','2026-05-06 06:38:02'),(4,'+�. +�+�+�+� +�+�+�+�+�+�+�','Eng. Khaled Al-Dosari','+�+�+�+� +�+�+� +�+�+�+�+�+�+�','Head of Supervision','+�+�+�+�+� +�+�+�+� +�+�+�+�+� +�+�+�+�+� +�+�+�+� +�+� 15 +�+�+�+�+� +�+� +�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+�.','Certified supervising engineer with over 15 years of experience supervising government and private projects.',NULL,NULL,NULL,4,1,'2026-05-06 06:38:02','2026-05-06 06:38:02');
/*!40000 ALTER TABLE `team_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `themes`
--

DROP TABLE IF EXISTS `themes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `themes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_ar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '0',
  `colors` json DEFAULT NULL,
  `typography` json DEFAULT NULL,
  `layout` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `themes_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `themes`
--

LOCK TABLES `themes` WRITE;
/*!40000 ALTER TABLE `themes` DISABLE KEYS */;
INSERT INTO `themes` VALUES (1,'Classic Blue','الأزرق الكلاسيكي','classic-blue',0,'{\"bg_primary\": \"#0F1F3D\", \"bg_secondary\": \"#1A2F55\", \"bg_card\": \"#1A2F55\", \"bg_section_alt\": \"#142744\", \"text_primary\": \"#EEF2FF\", \"text_secondary\": \"#94A3C4\", \"text_muted\": \"#94A3C4\", \"accent\": \"#3B82F6\", \"accent_hover\": \"#60A5FA\", \"accent_text\": \"#FFFFFF\", \"border\": \"#2E4A7A\", \"navbar_bg\": \"#1A2F55\", \"navbar_text\": \"#EEF2FF\", \"button_bg\": \"#3B82F6\", \"button_text\": \"#FFFFFF\", \"button_hover\": \"#60A5FA\", \"card_bg\": \"#1A2F55\", \"card_border\": \"#2E4A7A\", \"footer_bg\": \"#080D14\", \"footer_text\": \"#94A3C4\"}','{\"font_ar\": \"Tajawal\", \"font_en\": \"Inter\", \"body_size\": \"base\", \"heading_size\": \"2xl\"}','{\"shadow_style\": \"soft\", \"border_radius\": \"md\", \"container_width\": \"7xl\"}','2026-05-06 06:38:01','2026-05-09 02:56:22'),(2,'Dark Professional','الاحترافي الداكن','dark-professional',1,'{\"bg_primary\": \"#0D1B2A\", \"bg_secondary\": \"#162234\", \"bg_card\": \"#162234\", \"bg_section_alt\": \"#111E2C\", \"text_primary\": \"#F0F4F8\", \"text_secondary\": \"#9AABBE\", \"text_muted\": \"#8A9BB0\", \"accent\": \"#C9A84C\", \"accent_hover\": \"#F0CF7A\", \"accent_text\": \"#0D1B2A\", \"border\": \"#3A5068\", \"navbar_bg\": \"#162234\", \"navbar_text\": \"#F0F4F8\", \"button_bg\": \"#C9A84C\", \"button_text\": \"#0D1B2A\", \"button_hover\": \"#F0CF7A\", \"card_bg\": \"#162234\", \"card_border\": \"#3A5068\", \"footer_bg\": \"#080D14\", \"footer_text\": \"#8A9BB0\"}','{\"font_ar\": \"Tajawal\", \"font_en\": \"Inter\", \"body_size\": \"base\", \"heading_size\": \"2xl\"}','{\"shadow_style\": \"sharp\", \"border_radius\": \"lg\", \"container_width\": \"7xl\"}','2026-05-06 06:38:01','2026-05-09 02:56:22'),(3,'Modern Green','الأخضر الحديث','modern-green',0,'{\"bg_primary\": \"#0A1A14\", \"bg_secondary\": \"#122A1F\", \"bg_card\": \"#122A1F\", \"bg_section_alt\": \"#0D2118\", \"text_primary\": \"#ECFDF5\", \"text_secondary\": \"#86B89A\", \"text_muted\": \"#86B89A\", \"accent\": \"#10B981\", \"accent_hover\": \"#34D399\", \"accent_text\": \"#0A1A14\", \"border\": \"#1E4D35\", \"navbar_bg\": \"#122A1F\", \"navbar_text\": \"#ECFDF5\", \"button_bg\": \"#10B981\", \"button_text\": \"#0A1A14\", \"button_hover\": \"#34D399\", \"card_bg\": \"#122A1F\", \"card_border\": \"#1E4D35\", \"footer_bg\": \"#060F0A\", \"footer_text\": \"#86B89A\"}','{\"font_ar\": \"Tajawal\", \"font_en\": \"Inter\", \"body_size\": \"base\", \"heading_size\": \"2xl\"}','{\"shadow_style\": \"soft\", \"border_radius\": \"xl\", \"container_width\": \"6xl\"}','2026-05-06 06:38:01','2026-05-09 02:56:22');
/*!40000 ALTER TABLE `themes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_login_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin User','admin@ac-ec.com.sa',NULL,'$2y$12$SnuyS8ik2aYmSsoq5FH84OolrkT6XDPJyTqa4PiZEahLfVzpn8Js6','admin',NULL,'zHBcHWf0Z9o6DzMFj0te20771hYp7BLFSjhuT13qnI2rUy5pCcTBtx0Sq0Oa',NULL,'2026-05-05 10:53:10','2026-05-09 05:38:40');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `why_us_items`
--

DROP TABLE IF EXISTS `why_us_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `why_us_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `icon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title_ar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title_en` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description_ar` text COLLATE utf8mb4_unicode_ci,
  `description_en` text COLLATE utf8mb4_unicode_ci,
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `why_us_items`
--

LOCK TABLES `why_us_items` WRITE;
/*!40000 ALTER TABLE `why_us_items` DISABLE KEYS */;
INSERT INTO `why_us_items` VALUES (1,'experience','+�+�+�+� +�+�+�+�+�+� 15 +�+�+�+�+�','Over 15 Years of Experience','+�+�+�+� +�+� +�+�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+�+� +�+�+� +�+�+�+� +�+�+�+�+� +�+� +�+�+�+�+� +�+�+�+++�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+�+�.','A team of specialized engineers with extensive experience across various engineering sectors in Saudi Arabia.',1,1,'2026-05-06 06:38:02','2026-05-06 06:38:02'),(2,'compliance','+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+�+�','Certified & Guaranteed Quality','+�+�+�+�+� +�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+++�+�+�+� +�+�+�+�+�+�+�+� +�+� +�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+�.','We adhere to the highest international quality standards and Saudi requirements in all our projects and services.',2,1,'2026-05-06 06:38:02','2026-05-06 06:38:02'),(3,'quality','+�+�+�+� +�+�+�+�+� +�+�+�+�+�+�+�','Integrated Specialized Team','+�+�+�+� +�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+� +�+�+�+�+�+�+� +�+�+�+�+�+�+� +�+� +�+�+�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+� +�+�+�+�+�+�+�+�.','A multidisciplinary team including certified engineers in consulting, safety, design, and supervision.',3,1,'2026-05-06 06:38:02','2026-05-06 06:38:02'),(4,'team','+�+�+�+�+�+� +�+�+� +�+�+�+�+�+�+�+�+�','Full Commitment to Deadlines','+�+�+�+� +�+�+�+�+� +�+�+�+�+�+�+�+� +�+� +�+�+�+�+� +�+�+�+�+�+� +�+�+� +�+�+�+�+�+�+� +�+� +�+�+�+�+�+� +�+�+�+�+�+� +�+�+�+�+�+�.','We guarantee the delivery of your projects on time without compromising quality and accuracy standards.',4,1,'2026-05-06 06:38:02','2026-05-06 06:38:02');
/*!40000 ALTER TABLE `why_us_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'acec_dashboard'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-10 11:03:33
