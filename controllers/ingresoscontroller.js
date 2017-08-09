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
  		function(callback) { db.query(`SELECT id_item, nombre_item, b.nombre_fabricante, modelo_item, tipo FROM inventario_digitex.items
						JOIN fabricante b ON fk_fabricante = b.id_fabricante WHERE activo = 1 ORDER BY b.nombre_fabricante, nombre_item`, function(err, rows, fields){
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
  		function(callback) { db.query(`SELECT * FROM items GROUP BY tipo`, function(err, rows, fields){
					if(err) throw err
					consulta7 = rows
					callback()
	      })
  		},
  		function(callback) { db.query(`SELECT * FROM puestos`, function(err, rows, fields){
					if(err) throw err
					consulta6 = rows
					callback()
	      })
		}], function(err, results) {
  		res.render('Ingresos', {consulta1 : consulta1, consulta2 : consulta2, consulta3 : consulta3, consulta4: consulta4, consulta5 : consulta5, consulta6: consulta6, consulta7: consulta7})
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
			fk_items : req.body.tipoarticulo,
			fk_tipo : req.body.articulo
		}

		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		db.query('INSERT INTO articulos SET ?', articuloNew, function(err, rows, fields){
			if(err) {
				res.render('newartmodal', {title: 'Error!', info: 'Se produjo un error al ingresar el artiulo!', error: err})
				console.log(err)//throw err
			}
			else{
				var idInserted = rows.insertId
				var ocupacionNew = {
					fk_id_puesto: req.body['posicion'],
					fk_id_articulos: idInserted,
					fecha_ocupacion : fechaA
				}
				db.query('INSERT INTO ocupacion SET ?', ocupacionNew, function(err, rows, fields){
					if (err){
						res.render('newartmodal', {title: 'Error!', info: 'Se produjo un error al asignar la ocupacion! (Articulo OK)', error: err})
					}
					else{
						res.render('newartmodal', {title: 'Exito!', info: 'Articulo Registrado con Correctamente!'})
					}
				})
			}
			db.end()
		})
	}
}