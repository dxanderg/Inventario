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
		  maxRow: 10,
		  data: [
		    {
		      'dest_sede' : { string: '(SELECT fk_sede from ?? WHERE id_puesto = ?)', value: [puestos, req.body.posicionF1] },
		      'dest_bodega': { string: '(SELECT fk_bodega from ?? WHERE id_puesto = ?)', value: [puestos, req.body.posicionF1] },
		      'dest_posicion': { string: '(SELECT id_puesto from ?? WHERE id_puesto = ?)', value: [puestos, req.body.posicionF1] },
		      'dest_campaña': { string: '(SELECT fk_campaign from ?? WHERE id_puesto = ?)', value: [puestos, req.body.posicionF1] },
		      'ori_sede': { string: '(SELECT fk_sede from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI1, req.body.item1] },
		      'ori_bodega': { string: '(SELECT fk_bodega from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI1, req.body.item1] },
		      'ori_posicion': { string: '(SELECT fk_puesto from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI1, req.body.item1] },
		      'ori_campaña': { string: '(SELECT fk_campaign from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI1, req.body.item1] },
					'ticket': req.body.ticket ,
		      'fecha_mov': fechaA ,
		      'fk_usuario': usuario ,
		      'fk_articulos': { string: '(SELECT id_articulos from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI1, req.body.item1] }
		    },
		    {
		      'dest_sede' : { string: '(SELECT fk_sede from ?? WHERE id_puesto = ?)', value: [puestos, req.body.posicionF2] },
		      'dest_bodega': { string: '(SELECT fk_bodega from ?? WHERE id_puesto = ?)', value: [puestos, req.body.posicionF2] },
		      'dest_posicion': { string: '(SELECT id_puesto from ?? WHERE id_puesto = ?)', value: [puestos, req.body.posicionF2] },
		      'dest_campaña': { string: '(SELECT fk_campaign from ?? WHERE id_puesto = ?)', value: [puestos, req.body.posicionF2] },
		      'ori_sede': { string: '(SELECT fk_sede from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI2, req.body.item2] },
		      'ori_bodega': { string: '(SELECT fk_bodega from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI2, req.body.item2] },
		      'ori_posicion': { string: '(SELECT fk_puesto from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI2, req.body.item2] },
		      'ori_campaña': { string: '(SELECT fk_campaign from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI2, req.body.item2] },
					'ticket': req.body.ticket ,
		      'fecha_mov': fechaA ,
		      'fk_usuario': usuario ,
		      'fk_articulos': { string: '(SELECT id_articulos from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI2, req.body.item2] }
		    },
		    {
		      'dest_sede' : { string: '(SELECT fk_sede from ?? WHERE id_puesto = ?)', value: [puestos, req.body.posicionF3] },
		      'dest_bodega': { string: '(SELECT fk_bodega from ?? WHERE id_puesto = ?)', value: [puestos, req.body.posicionF3] },
		      'dest_posicion': { string: '(SELECT id_puesto from ?? WHERE id_puesto = ?)', value: [puestos, req.body.posicionF3] },
		      'dest_campaña': { string: '(SELECT fk_campaign from ?? WHERE id_puesto = ?)', value: [puestos, req.body.posicionF3] },
		      'ori_sede': { string: '(SELECT fk_sede from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI3, req.body.item3] },
		      'ori_bodega': { string: '(SELECT fk_bodega from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI3, req.body.item3] },
		      'ori_posicion': { string: '(SELECT fk_puesto from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI3, req.body.item3] },
		      'ori_campaña': { string: '(SELECT fk_campaign from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI3, req.body.item3] },
					'ticket': req.body.ticket ,
		      'fecha_mov': fechaA ,
		      'fk_usuario': usuario ,
		      'fk_articulos': { string: '(SELECT id_articulos from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI3, req.body.item3] }
		    },
		    {
		      'dest_sede' : { string: '(SELECT fk_sede from ?? WHERE id_puesto = ?)', value: [puestos, req.body.posicionF4] },
		      'dest_bodega': { string: '(SELECT fk_bodega from ?? WHERE id_puesto = ?)', value: [puestos, req.body.posicionF4] },
		      'dest_posicion': { string: '(SELECT id_puesto from ?? WHERE id_puesto = ?)', value: [puestos, req.body.posicionF4] },
		      'dest_campaña': { string: '(SELECT fk_campaign from ?? WHERE id_puesto = ?)', value: [puestos, req.body.posicionF4] },
		      'ori_sede': { string: '(SELECT fk_sede from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI4, req.body.item4] },
		      'ori_bodega': { string: '(SELECT fk_bodega from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI4, req.body.item4] },
		      'ori_posicion': { string: '(SELECT fk_puesto from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI4, req.body.item4] },
		      'ori_campaña': { string: '(SELECT fk_campaign from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI4, req.body.item4] },
					'ticket': req.body.ticket ,
		      'fecha_mov': fechaA ,
		      'fk_usuario': usuario ,
		      'fk_articulos': { string: '(SELECT id_articulos from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI4, req.body.item4] }
		    },
		    {
		      'dest_sede' : { string: '(SELECT fk_sede from ?? WHERE id_puesto = ?)', value: [puestos, req.body.posicionF5] },
		      'dest_bodega': { string: '(SELECT fk_bodega from ?? WHERE id_puesto = ?)', value: [puestos, req.body.posicionF5] },
		      'dest_posicion': { string: '(SELECT id_puesto from ?? WHERE id_puesto = ?)', value: [puestos, req.body.posicionF5] },
		      'dest_campaña': { string: '(SELECT fk_campaign from ?? WHERE id_puesto = ?)', value: [puestos, req.body.posicionF5] },
		      'ori_sede': { string: '(SELECT fk_sede from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI5, req.body.item5] },
		      'ori_bodega': { string: '(SELECT fk_bodega from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI5, req.body.item5] },
		      'ori_posicion': { string: '(SELECT fk_puesto from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI5, req.body.item5] },
		      'ori_campaña': { string: '(SELECT fk_campaign from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI5, req.body.item5] },
					'ticket': req.body.ticket ,
		      'fecha_mov': fechaA ,
		      'fk_usuario': usuario ,
		      'fk_articulos': { string: '(SELECT id_articulos from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI5, req.body.item5] }
		    },
		    {
		      'dest_sede' : { string: '(SELECT fk_sede from ?? WHERE id_puesto = ?)', value: [puestos, req.body.posicionF6] },
		      'dest_bodega': { string: '(SELECT fk_bodega from ?? WHERE id_puesto = ?)', value: [puestos, req.body.posicionF6] },
		      'dest_posicion': { string: '(SELECT id_puesto from ?? WHERE id_puesto = ?)', value: [puestos, req.body.posicionF6] },
		      'dest_campaña': { string: '(SELECT fk_campaign from ?? WHERE id_puesto = ?)', value: [puestos, req.body.posicionF6] },
		      'ori_sede': { string: '(SELECT fk_sede from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI6, req.body.item6] },
		      'ori_bodega': { string: '(SELECT fk_bodega from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI6, req.body.item6] },
		      'ori_posicion': { string: '(SELECT fk_puesto from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI6, req.body.item6] },
		      'ori_campaña': { string: '(SELECT fk_campaign from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI6, req.body.item6] },
					'ticket': req.body.ticket ,
		      'fecha_mov': fechaA ,
		      'fk_usuario': usuario ,
		      'fk_articulos': { string: '(SELECT id_articulos from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI6, req.body.item6] }
		    },
		    {
		      'dest_sede' : { string: '(SELECT fk_sede from ?? WHERE id_puesto = ?)', value: [puestos, req.body.posicionF7] },
		      'dest_bodega': { string: '(SELECT fk_bodega from ?? WHERE id_puesto = ?)', value: [puestos, req.body.posicionF7] },
		      'dest_posicion': { string: '(SELECT id_puesto from ?? WHERE id_puesto = ?)', value: [puestos, req.body.posicionF7] },
		      'dest_campaña': { string: '(SELECT fk_campaign from ?? WHERE id_puesto = ?)', value: [puestos, req.body.posicionF7] },
		      'ori_sede': { string: '(SELECT fk_sede from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI7, req.body.item7] },
		      'ori_bodega': { string: '(SELECT fk_bodega from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI7, req.body.item7] },
		      'ori_posicion': { string: '(SELECT fk_puesto from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI7, req.body.item7] },
		      'ori_campaña': { string: '(SELECT fk_campaign from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI7, req.body.item7] },
					'ticket': req.body.ticket ,
		      'fecha_mov': fechaA ,
		      'fk_usuario': usuario ,
		      'fk_articulos': { string: '(SELECT id_articulos from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI7, req.body.item7] }
		    },
		    {
		      'dest_sede' : { string: '(SELECT fk_sede from ?? WHERE id_puesto = ?)', value: [puestos, req.body.posicionF8] },
		      'dest_bodega': { string: '(SELECT fk_bodega from ?? WHERE id_puesto = ?)', value: [puestos, req.body.posicionF8] },
		      'dest_posicion': { string: '(SELECT id_puesto from ?? WHERE id_puesto = ?)', value: [puestos, req.body.posicionF8] },
		      'dest_campaña': { string: '(SELECT fk_campaign from ?? WHERE id_puesto = ?)', value: [puestos, req.body.posicionF8] },
		      'ori_sede': { string: '(SELECT fk_sede from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI8, req.body.item8] },
		      'ori_bodega': { string: '(SELECT fk_bodega from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI8, req.body.item8] },
		      'ori_posicion': { string: '(SELECT fk_puesto from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI8, req.body.item8] },
		      'ori_campaña': { string: '(SELECT fk_campaign from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI8, req.body.item8] },
					'ticket': req.body.ticket ,
		      'fecha_mov': fechaA ,
		      'fk_usuario': usuario ,
		      'fk_articulos': { string: '(SELECT id_articulos from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI8, req.body.item8] }
		    },
		    {
		      'dest_sede' : { string: '(SELECT fk_sede from ?? WHERE id_puesto = ?)', value: [puestos, req.body.posicionF9] },
		      'dest_bodega': { string: '(SELECT fk_bodega from ?? WHERE id_puesto = ?)', value: [puestos, req.body.posicionF9] },
		      'dest_posicion': { string: '(SELECT id_puesto from ?? WHERE id_puesto = ?)', value: [puestos, req.body.posicionF9] },
		      'dest_campaña': { string: '(SELECT fk_campaign from ?? WHERE id_puesto = ?)', value: [puestos, req.body.posicionF9] },
		      'ori_sede': { string: '(SELECT fk_sede from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI9, req.body.item9] },
		      'ori_bodega': { string: '(SELECT fk_bodega from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI9, req.body.item9] },
		      'ori_posicion': { string: '(SELECT fk_puesto from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI9, req.body.item9] },
		      'ori_campaña': { string: '(SELECT fk_campaign from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI9, req.body.item9] },
					'ticket': req.body.ticket ,
		      'fecha_mov': fechaA ,
		      'fk_usuario': usuario ,
		      'fk_articulos': { string: '(SELECT id_articulos from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI9, req.body.item9] }
		    },
		    {
		      'dest_sede' : { string: '(SELECT fk_sede from ?? WHERE id_puesto = ?)', value: [puestos, req.body.posicionF10] },
		      'dest_bodega': { string: '(SELECT fk_bodega from ?? WHERE id_puesto = ?)', value: [puestos, req.body.posicionF10] },
		      'dest_posicion': { string: '(SELECT id_puesto from ?? WHERE id_puesto = ?)', value: [puestos, req.body.posicionF10] },
		      'dest_campaña': { string: '(SELECT fk_campaign from ?? WHERE id_puesto = ?)', value: [puestos, req.body.posicionF10] },
		      'ori_sede': { string: '(SELECT fk_sede from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI10, req.body.item10] },
		      'ori_bodega': { string: '(SELECT fk_bodega from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI10, req.body.item10] },
		      'ori_posicion': { string: '(SELECT fk_puesto from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI10, req.body.item10] },
		      'ori_campaña': { string: '(SELECT fk_campaign from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI10, req.body.item10] },
					'ticket': req.body.ticket ,
		      'fecha_mov': fechaA ,
		      'fk_usuario': usuario ,
		      'fk_articulos': { string: '(SELECT id_articulos from ?? WHERE fk_puesto = ? AND fk_tipo = ?)', value: [articulos, req.body.posicionI10, req.body.item10] }
		    }
		  ]
		})
		console.log(req.body.item1)
		console.log(req.body.posicionI1)
		console.log(req.body.posicionF1)
		console.log("/////////////////////////////")
		console.log(req.body.item2)
		console.log(req.body.posicionI2)
		console.log(req.body.posicionF2)
		console.log("/////////////////////////////")
		console.log(req.body.item3)
		console.log(req.body.posicionI3)
		console.log(req.body.posicionF3)
		console.log("/////////////////////////////")
		console.log(req.body.item4)
		console.log(req.body.posicionI4)
		console.log(req.body.posicionF4)
		console.log("/////////////////////////////")
		console.log(req.body.item5)
		console.log(req.body.posicionI5)
		console.log(req.body.posicionF5)
		console.log("/////////////////////////////")
		console.log(req.body.item6)
		console.log(req.body.posicionI6)
		console.log(req.body.posicionF6)
		console.log("/////////////////////////////")
		console.log(req.body.item7)
		console.log(req.body.posicionI7)
		console.log(req.body.posicionF7)
		console.log("/////////////////////////////")
		console.log(req.body.item8)
		console.log(req.body.posicionI8)
		console.log(req.body.posicionF8)
		console.log("/////////////////////////////")
		console.log(req.body.item9)
		console.log(req.body.posicionI9)
		console.log(req.body.posicionF9)
		console.log("/////////////////////////////")
		console.log(req.body.item10)
		console.log(req.body.posicionI10)
		console.log(req.body.posicionF10)

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