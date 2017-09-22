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
		var consulta3 = null
		var consulta4 = null
		var consulta5 = null
		var userSede = res.locals.currentuser.sede
		var userCampana = res.locals.currentuser.campaña

		async.parallel([
			function(callback) { db.query(`SELECT * FROM fabricante
																		order by id_fabricante`, function(err, rows, fields){
					if(err) throw err
					consulta0 = rows
					callback()
	      })
  		},
  		function(callback) { db.query(`SELECT * FROM tipo_item
																		order by idtipo_item`, function(err, rows, fields){
					if(err) throw err
					consulta1 = rows
					callback()
	      })
  		},
  		function(callback) { db.query(`SELECT f.nombre_fabricante, id_item, nombre_item, modelo_item, modelo_item_2, i.caracteristica_1, i.caracteristica_2, i.caracteristica_3 FROM items i, fabricante f
																		where f.id_fabricante = i.fk_fabricante
																		order by nombre_fabricante, nombre_item, modelo_item, modelo_item_2`, function(err, rows, fields){
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
			function(callback) { db.query(`SELECT b.id_bodega, b.nombre_bodega, b.fk_sede, s.nombre_sede FROM bodegas b
																		JOIN sedes s ON s.id_sede = b.fk_sede
																		ORDER BY s.nombre_sede, b.nombre_bodega`, function(err, rows, fields){
							if(err) throw err
							consulta4 = rows
							callback()
			      })
			},
			function(callback) { db.query(`SELECT p.id_puesto, p.posicion, p.fk_sede, s.nombre_sede, p.fk_bodega, b.nombre_bodega, p.fk_campaign FROM puestos p
																			JOIN sedes s ON s.id_sede = p.fk_sede
																			JOIN bodegas b ON b.id_bodega = p.fk_bodega
																			ORDER BY s.nombre_sede, b.nombre_bodega, p.posicion`, function(err, rows, fields){
							if(err) throw err
							consulta5 = rows
							callback()
			      })
			},
			function(callback) { db.query(`SELECT * FROM campaign
																		ORDER BY CECO`, function(err, rows, fields){
								if(err) throw err
								consulta6 = rows
								callback()
				      })
		}], function(err, results) {
  		res.render('admin/Index', {consulta0 : consulta0, consulta1 : consulta1, consulta2 : consulta2, consulta3 : consulta3, consulta4 : consulta4, consulta5 : consulta5,  consulta6 : consulta6})
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

		db.query('INSERT INTO items SET ? ', insertItem, function(err, rows, fields){
			if(err) {
				res.send({title: 'Error!', info: 'Se produjo un error al ingresar el Item!', error: err, status: 400})
			}
			else{
				res.send({title: 'Exito!', info: 'Se creo el Item correctamente!', status: 200})
			}
			db.end()
		})
	},
	postSedes: function(req, res, next){
		var insertSedes = {
			nombre_sede : req.params.val1,
	    ciudad_sede : req.params.val2,
	    pais_sede : req.params.val3
		}

		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		db.query('INSERT INTO sedes SET ? ', insertSedes, function(err, rows, fields){
			if(err) {
				res.send({title: 'Error!', info: 'Se produjo un error al ingresar Sede!', error: err, status: 400})
			}
			else{
				res.send({title: 'Exito!', info: 'Se creo la Sede correctamente!', status: 200})
			}
			db.end()
		})
	},
	postBodegas: function(req, res, next){
		var insertBodegas = {
			nombre_bodega : req.params.val1,
	    fk_sede : req.params.val2
		}

		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		db.query('INSERT INTO bodegas SET ? ', insertBodegas, function(err, rows, fields){
			if(err) {
				res.send({title: 'Error!', info: 'Se produjo un error al ingresar la Bodega!', error: err, status: 400})
			}
			else{
				res.send({title: 'Exito!', info: 'Se creo la Bodega correctamente!', status: 200})
			}
			db.end()
		})
	},
	postPuestos: function(req, res, next){
		var fechaActual = new Date()
		var fechaA = dateFormat(fechaActual, 'yyyy-mm-dd')

		var insertPuestos = {
			posicion : req.params.val1,
			fk_sede : req.params.val2,
			fk_bodega : req.params.val3,
			fk_campaign : req.params.val4,
			fk_estado : 1,
			fecha_puestos : fechaA
		}

		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		db.query('INSERT INTO puestos SET ? ', insertPuestos, function(err, rows, fields){
			if(err) {
				res.send({title: 'Error!', info: 'Se produjo un error al ingresar la Posicion!', error: err, status: 400})
			}
			else{
				res.send({title: 'Exito!', info: 'Se creo la Posicion correctamente!', status: 200})
			}
			db.end()
		})
	},
	postCampana: function(req, res, next){
		var insertCampana = {
			CECO : req.params.val1,
			nombre_campaign : req.params.val2,
			cliente_campaign : req.params.val3
		}

		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		db.query('INSERT INTO campaign SET ? ', insertCampana, function(err, rows, fields){
			if(err) {
				res.send({title: 'Error!', info: 'Se produjo un error al ingresar la Campaña!', error: err, status: 400})
			}
			else{
				res.send({title: 'Exito!', info: 'Se creo la Campaña correctamente!', status: 200})
			}
			db.end()
		})
	},
	apiBodega : function(req, res, next){
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		var bodegas = null
		var idSede = req.params.id_sede

		db.query(`SELECT id_bodega, nombre_bodega, fk_sede FROM bodegas
							WHERE fk_sede = ?
							ORDER BY nombre_bodega`, idSede, function(err, rows, fields){
			if(err) throw err
			bodegas = rows
			db.end()
		res.send({ data : bodegas})
		})
	}
}
