var mysql = require('mysql')
var async = require('async')
var dateFormat = require('dateFormat')

module.exports = {

	consultas : function(req, res, next){
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		var consulta1 = null
		var userSede = res.locals.currentuser.sede
		var userCampana = res.locals.currentuser.campaña

		db.query(`SELECT a.id_articulos, a.fk_items, f.nombre_fabricante, i.nombre_item, i.modelo_item, a.serial_art, a.plaqueta_art, e.id_estados, e.nombre_estado, s.id_sede, s.nombre_sede, b.id_bodega, b.nombre_bodega, p.id_puesto, p.posicion, c.id_campaign, c.nombre_campaign
							FROM articulos a, fabricante f, items i, estados e, sedes s, bodegas b, puestos p, campaign c, ocupacion o
							WHERE o.fk_id_articulos = a.id_articulos
							AND o.fk_id_puesto = p.id_puesto 
							AND f.id_fabricante = i.fk_fabricante 
							AND a.fk_items = i.id_item
							AND p.fk_campaign = c.id_campaign
							AND p.fk_bodega = b.id_bodega
							AND p.fk_sede = s.id_sede
							AND a.activo = e.id_estados
							AND id_sede = ?
							ORDER BY b.nombre_bodega, p.posicion, i.nombre_item, f.nombre_fabricante ASC`, userSede, function(err, rows, fields){
			if(err) throw err
			consulta1 = rows
			db.end()
		res.render('Consultas', {consulta1 : consulta1})
		})
	},
	getModificarArticulo : function(req, res, next){
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		var id = req.params.id
		var userSede = res.locals.currentuser.sede
		var userCampana = res.locals.currentuser.campaña
		var params = [id, userSede]

		var consulta1 = null
		var consulta2 = null
		var consulta3 = null
		var consulta4 = null
		var consulta7 = null

		if(res.locals.currentuser.perfil == 1){
			async.parallel([
	  		function(callback) { db.query(`SELECT id_item, nombre_item, b.nombre_fabricante, modelo_item, tipo FROM items
							JOIN fabricante b ON fk_fabricante = b.id_fabricante WHERE activo = 1 ORDER BY nombre_item, b.nombre_fabricante `, function(err, rows, fields){
						if(err) throw err
						consulta1 = rows
						callback()
		      })
	  		},
	  		function(callback) { db.query(`SELECT * FROM estados`, function(err, rows, fields){
						if(err) throw err
						consulta2 = rows
						callback()
		      })
	  		},
	  		function(callback) { db.query(`SELECT * FROM bodegas ORDER by nombre_bodega`, function(err, rows, fields){
						if(err) throw err
						consulta3 = rows
						callback()
		      })
	  		},
	  		function(callback) { db.query(`SELECT * FROM sedes ORDER by nombre_sede`, function(err, rows, fields){
						if(err) throw err
						consulta4 = rows
						callback()
		      })
	  		},
	  		function(callback) { db.query(`SELECT a.id_articulos, a.fk_items, f.nombre_fabricante, i.nombre_item, i.modelo_item, a.serial_art, a.plaqueta_art, e.id_estados, e.nombre_estado, s.id_sede, s.nombre_sede, b.id_bodega, b.nombre_bodega, p.id_puesto, p.posicion, c.id_campaign, c.nombre_campaign
																			FROM articulos a, fabricante f, items i, estados e, sedes s, bodegas b, puestos p, campaign c, ocupacion o
																			WHERE o.fk_id_articulos = a.id_articulos
																			AND o.fk_id_puesto = p.id_puesto 
																			AND f.id_fabricante = i.fk_fabricante 
																			AND a.fk_items = i.id_item
																			AND p.fk_campaign = c.id_campaign
																			AND p.fk_bodega = b.id_bodega
																			AND p.fk_sede = s.id_sede
																			AND a.activo = e.id_estados
																			AND a.id_articulos = ?`, id, function(err, rows, fields){
						if(err) throw err
						consulta7 = rows
						db.end()
						callback()
		      })
			}], function(err, results) {
	  		res.render('ModificarArtGlobal', {consulta1 : consulta1, consulta2 : consulta2, consulta3 : consulta3, consulta4 : consulta4, consulta7: consulta7, sedeUsuario: userSede})
			})
		}
		else{
			async.parallel([
	  		function(callback) { db.query(`SELECT id_item, nombre_item, b.nombre_fabricante, modelo_item, tipo FROM items
							JOIN fabricante b ON fk_fabricante = b.id_fabricante WHERE activo = 1 ORDER BY nombre_item, b.nombre_fabricante`, function(err, rows, fields){
						if(err) throw err
						consulta1 = rows
						callback()
		      })
	  		},
	  		function(callback) { db.query(`SELECT * FROM estados`, function(err, rows, fields){
						if(err) throw err
						consulta2 = rows
						callback()
		      })
	  		},
	  		function(callback) { db.query(`SELECT * FROM bodegas WHERE fk_sede = ? ORDER by nombre_bodega`, userSede,  function(err, rows, fields){
						if(err) throw err
						consulta3 = rows
						callback()
		      })
	  		},
	  		function(callback) { db.query(`SELECT a.id_articulos, a.fk_items, f.nombre_fabricante, i.nombre_item, i.modelo_item, a.serial_art, a.plaqueta_art, e.id_estados, e.nombre_estado, s.id_sede, s.nombre_sede, b.id_bodega, b.nombre_bodega, p.id_puesto, p.posicion, c.id_campaign, c.nombre_campaign
																			FROM articulos a, fabricante f, items i, estados e, sedes s, bodegas b, puestos p, campaign c, ocupacion o
																			WHERE o.fk_id_articulos = a.id_articulos
																			AND o.fk_id_puesto = p.id_puesto 
																			AND f.id_fabricante = i.fk_fabricante 
																			AND a.fk_items = i.id_item
																			AND p.fk_campaign = c.id_campaign
																			AND p.fk_bodega = b.id_bodega
																			AND p.fk_sede = s.id_sede
																			AND a.activo = e.id_estados
																			AND a.id_articulos = ?
																			AND s.id_sede = ?`, params, function(err, rows, fields){
						if(err) throw err
						consulta7 = rows
						db.end()
						callback()
		      })
			}], function(err, results) {
	  		res.render('ModificarArt', {consulta1 : consulta1, consulta2 : consulta2, consulta3 : consulta3, consulta7: consulta7})
			})
		}
	},
	actualizar : function(req, res, next){
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		var consulta1 = null
		var userSede = res.locals.currentuser.sede
		var userCampana = res.locals.currentuser.campaña

		db.query(`SELECT a.id_articulos, a.fk_items, f.nombre_fabricante, i.nombre_item, i.modelo_item, a.serial_art, a.plaqueta_art, e.id_estados, e.nombre_estado, s.id_sede, s.nombre_sede, b.id_bodega, b.nombre_bodega, p.id_puesto, p.posicion, c.id_campaign, c.nombre_campaign
							FROM articulos a, fabricante f, items i, estados e, sedes s, bodegas b, puestos p, campaign c, ocupacion o
							WHERE o.fk_id_articulos = a.id_articulos
							AND o.fk_id_puesto = p.id_puesto 
							AND f.id_fabricante = i.fk_fabricante 
							AND a.fk_items = i.id_item
							AND p.fk_campaign = c.id_campaign
							AND p.fk_bodega = b.id_bodega
							AND p.fk_sede = s.id_sede
							AND a.activo = e.id_estados
							AND id_sede = ?
							ORDER BY b.nombre_bodega, p.posicion, i.nombre_item ASC`, userSede, function(err, rows, fields){
			if(err) throw err
			consulta1 = rows
			db.end()
		res.render('Actualizar', {consulta1 : consulta1})
		})
	},
	globalinv : function(req, res, next){
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		var consulta1 = null
		var userSede = res.locals.currentuser.sede
		var userCampana = res.locals.currentuser.campaña

		db.query(`SELECT a.id_articulos, a.fk_items, f.nombre_fabricante, i.nombre_item, i.modelo_item, a.serial_art, a.plaqueta_art, e.id_estados, e.nombre_estado, s.id_sede, s.nombre_sede, b.id_bodega, b.nombre_bodega, p.id_puesto, p.posicion, c.id_campaign, c.nombre_campaign
							FROM articulos a, fabricante f, items i, estados e, sedes s, bodegas b, puestos p, campaign c, ocupacion o
							WHERE o.fk_id_articulos = a.id_articulos
							AND o.fk_id_puesto = p.id_puesto 
							AND f.id_fabricante = i.fk_fabricante 
							AND a.fk_items = i.id_item
							AND p.fk_campaign = c.id_campaign
							AND p.fk_bodega = b.id_bodega
							AND p.fk_sede = s.id_sede
							AND a.activo = e.id_estados
							ORDER BY b.nombre_bodega, p.posicion, i.nombre_item ASC`, function(err, rows, fields){
			if(err) throw err
			consulta1 = rows
			db.end()
		res.render('Actualizar-Global', {consulta1 : consulta1})
		})
	},
	postActualizaArticulo : function(req, res, next){
		var fechaActual = new Date()
		var fechaA = dateFormat(fechaActual, 'yyyy-mm-dd')

		var articuloEdit = {
			activo : req.body.estado,
			serial_art : req.body.serial,
			plaqueta_art : req.body.plaqueta,
			fecha_creacion : fechaA,
			fk_items : req.body.articulo
		}
		
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		var respuesta = {res: false}
		db.connect()

		db.query('UPDATE articulos SET ? WHERE ? ', [articuloEdit, {id_articulos : req.body.id_articulos}], function(err, rows, fields){
			if(err) {
				res.render('actuaartmodal', {title: 'Error!', info: 'Se produjo un error al ingresar el articulo!', error: err})
				db.end()
			}
			else{
				var ocupacionMod = {
					fk_id_puesto: req.body.posicion,
					fecha_ocupacion : fechaA
				}
				db.query('UPDATE ocupacion SET ? WHERE ?', [ocupacionMod, {fk_id_articulos : req.body.id_articulos}], function(err, rows, fields){
					if (err){
						res.render('newartmodal', {title: 'Error!', info: 'Se produjo un error al asignar la ocupacion! (Articulo OK)', error: err})
						db.end()
					}
					else{
						var historicoMod = {
							ori_puestoId : req.body.idPosInicial,
							ori_campana :  req.body.idCampaignInicial,
							dest_puestoId : req.body.posicion,
							dest_campana : '0',
							ticket : req.body.ticket,
							fecha_mov : fechaA,
							fk_usuario : res.locals.currentuser.id,
							fk_articulos : req.body.id_articulos,
							fk_estados : req.body.estado,
							plaqueta : req.body.plaqueta,
							serial : req.body.serial
						}
						db.query('INSERT INTO movimientos SET ?', historicoMod, function(err, rows, fields){
							if (err){
								res.render('newartmodal', {title: 'Error!', info: 'Se produjo un error al guardar Historico! (Articulo OK | Ocupacion OK)', error: err})
								db.end()
							}
							else{
								res.render('actuaartmodal', {title: 'Exito!', info: 'Articulo Actualizado Correctamente!'})
								db.end()
							}
						})
					}
				})
			}
		})
	}
}
