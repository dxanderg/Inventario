var mysql = require('mysql')
var async = require('async')
var dateFormat = require('dateFormat')

module.exports = {

	ocupacion : function(req, res, next){
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		var consulta1 = null
		var consulta2 = null
		var userSede = res.locals.currentuser.sede
		var userCampana = res.locals.currentuser.campaña
		var userCiudad = res.locals.currentuser.ciudad
		var mensaje = null
		if (req.session.flash != undefined){
			mensaje = req.session.flash
		}
		
		db.query(`SELECT p.fk_sede, s.nombre_sede, p.fk_bodega, b.nombre_bodega, p.id_puesto, p.posicion, p.fk_campaign, c.CECO, c.nombre_campaign FROM puestos as p
							join sedes as s on p.fk_sede = s.id_sede
							join bodegas as b on p.fk_bodega = b.id_bodega
							join campaign as c on p.fk_campaign = c.id_campaign
							where s.ciudad_sede = ?
							order by b.nombre_bodega, p.posicion`, userCiudad, function(err, rows, fields){
			if(err) throw err
			consulta1 = rows
			db.end()
		res.render('Ocupacion', {consulta1 : consulta1, msg : mensaje})
		})
	},
	apiOcupacion : function(req, res, next){
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		var id = req.params.id_puesto
		var consulta1 = null
		var consulta2 = null

		async.parallel([
			function(callback) { db.query(`SELECT p.fk_sede, s.nombre_sede, p.fk_bodega, b.nombre_bodega, p.id_puesto, p.posicion, p.fk_campaign, c.CECO, c.nombre_campaign FROM puestos as p
		 					join sedes as s on p.fk_sede = s.id_sede
		 					join bodegas as b on p.fk_bodega = b.id_bodega
		 					join campaign as c on p.fk_campaign = c.id_campaign
		 					where p.id_puesto = ?
		 					order by b.nombre_bodega, p.posicion`, id, function(err, rows, fields){
					if(err) throw err
					consulta1 = rows
					callback()
	      })
  		},
  		function(callback) { db.query(`SELECT id_campaign, CECO, nombre_campaign FROM campaign ORDER BY nombre_campaign`, function(err, rows, fields){
					if(err) throw err
					consulta2 = rows
					callback()
	      })
  		}], function(err, results) {
  			db.end()
  			res.send({ data : consulta1, data2 : consulta2})
		})
	},
	postActuaOcupacion : function(req, res, next){
		var fechaActual = new Date()
		var fechaA = dateFormat(fechaActual, 'yyyy-mm-dd')

		var ocupacionEdit = {
			fk_campaign : req.body.selectCampa,
			fecha_puestos : fechaA
		}

		
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		var respuesta = {res: false}
		db.connect()

		db.query('UPDATE puestos SET ? WHERE ? ', [ocupacionEdit, {id_puesto : req.body.idPuesto}], function(err, rows, fields){
			if(err) {
				req.flash('info', 'Error! Se produjo un error al modificar la ocupacion!')
				res.redirect('/Ocupacion')
			}
			else{
				req.flash('info', 'Exito! Se modificó la ocupacion correctamente!')
				res.redirect('/Ocupacion')
			}
			db.end()
		})
	}
}
