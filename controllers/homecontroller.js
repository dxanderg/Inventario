var mysql = require('mysql')
var _ = require('lodash')

module.exports = {

	index : function(req, res, next){
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		var sedes = null

		db.query('select c.nombre_campaign, count(puestos.id_puesto) as puestos from puestos join campaign c ON puestos.fk_campaign = c.id_campaign group by fk_campaign order by puestos DESC', function(err, rows, fields){
			if(err) throw err
			sedes = rows

			var data = _.map(rows, function(n) { //here using lodash
				return [`'` + n.nombre_campaign + `': ` + n.puestos];
	    })

			db.end()

			res.render('index', {
				sedes : sedes, 
				datos : data,
				isAuthenticated: req.isAuthenticated(),
				user: req.user
			})
		})
	},

	ingresos : function(req, res, next){
		res.render('ingresos')
	},

	notificaciones : function(req, res, next){
		res.render('notificaciones')
	}
}