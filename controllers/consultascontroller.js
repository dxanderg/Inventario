var mysql = require('mysql')

module.exports = {

	consultas : function(req, res, next){
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		var consulta1 = null

		db.query(`SELECT s.nombre_sede, b.nombre_bodega, p.posicion, c.nombre_campaign, f.nombre_fabricante, i.nombre_item, i.modelo_item, a.serial_art, a.plaqueta_art
							FROM articulos a
							JOIN bodegas b ON a.fk_bodega = b.id_bodega
							JOIN sedes s ON a.fk_sede = s.id_sede 
							JOIN puestos p ON a.fk_puesto = p.id_puesto
							JOIN campaign c ON a.fk_campaign = c.id_campaign
							JOIN fabricante f ON a.fk_fabricante = f.id_fabricante
							JOIN items i ON a.fk_items = i.id_item`, function(err, rows, fields){
			if(err) throw err
			consulta1 = rows
			db.end()
		res.render('Consultas', {consulta1 : consulta1})
		})
	}
}