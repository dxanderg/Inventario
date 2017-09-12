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
			function(callback) { db.query(`SELECT * FROM inventario_digitex.fabricante
																		order by id_fabricante`, function(err, rows, fields){
					if(err) throw err
					consulta0 = rows
					callback()
	      })
  		},
  		function(callback) { db.query(`SELECT * FROM inventario_digitex.tipo_item
																		order by idtipo_item`, function(err, rows, fields){
					if(err) throw err
					consulta1 = rows
					callback()
	      })
  		},
  		function(callback) { db.query(`SELECT * FROM inventario_digitex.items
																		order by nombre_item, modelo_item, modelo_item_2`, function(err, rows, fields){
					if(err) throw err
					consulta2 = rows
					callback()
	      })
		}], function(err, results) {
  		res.render('admin/Index', {consulta0 : consulta0, consulta1 : consulta1, consulta2 : consulta2})
		})
	},
	postFabricante: function(req, res, next){
		var insertFabricante = {
			nombre_fabricante: req.body.data
		}
		console.log(insertFabricante)
		
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		var respuesta = {res: false}
		db.connect()

		db.query('INSERT INTO fabricante VALUES ? ', insertFabricante, function(err, rows, fields){
			if(err) {
				res.render('actuaartmodal', {title: 'Error!', info: 'Se produjo un error al ingresar el articulo!', error: err})
				console.log(err)//throw err
			}
			else{
					res.render('actuaartmodal', {title: 'Exito!', info: 'Articulo Actualizado Correctamente!'})	
					}
			db.end()
		})
	}
}
