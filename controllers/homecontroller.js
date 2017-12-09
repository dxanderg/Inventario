var mysql = require('mysql')
var async = require('async')
var _ = require('lodash')

module.exports = {

	index : function(req, res, next){
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		var sedes = null
		var data = null
		var data2 = null
		var consulta1 = null
		var consulta2 = null
		var userSede = res.locals.currentuser.sede
		var userCampana = res.locals.currentuser.campana

		async.parallel([
  		function(callback) { db.query('select c.nombre_campaign, count(puestos.id_puesto) as puestos from puestos join campaign c ON puestos.fk_campaign = c.id_campaign  where puestos.fk_sede = ? group by fk_campaign order by puestos DESC', userSede, function(err, rows, fields){
					if(err) throw err
					sedes = rows

					data = _.map(rows, function(n) { //here using lodash
						return [`'` + n.nombre_campaign + `': ` + n.puestos];
			    })
			    data2 = data
					callback()
	      })
  		},
  		function(callback) { db.query(`SELECT * FROM sedes order by nombre_sede`, function(err, rows, fields){
					if(err) throw err
					consulta1 = rows
					callback()
	      })
  		},
  		function(callback) { db.query(`select c.nombre_campaign, count(puestos.id_puesto) as puestos from puestos join campaign c ON puestos.fk_campaign = c.id_campaign  group by fk_campaign order by puestos DESC`,  function(err, rows, fields){
					if(err) throw err
					consulta2 = rows
					db.end()
					callback()
	      })
		}], function(err, results) {
			res.render('index', {
				datos : data,
				datos2 : data2,
				// isAuthenticated: req.isAuthenticated(),
				user: req.user,
				consulta1 : consulta1,
				consulta2 : consulta2
			})
		})
	},

	apiChart : function(req, res, next){
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		var id = req.params.id_sede
		var dataNew = null
		var consulta1 = null

		db.query('select c.nombre_campaign, count(puestos.id_puesto) as puestos from puestos join campaign c ON puestos.fk_campaign = c.id_campaign  where puestos.fk_sede = ? group by fk_campaign order by puestos DESC', id, function(err, rows, fields){
			if(err) throw err

			dataNew = _.map(rows, function(n) { //here using lodash
				return [`'` + n.nombre_campaign + `': ` + n.puestos];
			})

			consulta1 = dataNew
			db.end()
		res.send({ data : consulta1})
		})
	},

	notificaciones : function(req, res, next){
		res.render('notificaciones')
	}
}