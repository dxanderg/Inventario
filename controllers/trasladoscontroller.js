var mysql = require('mysql')
var async = require('async')
var dateFormat = require('dateFormat')
var InsertQuery = require('mysql-insert-multiple')

module.exports = {

	traslados : function(req, res, next){
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		async.parallel([
  		function(callback) { db.query(`SELECT id_item, nombre_item, b.nombre_fabricante, modelo_item FROM inventario_digitex.items
						JOIN fabricante b ON fk_fabricante = b.id_fabricante WHERE activo = 1 ORDER BY nombre_item `, function(err, rows, fields){
					if(err) throw err
					consulta1 = rows
					callback()
	      })
  		},
  		function(callback) { db.query(`SELECT * FROM inventario_digitex.items
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
  		res.render('Traslados', {consulta1 : consulta1, consulta2 : consulta2, consulta3 : consulta3, consulta4: consulta4, consulta5 : consulta5})
		})
	},

	postNuevoTraslado : function(req, res, next){

		var fechaActual = new Date()
		var fechaA = dateFormat(fechaActual, 'yyyy-mm-dd')
		var usuario = 1
		var puestos = 'puestos'
		var articulos = 'articulos'
		
		var Query = InsertQuery({
		  table: 'movimientos',
		  maxRow: 1,
		  data: [
		    {
		      'dest_sede' : {
		      		string: '(SELECT fk_sede from ?? WHERE id_puesto = ?)',
		      		value: [puestos, req.body.posicionF1]
		      },
		      'dest_bodega': {
		      		string: '(SELECT fk_bodega from ?? WHERE id_puesto = ?)',
		      		value: [puestos, req.body.posicionF1]
		      },
		      'dest_posicion': {
		      		string: '(SELECT id_puesto from ?? WHERE id_puesto = ?)',
		      		value: [puestos, req.body.posicionF1]
		      },
		      'dest_campaña': {
		      		string: '(SELECT fk_campaign from ?? WHERE id_puesto = ?)',
		      		value: [puestos, req.body.posicionF1]
		      },
		      'ori_sede': {
		      		string: '(SELECT fk_sede from ?? WHERE fk_puesto = ? AND fk_tipo = ?)',
		      		value: [articulos, req.body.posicionI1, req.body.item1]
		      },
		      'ori_bodega': {
		      		string: '(SELECT fk_bodega from ?? WHERE fk_puesto = ? AND fk_tipo = ?)',
		      		value: [articulos, req.body.posicionI1, req.body.item1]
		      },
		      'ori_posicion': {
		      		string: '(SELECT fk_puesto from ?? WHERE fk_puesto = ? AND fk_tipo = ?)',
		      		value: [articulos, req.body.posicionI1, req.body.item1]
		      },
		      'ori_campaña': {
		      		string: '(SELECT fk_campaign from ?? WHERE fk_puesto = ? AND fk_tipo = ?)',
		      		value: [articulos, req.body.posicionI1, req.body.item1]
		      },
		      'ticket': req.body.ticket ,
		      'fecha_mov': fechaA ,
		      'fk_usuario': usuario ,
		      'fk_articulos': {
		      	string: '(SELECT id_articulos from ?? WHERE fk_puesto = ? AND fk_tipo = ?)',
		      		value: [articulos, req.body.posicionI1, req.body.item1]
		      }
		    },
		  ]
		})
		console.log(req.body.item1)
		console.log(req.body.posicionI1)
		console.log(req.body.posicionF1)

		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		db.query(Query.next(), function(err, rows, fields){
			if(err) {
				res.render('newmovmodal', {title: 'Error!', info: 'Se produjo un error al ingresar el movimiento!', error: err})
				console.log(err)//throw err
			}
			else{
				res.render('newmovmodal', {title: 'Exito!', info: 'Movimiento Registrado con Correctamente!'})	
			}
			db.end()
		})
	}
}