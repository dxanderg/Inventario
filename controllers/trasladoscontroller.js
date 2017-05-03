var mysql = require('mysql')
var async = require('async')
var dateFormat = require('dateFormat')

module.exports = {

	traslados : function(req, res, next){
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		var id = req.params.id

		var consulta1 = null
		var consulta2 = null
		var consulta3 = null
		var consulta4 = null
		var consulta5 = null
		var consulta6 = null

		async.parallel([
  		function(callback) { db.query(`SELECT id_item, nombre_item, b.nombre_fabricante, modelo_item FROM inventario_digitex.items
						JOIN fabricante b ON fk_fabricante = b.id_fabricante WHERE activo = 1 ORDER BY nombre_item `, function(err, rows, fields){
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
  		function(callback) { db.query(`SELECT * FROM bodegas WHERE fk_sede = 1`, function(err, rows, fields){
					if(err) throw err
					consulta3 = rows
					callback()
	      })
  		},
  		function(callback) { db.query(`SELECT * FROM campaign`, function(err, rows, fields){
					if(err) throw err
					consulta4 = rows
					callback()
	      })
  		},
  		function(callback) { db.query(`SELECT * FROM puestos`, function(err, rows, fields){
					if(err) throw err
					consulta5 = rows
					callback()
	      })
  		}
  		// function(callback) { db.query(`select a.id_articulos, a.activo, e.nombre_estado, a.serial_art, a.plaqueta_art, a.fk_items, i.nombre_item, i.modelo_item, a.fk_puesto, a.fk_campaign, c.nombre_campaign, f.nombre_fabricante, a.fk_bodega, b.nombre_bodega, a.fk_sede, s.nombre_sede from articulos a
				// 															JOIN estados e ON a.activo = e.id_estados
				// 															JOIN bodegas b ON a.fk_bodega = b.id_bodega
				// 															JOIN sedes s ON a.fk_sede = s.id_sede 
				// 															JOIN puestos p ON a.fk_puesto = p.id_puesto
				// 															JOIN campaign c ON a.fk_campaign = c.id_campaign
				// 															JOIN items i ON a.fk_items = i.id_item
				// 															JOIN fabricante f ON i.fk_fabricante = f.id_fabricante
				// 															where a.id_articulos = ?`, id, function(err, rows, fields){
				// 	if(err) throw err
				// 	consulta6 = rows
				// 	callback()
	   //    })
		], function(err, results) {
  		res.render('Traslados', {consulta1 : consulta1, consulta2 : consulta2, consulta3 : consulta3, consulta4: consulta4, consulta5 : consulta5})
		})
	}
}