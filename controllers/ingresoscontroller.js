var mysql = require('mysql')
var async = require('async')
var dateFormat = require('dateFormat')

module.exports = {
	ingresos : function(req, res, next){
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

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
  		function(callback) { db.query(`SELECT * FROM sedes`, function(err, rows, fields){
					if(err) throw err
					consulta3 = rows
					callback()
	      })
  		},
  		function(callback) { db.query(`SELECT * FROM bodegas`, function(err, rows, fields){
					if(err) throw err
					consulta4 = rows
					callback()
	      })
  		},
  		function(callback) { db.query(`SELECT * FROM campaign`, function(err, rows, fields){
					if(err) throw err
					consulta5 = rows
					callback()
	      })
  		},
  		function(callback) { db.query(`SELECT * FROM puestos`, function(err, rows, fields){
					if(err) throw err
					consulta6 = rows
					callback()
	      })
		}], function(err, results) {
  		res.render('Ingresos', {consulta1 : consulta1, consulta2 : consulta2, consulta3 : consulta3, consulta4: consulta4, consulta5 : consulta5, consulta6: consulta6})
		})
	},

	postNuevoArticulo : function(req, res, next){

		var fechaActual = new Date()
		var fecha = dateFormat(fechaActual, 'yyyy-mm-dd')

		var articuloNew = {
			articulo : req.body.articulo,
			serial : req.body.serial,
			plaqueta : req.body.plaqueta,
			estado : req.body.estado,
			sede : req.body.sede,
			ubicacion : req.body['select-bodega'],
			posicion : req.body['select-posicion'],
			campaign : req.body.campaña,
			fecha : req.body.fecha
		}	
		console.log(articuloNew)

		// var config = require('.././database/config')
		// var db = mysql.createConnection(config)
		// db.connect()

		// var ingreso1 = null

		// db.query(`SELECT distinct nombre_item FROM items`, function(err, rows, fields){
		// 	if(err) throw err
		// 	consulta1 = rows
		// 	db.end()
		// res.render('Ingresos', {consulta1 : consulta1})
		// })
	}
}