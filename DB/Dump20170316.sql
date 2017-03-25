-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: inventario_digitex
-- ------------------------------------------------------
-- Server version	5.7.17-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `articulos`
--

DROP TABLE IF EXISTS `articulos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `articulos` (
  `id_articulos` int(11) NOT NULL AUTO_INCREMENT,
  `activo` varchar(45) DEFAULT NULL,
  `serial_art` varchar(45) DEFAULT NULL,
  `plaqueta_art` varchar(45) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `fk_items` int(11) NOT NULL,
  `fk_fabricante` int(11) NOT NULL,
  `modelo_item` varchar(45) NOT NULL,
  `fk_puesto` int(11) NOT NULL,
  `fk_campaña` int(11) NOT NULL,
  `fk_bodega` int(11) NOT NULL,
  `fk_sede` int(11) NOT NULL,
  PRIMARY KEY (`id_articulos`),
  KEY `id_items_idx` (`fk_items`),
  KEY `id_fabricante_idx` (`fk_fabricante`),
  KEY `id_puesto_idx` (`fk_puesto`),
  KEY `id_campaña_idx` (`fk_campaña`),
  KEY `id_bodega_idx` (`fk_bodega`),
  KEY `id_sede_idx` (`fk_sede`),
  CONSTRAINT `fk_bodega_art` FOREIGN KEY (`fk_bodega`) REFERENCES `bodegas` (`id_bodega`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_campaña_art` FOREIGN KEY (`fk_campaña`) REFERENCES `campaign` (`id_campaign`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_fabricante_art` FOREIGN KEY (`fk_fabricante`) REFERENCES `fabricante` (`id_fabricante`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_items_art` FOREIGN KEY (`fk_items`) REFERENCES `items` (`id_item`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_puesto_art` FOREIGN KEY (`fk_puesto`) REFERENCES `puestos` (`id_puesto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sede_art` FOREIGN KEY (`fk_sede`) REFERENCES `sedes` (`id_sede`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articulos`
--

LOCK TABLES `articulos` WRITE;
/*!40000 ALTER TABLE `articulos` DISABLE KEYS */;
/*!40000 ALTER TABLE `articulos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bodegas`
--

DROP TABLE IF EXISTS `bodegas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bodegas` (
  `id_bodega` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_bodega` varchar(45) DEFAULT NULL,
  `fk_sede` int(11) NOT NULL,
  PRIMARY KEY (`id_bodega`),
  KEY `id_sede_idx` (`fk_sede`),
  CONSTRAINT `fk_sede_bod` FOREIGN KEY (`fk_sede`) REFERENCES `sedes` (`id_sede`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bodegas`
--

LOCK TABLES `bodegas` WRITE;
/*!40000 ALTER TABLE `bodegas` DISABLE KEYS */;
INSERT INTO `bodegas` VALUES (1,'BODEGA 1',1),(2,'BODEGA 2',1),(3,'BODEGA 3',1),(4,'BODEGA 4',1),(5,'ADMINISTRATIVA',1),(6,'LABORAL',1),(7,'BODEGA 1 - ENCERRAMIENTO',1),(8,'BODEGA 3 - CLIENTES BCS',1),(9,'BODEGA 4 - ENCERRAMIENTO',1);
/*!40000 ALTER TABLE `bodegas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campaign`
--

DROP TABLE IF EXISTS `campaign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `campaign` (
  `id_campaign` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_campaign` varchar(45) NOT NULL,
  `cliente_campaign` varchar(45) NOT NULL,
  `fk_sede` int(11) NOT NULL,
  `fk_bodega` int(11) NOT NULL,
  PRIMARY KEY (`id_campaign`),
  KEY `fk_sede_idx` (`fk_sede`),
  KEY `fk_bodega_idx` (`fk_bodega`),
  CONSTRAINT `fk_bodega_campaign` FOREIGN KEY (`fk_bodega`) REFERENCES `bodegas` (`id_bodega`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sede_campaign` FOREIGN KEY (`fk_sede`) REFERENCES `sedes` (`id_sede`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaign`
--

LOCK TABLES `campaign` WRITE;
/*!40000 ALTER TABLE `campaign` DISABLE KEYS */;
INSERT INTO `campaign` VALUES (1,'COLMENA SEGUROS','FUNDACION SOCIAL',1,1),(2,'TELEVENTAS ARL','FUNDACION SOCIAL',1,1),(3,'BANCO CAJA SOCIAL','FUNDACION SOCIAL',1,2),(4,'COBRANZAS BCS','FUNDACION SOCIAL',1,3),(5,'RETENCION BCS','FUNDACION SOCIAL',1,9),(6,'MOVISTAR FIJA','MOVISTAR COLOMBIA',1,4),(7,'MOVISTAR MOVIL','MOVISTAR COLOMBIA',1,7),(8,'CHILE FIJA','MOVISTAR CHILE',1,4);
/*!40000 ALTER TABLE `campaign` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estados`
--

DROP TABLE IF EXISTS `estados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estados` (
  `id_estados` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_estado` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_estados`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estados`
--

LOCK TABLES `estados` WRITE;
/*!40000 ALTER TABLE `estados` DISABLE KEYS */;
/*!40000 ALTER TABLE `estados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fabricante`
--

DROP TABLE IF EXISTS `fabricante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fabricante` (
  `id_fabricante` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_fabricante` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_fabricante`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fabricante`
--

LOCK TABLES `fabricante` WRITE;
/*!40000 ALTER TABLE `fabricante` DISABLE KEYS */;
/*!40000 ALTER TABLE `fabricante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `items` (
  `id_item` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_item` varchar(45) DEFAULT NULL,
  `modelo_item` varchar(45) DEFAULT NULL,
  `fk_fabricante` int(11) NOT NULL,
  PRIMARY KEY (`id_item`),
  KEY `id_fabricante_idx` (`fk_fabricante`),
  CONSTRAINT `fk_fabricante_item` FOREIGN KEY (`fk_fabricante`) REFERENCES `fabricante` (`id_fabricante`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movimientos`
--

DROP TABLE IF EXISTS `movimientos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `movimientos` (
  `id_movimiento` int(11) NOT NULL AUTO_INCREMENT,
  `dest_sede` int(11) DEFAULT NULL,
  `dest_bodega` varchar(45) DEFAULT NULL,
  `dest_posicion` varchar(45) DEFAULT NULL,
  `dest_campaña` varchar(45) DEFAULT NULL,
  `ori_sede` varchar(45) DEFAULT NULL,
  `ori_bodega` varchar(45) DEFAULT NULL,
  `ori_posicion` varchar(45) DEFAULT NULL,
  `ori_campaña` varchar(45) DEFAULT NULL,
  `ticket` int(11) DEFAULT NULL,
  `fecha_mov` datetime DEFAULT NULL,
  `fk_usuario` int(11) NOT NULL,
  `fk_puesto` int(11) NOT NULL,
  `fk_campaign` int(11) NOT NULL,
  `fk_bodega` int(11) NOT NULL,
  `fk_sede` int(11) NOT NULL,
  PRIMARY KEY (`id_movimiento`),
  KEY `id_sede_idx` (`fk_sede`),
  KEY `id_bodega_idx` (`fk_bodega`),
  KEY `id_campaña_idx` (`fk_campaign`),
  KEY `id_puesto_idx` (`fk_puesto`),
  KEY `id_usuario_idx` (`fk_usuario`),
  CONSTRAINT `fk_bodega_mov` FOREIGN KEY (`fk_bodega`) REFERENCES `bodegas` (`id_bodega`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_campaign_mov` FOREIGN KEY (`fk_campaign`) REFERENCES `campaign` (`id_campaign`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_puesto_mov` FOREIGN KEY (`fk_puesto`) REFERENCES `puestos` (`id_puesto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sede_mov` FOREIGN KEY (`fk_sede`) REFERENCES `sedes` (`id_sede`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_mov` FOREIGN KEY (`fk_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movimientos`
--

LOCK TABLES `movimientos` WRITE;
/*!40000 ALTER TABLE `movimientos` DISABLE KEYS */;
/*!40000 ALTER TABLE `movimientos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `puestos`
--

DROP TABLE IF EXISTS `puestos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `puestos` (
  `id_puesto` int(11) NOT NULL AUTO_INCREMENT,
  `posicion` varchar(45) DEFAULT NULL,
  `fk_sede` int(11) NOT NULL,
  `fk_bodega` int(11) NOT NULL,
  `fk_campaign` int(11) NOT NULL,
  `fk_estado` int(11) NOT NULL,
  PRIMARY KEY (`id_puesto`),
  KEY `id_sede_idx` (`fk_sede`),
  KEY `id_bodega_idx` (`fk_bodega`),
  KEY `id_campaña_idx` (`fk_campaign`),
  KEY `id_estado_idx` (`fk_estado`),
  CONSTRAINT `fk_bodega_puesto` FOREIGN KEY (`fk_bodega`) REFERENCES `bodegas` (`id_bodega`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_campaign_puesto` FOREIGN KEY (`fk_campaign`) REFERENCES `campaign` (`id_campaign`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_estado_puesto` FOREIGN KEY (`fk_estado`) REFERENCES `estados` (`id_estados`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sede_puesto` FOREIGN KEY (`fk_sede`) REFERENCES `sedes` (`id_sede`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `puestos`
--

LOCK TABLES `puestos` WRITE;
/*!40000 ALTER TABLE `puestos` DISABLE KEYS */;
/*!40000 ALTER TABLE `puestos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sedes`
--

DROP TABLE IF EXISTS `sedes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sedes` (
  `id_sede` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_sede` varchar(45) DEFAULT NULL,
  `ciudad_sede` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_sede`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sedes`
--

LOCK TABLES `sedes` WRITE;
/*!40000 ALTER TABLE `sedes` DISABLE KEYS */;
INSERT INTO `sedes` VALUES (1,'DXCO IBAGUE','IBAGUE'),(2,'DXCO ZONA FRANCA','BOGOTA'),(3,'DXCO OF. ADMINISTRATIVA','BOGOTA'),(4,'DXCO ARMENIA MOCAWA','ARMENIA'),(5,'DXCO MANIZALES LA PATRIA','MANIZALES'),(6,'DXCO MANIZALES VILLAMARIA','MANIZALES'),(7,'DXCO MANIZALES SAN ANTONIO','MANIZALES'),(8,'DXCO MANIZALES LAURELES','MANIZALES'),(9,'DXCO MANIZALES BOLIVAR','MANIZALES');
/*!40000 ALTER TABLE `sedes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(45) DEFAULT NULL,
  `cargo_usuario` varchar(45) DEFAULT NULL,
  `pass_usuario` varchar(45) DEFAULT NULL,
  `fk_sede` int(11) NOT NULL,
  `fk_campaign` int(11) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  KEY `id_sede_idx` (`fk_sede`),
  KEY `id_campaña_idx` (`fk_campaign`),
  CONSTRAINT `id_campaign_user` FOREIGN KEY (`fk_campaign`) REFERENCES `campaign` (`id_campaign`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `id_sede_user` FOREIGN KEY (`fk_sede`) REFERENCES `sedes` (`id_sede`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-03-16 21:56:17
