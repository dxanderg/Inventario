var mysql = require('mysql')
var async = require('async')
var dateFormat = require('dateFormat')

module.exports = {

	index : function(req, res, next){
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		var consulta1 = null
		var userSede = res.locals.currentuser.sede
		var userCampana = res.locals.currentuser.campaña

		db.query(`SELECT a.id_articulos, a.fk_items, f.nombre_fabricante, i.nombre_item, i.modelo_item, a.serial_art, a.plaqueta_art, e.id_estados, e.nombre_estado, s.id_sede, s.nombre_sede, b.id_bodega, b.nombre_bodega, p.id_puesto, p.posicion, c.id_campaign, c.nombre_campaign
							FROM articulos a, fabricante f, items i, estados e, sedes s, bodegas b, puestos p, campaign c, ocupacion o
							WHERE o.fk_id_articulos = a.id_articulos
							AND o.fk_id_puesto = p.id_puesto 
							AND f.id_fabricante = i.fk_fabricante 
							AND a.fk_items = i.id_item
							AND p.fk_campaign = c.id_campaign
							AND p.fk_bodega = b.id_bodega
							AND p.fk_sede = s.id_sede
							AND a.activo = e.id_estados
							AND id_sede = ?
							ORDER BY b.nombre_bodega, p.posicion, i.nombre_item, f.nombre_fabricante ASC`, userSede, function(err, rows, fields){
			if(err) throw err
			consulta1 = rows
			db.end()
		res.render('admin/index', {consulta1 : consulta1})
		})
	}
}
