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
		fechaN1 = req.params.id_fechaI
		fechaN2 = req.params.id_fechaF
		var params = [fechaN1, fechaN2]

		db.query(`SELECT m.id_movimiento, m.ori_puestoId, s.nombre_sede AS nombre_sede_I, b.nombre_bodega as nombre_bodega_I, p.posicion as posicion_I, m.ori_campana, c.nombre_campaign, m.dest_puestoId, k.nombre_sede as nombre_sede_D, j.nombre_bodega as nombre_bodega_D, l.posicion as posicion_D, m.ticket, m.fecha_mov, m.fk_usuario, u.nombre_mostrar, m.fk_estados, e.nombre_estado, m.fk_articulos, i.nombre_item, I.modelo_item, m.plaqueta, m.serial  
							FROM movimientos as m
							JOIN campaign c ON c.id_campaign = m.ori_campana
							JOIN estados e on e.id_estados = m.fk_estados
							JOIN puestos p ON p.id_puesto = m.ori_puestoId
							JOIN bodegas b ON b.id_bodega = p.fk_bodega
							JOIN sedes s ON s.id_sede = p.fk_sede
							JOIN usuarios u ON u.id_usuario = m.fk_usuario
							JOIN articulos a ON a.id_articulos = m.fk_articulos
							JOIN items i ON i.id_item = a.fk_items
							JOIN puestos l on l.id_puesto = m.dest_puestoId
							JOIN bodegas j ON j.id_bodega = l.fk_bodega
							JOIN sedes k ON k.id_sede = j.fk_sede
							WHERE fecha_mov between ? AND ?
							ORDER by ticket`, params, function(err, rows, fields){
			if(err) throw err
			consulta1 = rows
			db.end()
			res.send({ data : consulta1})
		})
	}
}
