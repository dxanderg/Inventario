var mysql = require('mysql')
var async = require('async')
var dateFormat = require('dateFormat')

module.exports = {
	ingresos : function(req, res, next){
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
  		function(callback) { db.query(`SELECT * FROM sedes WHERE id_sede = ?`, userSede, function(err, rows, fields){
					if(err) throw err
					consulta2 = rows
					callback()
	      })
		}], function(err, results) {
  		res.render('Ingresos', {consulta0 : consulta0, consulta1 : consulta1, consulta2 : consulta2})
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
				res.render('newartmodal', {title: 'Error!', info: 'Se produjo un error al ingresar el articulo!', error: err})
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
	},
	apiItems : function(req, res, next){
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		var id = req.params.id_item
		var consulta1 = null

		db.query(`SELECT id_item, nombre_item, b.nombre_fabricante, modelo_item, tipo 
						FROM items
						JOIN fabricante b ON fk_fabricante = b.id_fabricante 
						WHERE activo = 1 AND tipo = ?
						ORDER BY b.nombre_fabricante, nombre_item, modelo_item`, id, function(err, rows, fields){
			if(err) throw err
			consulta1 = rows
			db.end()
		res.send({ data : consulta1})
		})
	},
}