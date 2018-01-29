var mysql = require('mysql')
var async = require('async')
var _ = require('lodash')

module.exports = {

	index : function(req, res, next){
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		var dataCard1 = null
		var dataCard2 = null
		var data = null
		var data2 = null
		var consulta1 = null
		var consulta2 = null
		var userSede = res.locals.currentuser.sede
		var userCampana = res.locals.currentuser.campana

		async.parallel([
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
		var dataNew2 = null

		async.parallel([
			function(callback) { db.query('select c.nombre_campaign, count(puestos.id_puesto) as puestos from puestos join campaign c ON puestos.fk_campaign = c.id_campaign  where puestos.fk_sede = ? group by fk_campaign order by puestos DESC', id, function(err, rows, fields){
					if(err) throw err		

					dataNew = _.map(rows, function(n) { //here using lodash
						return [`'` + n.nombre_campaign + `': ` + n.puestos];
			    })
					callback()
	      })
			},
			function(callback) { db.query(`SELECT t.nombre_item, COUNT(t.nombre_item) AS items FROM articulos a
																			JOIN tipo_item t ON a.fk_tipo = t.idtipo_item
																			JOIN ocupacion  o ON o.fk_id_articulos = a.id_articulos
																			JOIN puestos p ON p.id_puesto = o.fk_id_puesto
																			JOIN sedes s ON s.id_sede = p.fk_sede
																			WHERE s.id_sede = ?
																			GROUP BY t.nombre_item
																			ORDER BY items DESC`, id, function(err, rows, fields){
					if(err) throw err

					dataNew2 = _.map(rows, function(n) { //here using lodash
						return [`'` + n.nombre_item + `': ` + n.items];
			    })
					callback()
	      })
			}], function(err, results) {
					db.end()
				res.send({ data : dataNew, data2 : dataNew2})
			})
	}
}