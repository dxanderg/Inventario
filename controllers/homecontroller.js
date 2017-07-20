var mysql = require('mysql')
var _ = require('lodash')

module.exports = {

	index : function(req, res, next){
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		var sedes = null

		db.query('select b.nombre_bodega, count(puestos.id_puesto) as puestos from puestos join bodegas b ON puestos.fk_bodega = b.id_bodega group by fk_bodega', function(err, rows, fields){
			if(err) throw err
			sedes = rows
			var data = []
			var player = [];
			var score = [];

			for(var i in sedes) {
				player.push("Player " + sedes[i].nombre_bodega);
				score.push(sedes[i].puestos);
			}
			var chartdata = {
				labels: player,
				datasets : [
					{
						label: 'Player Score',
						backgroundColor: 'rgba(200, 200, 200, 0.75)',
						borderColor: 'rgba(200, 200, 200, 0.75)',
						hoverBackgroundColor: 'rgba(200, 200, 200, 1)',
						hoverBorderColor: 'rgba(200, 200, 200, 1)',
						data: score
					}
				]
			};

     // var data = _.map(rows, function(n) { //here using lodash
     //     return [`[{nombre:"` + n.nombre_bodega + `", cantidad:"` + n.puestos + `"}]`];
     // })
			db.end()
		res.render('index', {sedes : data, datos : JSON.stringify(sedes), joder : JSON.stringify(chartdata)})
		
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