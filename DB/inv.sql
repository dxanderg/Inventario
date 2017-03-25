-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema Inventario_Digitex
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Inventario_Digitex
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Inventario_Digitex` DEFAULT CHARACTER SET utf8 ;
USE `Inventario_Digitex` ;

-- -----------------------------------------------------
-- Table `Inventario_Digitex`.`sedes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inventario_Digitex`.`sedes` (
  `id_sede` INT NOT NULL AUTO_INCREMENT,
  `nombre_sede` VARCHAR(45) NULL,
  `ciudad_sede` VARCHAR(45) NULL,
  PRIMARY KEY (`id_sede`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Inventario_Digitex`.`bodegas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inventario_Digitex`.`bodegas` (
  `id_bodega` INT NOT NULL AUTO_INCREMENT,
  `nombre_bodega` VARCHAR(45) NULL,
  `fk_sede` INT NOT NULL,
  PRIMARY KEY (`id_bodega`),
  INDEX `id_sede_idx` (`fk_sede` ASC),
  CONSTRAINT `fk_sede_bod`
    FOREIGN KEY (`fk_sede`)
    REFERENCES `Inventario_Digitex`.`sedes` (`id_sede`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Inventario_Digitex`.`campaign`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inventario_Digitex`.`campaign` (
  `id_campaign` INT NOT NULL AUTO_INCREMENT,
  `nombre_campaign` VARCHAR(45) NOT NULL,
  `cliente_campaign` INT NOT NULL,
  `fk_sede` INT NOT NULL,
  `fk_bodega` INT NOT NULL,
  PRIMARY KEY (`id_campaign`),
  INDEX `fk_sede_idx` (`fk_sede` ASC),
  INDEX `fk_bodega_idx` (`fk_bodega` ASC),
  CONSTRAINT `fk_sede_campaign`
    FOREIGN KEY (`fk_sede`)
    REFERENCES `Inventario_Digitex`.`sedes` (`id_sede`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_bodega_campaign`
    FOREIGN KEY (`fk_bodega`)
    REFERENCES `Inventario_Digitex`.`bodegas` (`id_bodega`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Inventario_Digitex`.`estados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inventario_Digitex`.`estados` (
  `id_estados` INT NOT NULL AUTO_INCREMENT,
  `nombre_estado` VARCHAR(45) NULL,
  PRIMARY KEY (`id_estados`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Inventario_Digitex`.`fabricante`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inventario_Digitex`.`fabricante` (
  `id_fabricante` INT NOT NULL AUTO_INCREMENT,
  `nombre_fabricante` VARCHAR(45) NULL,
  PRIMARY KEY (`id_fabricante`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Inventario_Digitex`.`puestos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inventario_Digitex`.`puestos` (
  `id_puesto` INT NOT NULL AUTO_INCREMENT,
  `posicion` VARCHAR(45) NULL,
  `fk_sede` INT NOT NULL,
  `fk_bodega` INT NOT NULL,
  `fk_campaign` INT NOT NULL,
  `fk_estado` INT NOT NULL,
  PRIMARY KEY (`id_puesto`),
  INDEX `id_sede_idx` (`fk_sede` ASC),
  INDEX `id_bodega_idx` (`fk_bodega` ASC),
  INDEX `id_campaña_idx` (`fk_campaign` ASC),
  INDEX `id_estado_idx` (`fk_estado` ASC),
  CONSTRAINT `fk_sede_puesto`
    FOREIGN KEY (`fk_sede`)
    REFERENCES `Inventario_Digitex`.`sedes` (`id_sede`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_bodega_puesto`
    FOREIGN KEY (`fk_bodega`)
    REFERENCES `Inventario_Digitex`.`bodegas` (`id_bodega`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_campaign_puesto`
    FOREIGN KEY (`fk_campaign`)
    REFERENCES `Inventario_Digitex`.`campaign` (`id_campaign`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_estado_puesto`
    FOREIGN KEY (`fk_estado`)
    REFERENCES `Inventario_Digitex`.`estados` (`id_estados`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Inventario_Digitex`.`items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inventario_Digitex`.`items` (
  `id_item` INT NOT NULL AUTO_INCREMENT,
  `nombre_item` VARCHAR(45) NULL,
  `modelo_item` VARCHAR(45) NULL,
  `fk_fabricante` INT NOT NULL,
  PRIMARY KEY (`id_item`),
  INDEX `id_fabricante_idx` (`fk_fabricante` ASC),
  CONSTRAINT `fk_fabricante_item`
    FOREIGN KEY (`fk_fabricante`)
    REFERENCES `Inventario_Digitex`.`fabricante` (`id_fabricante`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Inventario_Digitex`.`articulos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inventario_Digitex`.`articulos` (
  `id_articulos` INT NOT NULL AUTO_INCREMENT,
  `activo` VARCHAR(45) NULL,
  `serial_art` VARCHAR(45) NULL,
  `plaqueta_art` VARCHAR(45) NULL,
  `fecha_creacion` DATETIME NULL,
  `fk_items` INT NOT NULL,
  `fk_fabricante` INT NOT NULL,
  `modelo_item` VARCHAR(45) NOT NULL,
  `fk_puesto` INT NOT NULL,
  `fk_campaña` INT NOT NULL,
  `fk_bodega` INT NOT NULL,
  `fk_sede` INT NOT NULL,
  PRIMARY KEY (`id_articulos`),
  INDEX `id_items_idx` (`fk_items` ASC),
  INDEX `id_fabricante_idx` (`fk_fabricante` ASC),
  INDEX `id_puesto_idx` (`fk_puesto` ASC),
  INDEX `id_campaña_idx` (`fk_campaña` ASC),
  INDEX `id_bodega_idx` (`fk_bodega` ASC),
  INDEX `id_sede_idx` (`fk_sede` ASC),
  CONSTRAINT `fk_items_art`
    FOREIGN KEY (`fk_items`)
    REFERENCES `Inventario_Digitex`.`items` (`id_item`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_fabricante_art`
    FOREIGN KEY (`fk_fabricante`)
    REFERENCES `Inventario_Digitex`.`fabricante` (`id_fabricante`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_puesto_art`
    FOREIGN KEY (`fk_puesto`)
    REFERENCES `Inventario_Digitex`.`puestos` (`id_puesto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_campaña_art`
    FOREIGN KEY (`fk_campaña`)
    REFERENCES `Inventario_Digitex`.`campaign` (`id_campaign`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_bodega_art`
    FOREIGN KEY (`fk_bodega`)
    REFERENCES `Inventario_Digitex`.`bodegas` (`id_bodega`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sede_art`
    FOREIGN KEY (`fk_sede`)
    REFERENCES `Inventario_Digitex`.`sedes` (`id_sede`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Inventario_Digitex`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inventario_Digitex`.`usuarios` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nombre_usuario` VARCHAR(45) NULL,
  `cargo_usuario` VARCHAR(45) NULL,
  `pass_usuario` VARCHAR(45) NULL,
  `fk_sede` INT NOT NULL,
  `fk_campaign` INT NOT NULL,
  PRIMARY KEY (`id_usuario`),
  INDEX `id_sede_idx` (`fk_sede` ASC),
  INDEX `id_campaña_idx` (`fk_campaign` ASC),
  CONSTRAINT `id_sede_user`
    FOREIGN KEY (`fk_sede`)
    REFERENCES `Inventario_Digitex`.`sedes` (`id_sede`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_campaign_user`
    FOREIGN KEY (`fk_campaign`)
    REFERENCES `Inventario_Digitex`.`campaign` (`id_campaign`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Inventario_Digitex`.`movimientos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inventario_Digitex`.`movimientos` (
  `id_movimiento` INT NOT NULL AUTO_INCREMENT,
  `dest_sede` INT NULL,
  `dest_bodega` VARCHAR(45) NULL,
  `dest_posicion` VARCHAR(45) NULL,
  `dest_campaña` VARCHAR(45) NULL,
  `ori_sede` VARCHAR(45) NULL,
  `ori_bodega` VARCHAR(45) NULL,
  `ori_posicion` VARCHAR(45) NULL,
  `ori_campaña` VARCHAR(45) NULL,
  `ticket` INT NULL,
  `fecha_mov` DATETIME NULL,
  `fk_usuario` INT NOT NULL,
  `fk_puesto` INT NOT NULL,
  `fk_campaign` INT NOT NULL,
  `fk_bodega` INT NOT NULL,
  `fk_sede` INT NOT NULL,
  PRIMARY KEY (`id_movimiento`),
  INDEX `id_sede_idx` (`fk_sede` ASC),
  INDEX `id_bodega_idx` (`fk_bodega` ASC),
  INDEX `id_campaña_idx` (`fk_campaign` ASC),
  INDEX `id_puesto_idx` (`fk_puesto` ASC),
  INDEX `id_usuario_idx` (`fk_usuario` ASC),
  CONSTRAINT `fk_sede_mov`
    FOREIGN KEY (`fk_sede`)
    REFERENCES `Inventario_Digitex`.`sedes` (`id_sede`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_bodega_mov`
    FOREIGN KEY (`fk_bodega`)
    REFERENCES `Inventario_Digitex`.`bodegas` (`id_bodega`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_campaign_mov`
    FOREIGN KEY (`fk_campaign`)
    REFERENCES `Inventario_Digitex`.`campaign` (`id_campaign`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_puesto_mov`
    FOREIGN KEY (`fk_puesto`)
    REFERENCES `Inventario_Digitex`.`puestos` (`id_puesto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_mov`
    FOREIGN KEY (`fk_usuario`)
    REFERENCES `Inventario_Digitex`.`usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
