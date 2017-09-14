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
  		function(callback) { db.query(`SELECT f.nombre_fabricante, id_item, nombre_item, modelo_item, modelo_item_2 FROM items i, fabricante f
																		where f.id_fabricante = i.fk_fabricante
																		order by nombre_fabricante, nombre_item, modelo_item, modelo_item_2;`, function(err, rows, fields){
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
			nombre_fabricante: req.params.nombre_fabricante	
		}

		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()
		

		db.query('INSERT INTO fabricante SET ? ', insertFabricante, function(err, rows, fields){
			if(err) {
				res.send({title: 'Error!', info: 'Se produjo un error al ingresar el Fabricante!', error: err, status: 400})
			}
			else{
				res.send({title: 'Exito!', info: 'Se creo el fabricante correctamente!', status: 200})
			}
			db.end()
		})
	},
	postTipoItem: function(req, res, next){
		var insertTipoItem = {
			nombre_item: req.params.tipoitem
		}

		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()
		

		db.query('INSERT INTO tipo_item SET ? ', insertTipoItem, function(err, rows, fields){
			if(err) {
				res.send({title: 'Error!', info: 'Se produjo un error al ingresar el Tipo de Item!', error: err, status: 400})
			}
			else{
				res.send({title: 'Exito!', info: 'Se creo el Tipo de Item correctamente!', status: 200})
			}
			db.end()
		})
	},
	postItems: function(req, res, next){
		var insertItem = {
			nombre_item : req.params.val1,
	    modelo_item : req.params.val2,
	    modelo_item_2 : req.params.val3,
	    fk_fabricante : req.params.val4,
	    activo : req.params.val5,
	    tipo : req.params.val6,
	    caracteristica_1 : req.params.val7,
	    caracteristica_2 : req.params.val8,
	    caracteristica_3 : req.params.val9
		}

		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()
		
		console.log(insertItem)

		db.query('INSERT INTO items SET ? ', insertItem, function(err, rows, fields){
			if(err) {
				res.send({title: 'Error!', info: 'Se produjo un error al ingresar el Item!', error: err, status: 400})
			}
			else{
				res.send({title: 'Exito!', info: 'Se creo el Item correctamente!', status: 200})
			}
			db.end()
		})
	}
}
