var mysql = require('mysql')
var async = require('async')
var dateFormat = require('dateFormat')
var InsertQuery = require('mysql-insert-multiple')
var _ = require('lodash')

module.exports = {

	apiArticulos : function(req, res, next){
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		var id = req.params.id_posicion
		var consulta1 = null

		db.query(`SELECT a.id_articulos, a.serial_art, a.plaqueta_art, i.nombre_item, i.modelo_item, p.id_puesto, p.posicion
							FROM articulos a
							JOIN ocupacion o ON a.id_articulos = o.fk_id_articulos
							JOIN items i ON a.fk_items = i.id_item
							JOIN puestos p ON p.id_puesto = o.fk_id_puesto
							WHERE o.fk_id_puesto = ?`, id, function(err, rows, fields){
			if(err) throw err
			consulta1 = rows
			db.end()
		res.send({ data : consulta1})
		})
	},
	apiPuestos : function(req, res, next){
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		var id = req.params.id_puesto
		var consulta2 = null

		db.query(`SELECT id_puesto, posicion, fk_bodega FROM puestos
							WHERE fk_bodega = ? AND fk_estado = 1`, id, function(err, rows, fields){
			if(err) throw err
			consulta2 = rows
			db.end()
		res.send({ data : consulta2})
		})
	},
	apiBodegas : function(req, res, next){
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		// var id = req.user.sede
		var id = req.params.id_sede
		var consulta3 = null

		db.query(`SELECT id_bodega, nombre_bodega, fk_sede FROM bodegas
							WHERE fk_sede = ?
							ORDER BY nombre_bodega`, id, function(err, rows, fields){
			if(err) throw err
			consulta3 = rows
			db.end()
		res.send({ data : consulta3})
		})
	},
	apiSedes : function(req, res, next){
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		var id = req.params.ciudad_user
		var consulta = null

		db.query(`SELECT * FROM sedes
							WHERE ciudad_sede = ?
							ORDER BY nombre_sede`, id, function(err, rows, fields){
			if(err) throw err
			consulta = rows
			db.end()
		res.send({ data : consulta})
		})
	},
	traslados : function(req, res, next){
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()
		console.log(req.user)

		async.parallel([
  		function(callback) { db.query(`SELECT id_item, nombre_item, b.nombre_fabricante, modelo_item FROM items
						JOIN fabricante b ON fk_fabricante = b.id_fabricante WHERE activo = 1 ORDER BY nombre_item `, function(err, rows, fields){
					if(err) throw err
					consulta1 = rows
					callback()
	      })
  		},
  		function(callback) { db.query(`SELECT * FROM items
																		GROUP BY nombre_item`, function(err, rows, fields){
					if(err) throw err
					consulta2 = rows
					callback()
	      })
  		},
  		function(callback) { db.query(`SELECT * FROM bodegas WHERE fk_sede = 1
																			ORDER BY nombre_bodega`, function(err, rows, fields){
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
  		function(callback) { db.query(`SELECT p.id_puesto, p.posicion, p.fk_bodega, fk_campaign, fk_estado, b.id_bodega, b.nombre_bodega 
  																		FROM puestos p
																			JOIN bodegas b ON p.fk_bodega = b.id_bodega`, function(err, rows, fields){
					if(err) throw err
					consulta5 = rows
					callback()
	      })
  		}
		], function(err, results) {
  		res.render('Traslados', {consulta1 : consulta1, consulta2 : consulta2, consulta3 : consulta3, consulta4: consulta4, consulta5 : consulta5, user: req.user})
		})
	},
	postNuevoTraslado : function(req, res, next){

		var fechaActual = new Date()
		var fechaA = dateFormat(fechaActual, 'yyyy-mm-dd')
		var indice = req.body.indice.length

		// var sql = "INSERT INTO movimientos (ori_puestoId, ori_campana, dest_puestoId, dest_campana, ticket, fecha_mov, fk_usuario, fk_articulos ) VALUES ?";
		// var values = []
		// for (i=1; i==indice; i++){
	 //    values.push(req.body['posicionI-'+i], 9, req.body['posicionF-'+i], 2, req.body.ticket, fechaA, req.user.id, req.body['articuloI-'+i])
	 //  }

		console.log(req.body)		
		
		// var Query = InsertQuery({
		//   table: 'movimientos',
		//   maxRow: 10,
		//   data: [
		//     {
		// 			'ori_puestoId': req.body['posicionI-1'],
		// 			'ori_campana': {
		// 									string: 'SELECT fk_campaign from ?? WHERE id_puesto = ?', 
		// 									value: [puestos, req.body['posicionI-1']
		// 								}
		// 			'dest_puestoId': req.body['posicionF-1'],
		// 			'dest_campana': { string: '(SELECT fk_campaign from ?? WHERE id_puesto = ?)', value: [puestos, req.body['posicionF-1'] },
		// 			'ticket': req.body.ticket,
		// 			'fecha_mov': fechaA,
		// 			'fk_usuario': req.user.id,
		// 			'fk_articulos': req.body['articuloI-1']
		//     }
		//   ]
		// })

		// var config = require('.././database/config')
		// var db = mysql.createConnection(config)
		// db.connect()

		// db.query(sql, [values], function(err, rows, fields){
		// 	if(err) {
		// 		res.render('newmovmodal', {title: 'Error!', info: 'Se produjo un error al ingresar el movimiento!', error: err})
		// 		console.log(err)//throw err
		// 	}
		// 	else{
		// 		res.render('newmovmodal', {title: 'Exito!', info: 'Movimiento Registrado con Correctamente!'})	
		// 	}
		// 	db.end()
		// })
	}
}