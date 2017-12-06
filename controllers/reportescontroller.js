var mysql = require('mysql')
var async = require('async')
var dateFormat = require('dateFormat')

module.exports = {
	index : function(req, res, next){
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		var consulta0 = null
		var consulta1 = null
		var consulta2 = null
		var userSede = res.locals.currentuser.sede
		var userCampana = res.locals.currentuser.campaña

		async.parallel([
			function(callback) { db.query(`SELECT * FROM tipo_item
																		ORDER BY nombre_item`, function(err, rows, fields){
					if(err) throw err
					consulta0 = rows
					callback()
	      })
  		},
  		function(callback) { db.query(`SELECT * FROM estados`, function(err, rows, fields){
					if(err) throw err
					consulta1 = rows
					callback()
	      })
  		},
  		function(callback) { db.query(`SELECT * FROM sedes`, function(err, rows, fields){
					if(err) throw err
					consulta2 = rows
					callback()
	      })
		}], function(err, results) {
  		res.render('reportes/reportes', {consulta0 : consulta0, consulta1 : consulta1, consulta2 : consulta2})
		})
	},
	querySerial : function(req, res, next){
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()
		var consulta1 = null

		db.query(`SELECT a.id_articulos, a.fk_items, f.nombre_fabricante, i.nombre_item, i.modelo_item, a.serial_art, a.plaqueta_art, e.id_estados, e.nombre_estado, s.id_sede, s.nombre_sede, b.id_bodega, b.nombre_bodega, p.id_puesto, p.posicion, c.id_campaign, c.nombre_campaign, a.responsable, a.propietario
							FROM articulos a, fabricante f, items i, estados e, sedes s, bodegas b, puestos p, campaign c, ocupacion o
							WHERE o.fk_id_articulos = a.id_articulos
							AND o.fk_id_puesto = p.id_puesto 
							AND f.id_fabricante = i.fk_fabricante 
							AND a.fk_items = i.id_item
							AND p.fk_campaign = c.id_campaign
							AND p.fk_bodega = b.id_bodega
							AND p.fk_sede = s.id_sede
							AND a.activo = e.id_estados
							AND a.serial_art LIKE ?
							ORDER BY b.nombre_bodega, p.posicion, i.nombre_item, f.nombre_fabricante ASC`, '%'+req.body.serial+'%', function(err, rows, fields){
			if(err) throw err
			consulta1 = rows
			db.end()
		res.render('reportes/ConsultaReport', {consulta1 : consulta1})
		})
	},
	queryPlaqueta : function(req, res, next){
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()
		var consulta1 = null

		db.query(`SELECT a.id_articulos, a.fk_items, f.nombre_fabricante, i.nombre_item, i.modelo_item, a.serial_art, a.plaqueta_art, e.id_estados, e.nombre_estado, s.id_sede, s.nombre_sede, b.id_bodega, b.nombre_bodega, p.id_puesto, p.posicion, c.id_campaign, c.nombre_campaign, a.responsable, a.propietario
							FROM articulos a, fabricante f, items i, estados e, sedes s, bodegas b, puestos p, campaign c, ocupacion o
							WHERE o.fk_id_articulos = a.id_articulos
							AND o.fk_id_puesto = p.id_puesto 
							AND f.id_fabricante = i.fk_fabricante 
							AND a.fk_items = i.id_item
							AND p.fk_campaign = c.id_campaign
							AND p.fk_bodega = b.id_bodega
							AND p.fk_sede = s.id_sede
							AND a.activo = e.id_estados
							AND a.plaqueta_art LIKE ?
							ORDER BY b.nombre_bodega, p.posicion, i.nombre_item, f.nombre_fabricante ASC`, '%'+req.body.plaqueta+'%', function(err, rows, fields){
			if(err) throw err
			consulta1 = rows
			db.end()
		res.render('reportes/ConsultaReport', {consulta1 : consulta1})
		})
	},
	queryResponsable : function(req, res, next){
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()
		var consulta1 = null

		db.query(`SELECT a.id_articulos, a.fk_items, f.nombre_fabricante, i.nombre_item, i.modelo_item, a.serial_art, a.plaqueta_art, e.id_estados, e.nombre_estado, s.id_sede, s.nombre_sede, b.id_bodega, b.nombre_bodega, p.id_puesto, p.posicion, c.id_campaign, c.nombre_campaign, a.responsable, a.propietario
							FROM articulos a, fabricante f, items i, estados e, sedes s, bodegas b, puestos p, campaign c, ocupacion o
							WHERE o.fk_id_articulos = a.id_articulos
							AND o.fk_id_puesto = p.id_puesto 
							AND f.id_fabricante = i.fk_fabricante 
							AND a.fk_items = i.id_item
							AND p.fk_campaign = c.id_campaign
							AND p.fk_bodega = b.id_bodega
							AND p.fk_sede = s.id_sede
							AND a.activo = e.id_estados
							AND a.responsable LIKE ?
							ORDER BY b.nombre_bodega, p.posicion, i.nombre_item, f.nombre_fabricante ASC`, '%'+req.body.responsable+'%', function(err, rows, fields){
			if(err) throw err
			consulta1 = rows
			db.end()
		res.render('reportes/ConsultaReport', {consulta1 : consulta1})
		})
	},
	queryPropietario : function(req, res, next){
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()
		var consulta1 = null

		db.query(`SELECT a.id_articulos, a.fk_items, f.nombre_fabricante, i.nombre_item, i.modelo_item, a.serial_art, a.plaqueta_art, e.id_estados, e.nombre_estado, s.id_sede, s.nombre_sede, b.id_bodega, b.nombre_bodega, p.id_puesto, p.posicion, c.id_campaign, c.nombre_campaign, a.responsable, a.propietario
							FROM articulos a, fabricante f, items i, estados e, sedes s, bodegas b, puestos p, campaign c, ocupacion o
							WHERE o.fk_id_articulos = a.id_articulos
							AND o.fk_id_puesto = p.id_puesto 
							AND f.id_fabricante = i.fk_fabricante 
							AND a.fk_items = i.id_item
							AND p.fk_campaign = c.id_campaign
							AND p.fk_bodega = b.id_bodega
							AND p.fk_sede = s.id_sede
							AND a.activo = e.id_estados
							AND a.propietario LIKE ?
							ORDER BY b.nombre_bodega, p.posicion, i.nombre_item, f.nombre_fabricante ASC`, '%'+req.body.propietario+'%', function(err, rows, fields){
			if(err) throw err
			consulta1 = rows
			db.end()
		res.render('reportes/ConsultaReport', {consulta1 : consulta1})
		})
	},
	queryArticulo : function(req, res, next){
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()
		var consulta1 = null

		db.query(`SELECT a.id_articulos, a.fk_items, f.nombre_fabricante, i.nombre_item, i.modelo_item, a.serial_art, a.plaqueta_art, e.id_estados, e.nombre_estado, s.id_sede, s.nombre_sede, b.id_bodega, b.nombre_bodega, p.id_puesto, p.posicion, c.id_campaign, c.nombre_campaign, a.responsable, a.propietario
							FROM articulos a, fabricante f, items i, estados e, sedes s, bodegas b, puestos p, campaign c, ocupacion o
							WHERE o.fk_id_articulos = a.id_articulos
							AND o.fk_id_puesto = p.id_puesto 
							AND f.id_fabricante = i.fk_fabricante 
							AND a.fk_items = i.id_item
							AND p.fk_campaign = c.id_campaign
							AND p.fk_bodega = b.id_bodega
							AND p.fk_sede = s.id_sede
							AND a.activo = e.id_estados
							AND i.tipo = ?
							ORDER BY b.nombre_bodega, p.posicion, i.nombre_item, f.nombre_fabricante ASC`, req.body.articulo, function(err, rows, fields){
			if(err) throw err
			consulta1 = rows
			db.end()
		res.render('reportes/ConsultaReport', {consulta1 : consulta1})
		})
	},
	queryItem : function(req, res, next){
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()
		var consulta1 = null

		db.query(`SELECT a.id_articulos, a.fk_items, f.nombre_fabricante, i.nombre_item, i.modelo_item, a.serial_art, a.plaqueta_art, e.id_estados, e.nombre_estado, s.id_sede, s.nombre_sede, b.id_bodega, b.nombre_bodega, p.id_puesto, p.posicion, c.id_campaign, c.nombre_campaign, a.responsable, a.propietario
							FROM articulos a, fabricante f, items i, estados e, sedes s, bodegas b, puestos p, campaign c, ocupacion o
							WHERE o.fk_id_articulos = a.id_articulos
							AND o.fk_id_puesto = p.id_puesto 
							AND f.id_fabricante = i.fk_fabricante 
							AND a.fk_items = i.id_item
							AND p.fk_campaign = c.id_campaign
							AND p.fk_bodega = b.id_bodega
							AND p.fk_sede = s.id_sede
							AND a.activo = e.id_estados
							AND a.fk_items = ?
							ORDER BY b.nombre_bodega, p.posicion, i.nombre_item, f.nombre_fabricante ASC`, req.body.tipoarticulo, function(err, rows, fields){
			if(err) throw err
			consulta1 = rows
			db.end()
		res.render('reportes/ConsultaReport', {consulta1 : consulta1})
		})
	},
	queryEstado : function(req, res, next){
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()
		var consulta1 = null

		db.query(`SELECT a.id_articulos, a.fk_items, f.nombre_fabricante, i.nombre_item, i.modelo_item, a.serial_art, a.plaqueta_art, e.id_estados, e.nombre_estado, s.id_sede, s.nombre_sede, b.id_bodega, b.nombre_bodega, p.id_puesto, p.posicion, c.id_campaign, c.nombre_campaign, a.responsable, a.propietario
							FROM articulos a, fabricante f, items i, estados e, sedes s, bodegas b, puestos p, campaign c, ocupacion o
							WHERE o.fk_id_articulos = a.id_articulos
							AND o.fk_id_puesto = p.id_puesto 
							AND f.id_fabricante = i.fk_fabricante 
							AND a.fk_items = i.id_item
							AND p.fk_campaign = c.id_campaign
							AND p.fk_bodega = b.id_bodega
							AND p.fk_sede = s.id_sede
							AND a.activo = e.id_estados
							AND e.id_estados = ?
							ORDER BY b.nombre_bodega, p.posicion, i.nombre_item, f.nombre_fabricante ASC`, req.body.estado, function(err, rows, fields){
			if(err) throw err
			consulta1 = rows
			db.end()
		res.render('reportes/ConsultaReport', {consulta1 : consulta1})
		})
	},
	querySede : function(req, res, next){
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()
		var consulta1 = null

		db.query(`SELECT a.id_articulos, a.fk_items, f.nombre_fabricante, i.nombre_item, i.modelo_item, a.serial_art, a.plaqueta_art, e.id_estados, e.nombre_estado, s.id_sede, s.nombre_sede, b.id_bodega, b.nombre_bodega, p.id_puesto, p.posicion, c.id_campaign, c.nombre_campaign, a.responsable, a.propietario
							FROM articulos a, fabricante f, items i, estados e, sedes s, bodegas b, puestos p, campaign c, ocupacion o
							WHERE o.fk_id_articulos = a.id_articulos
							AND o.fk_id_puesto = p.id_puesto 
							AND f.id_fabricante = i.fk_fabricante 
							AND a.fk_items = i.id_item
							AND p.fk_campaign = c.id_campaign
							AND p.fk_bodega = b.id_bodega
							AND p.fk_sede = s.id_sede
							AND a.activo = e.id_estados
							AND s.id_sede = ?
							ORDER BY b.nombre_bodega, p.posicion, i.nombre_item, f.nombre_fabricante ASC`, req.body.sede, function(err, rows, fields){
			if(err) throw err
			consulta1 = rows
			db.end()
		res.render('reportes/ConsultaReport', {consulta1 : consulta1})
		})
	}
}