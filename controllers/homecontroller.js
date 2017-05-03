var mysql = require('mysql')

module.exports = {

	index : function(req, res, next){
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		var sedes = null

		db.query('SELECT * from sedes', function(err, rows, fields){
			if(err) throw err
			sedes = rows
			db.end()
		res.render('index', {sedes : sedes})
		})
	},

	ingresos : function(req, res, next){
		res.render('ingresos')
	},

	// traslados : function(req, res, next){
	// 	res.render('traslados')
	// },

	// consultas : function(req, res, next){
	// 	res.render('consultas')
	// },

	notificaciones : function(req, res, next){
		res.render('notificaciones')
	}
}