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
		var fechaA = dateFormat(fechaActual, 'yyyy-mm-dd')

		var articuloNew = {
			activo : req.body.estado,
			serial_art : req.body.serial,
			plaqueta_art : req.body.plaqueta,
			fecha_creacion : fechaA,
			fk_items : req.body.articulo,
			fk_puesto : req.body['posicion'],
			fk_campaign : req.body.campaña,
			fk_bodega : req.body['bodega'],
			fk_sede : req.body.sede
		}

		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		db.query('INSERT INTO articulos SET ?', articuloNew, function(err, rows, fields){
			if(err) throw err
			db.end()
		})
		res.render('newartmodal', {title: 'Exito!', info: 'Articulo Registrado con Correctamente!'})
	}
}