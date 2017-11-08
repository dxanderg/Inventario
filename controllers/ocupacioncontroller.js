var mysql = require('mysql')
var async = require('async')
var dateFormat = require('dateFormat')

module.exports = {

	ocupacion : function(req, res, next){
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		var consulta1 = null
		var userSede = res.locals.currentuser.sede
		var userCampana = res.locals.currentuser.campaña

		db.query(`SELECT p.fk_sede, s.nombre_sede, p.fk_bodega, b.nombre_bodega, p.id_puesto, p.posicion, p.fk_campaign, c.CECO, c.nombre_campaign FROM puestos as p
							join sedes as s on p.fk_sede = s.id_sede
							join bodegas as b on p.fk_bodega = b.id_bodega
							join campaign as c on p.fk_campaign = c.id_campaign
							where s.id_sede = ?
							order by b.nombre_bodega, p.posicion`, userSede, function(err, rows, fields){
			if(err) throw err
			consulta1 = rows
			db.end()
		res.render('Ocupacion', {consulta1 : consulta1})
		})
	}
}
