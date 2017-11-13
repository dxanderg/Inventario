var mysql = require('mysql')
var async = require('async')
var dateFormat = require('dateFormat')

module.exports = {

	apiMovimientos : function(req, res, next){
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		var fecha1 = null
		var fecha2 = null
		fecha1 = req.params.id_fechaI,
		fecha2 = req.params.id_fechaF

		db.query(`SELECT m.id_movimiento, m.ori_puestoId, s.nombre_sede, b.nombre_bodega, p.posicion, m.ori_campana, m.dest_puestoId, k.nombre_sede, j.nombre_bodega, l.posicion, m.ticket, m.fecha_mov, m.fk_usuario, u.nombre_mostrar, m.fk_estados, m.fk_articulos, i.nombre_item, I.modelo_item, m.plaqueta, m.serial  
							FROM movimientos as m
							JOIN puestos p ON p.id_puesto = m.ori_puestoId
							JOIN bodegas b ON b.id_bodega = p.fk_bodega
							JOIN sedes s ON s.id_sede = p.fk_sede
							JOIN usuarios u ON u.id_usuario = m.fk_usuario
							JOIN articulos a ON a.id_articulos = m.fk_articulos
							JOIN items i ON i.id_item = a.fk_items
							JOIN puestos l on l.id_puesto = m.dest_puestoId
							JOIN bodegas j ON j.id_bodega = l.fk_bodega
							JOIN sedes k ON k.id_sede = j.fk_sede
							ORDER by ticket
							WHERE fecha_mov between ? AND ??`, ['2017-01-01', '2017-12-01'], function(err, rows, fields){
								console.log(this)
			if(err) throw err
			consulta1 = rows
			db.end()
			res.send({ data : consulta1})
		})
	}
}
