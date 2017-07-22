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

			var data = []
			var player = [];
			var score = [];

			for(var i in sedes) {
				player.push(sedes[i].nombre_campaign);
				score.push(sedes[i].puestos);
			}
			var chartdata = {
				labels: player,
				data: score
			};

     var data = _.map(rows, function(n) { //here using lodash
         return [`'` + n.nombre_campaign + `': ` + n.puestos];
     })
			db.end()
		res.render('index', {sedes : sedes, datos : JSON.stringify(chartdata), chartdata: data})
		
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