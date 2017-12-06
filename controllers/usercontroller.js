var mysql = require('mysql')
var async = require('async')
var bcrypt = require('bcryptjs')

module.exports = {

	getSignUp: function(req, res, next){
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		var consulta0 = null
		var consulta1 = null

		async.parallel([
			function(callback) { db.query(`SELECT * FROM sedes
																		ORDER BY nombre_sede`, function(err, rows, fields){
					if(err) throw err
					consulta0 = rows
					callback()
	      })
  		},
  		function(callback) { db.query(`SELECT * FROM campaign
  																	ORDER BY nombre_campaign`, function(err, rows, fields){
					if(err) throw err
					consulta1 = rows
					callback()
	      })
		}], function(err, results) {
  		return res.render('users/Signup', {consulta0 : consulta0, consulta1 : consulta1})
		})
	},

	postSignUp: function(req, res, next){

		var nombrePerfil = null
		if (req.body.perfil == 1){ nombrePerfil = 'Administrador' }
		if (req.body.perfil == 2){ nombrePerfil = 'Responsable Sede' }
		if (req.body.perfil == 3){ nombrePerfil = 'Responsable Campaña' }
		if (req.body.perfil == 4){ nombrePerfil = 'Consultas' }

		var user = {
			nombre_usuario: req.body.usuario,
			cargo_usuario: req.body.cargo,
			fk_sede: req.body.sede,
			fk_campaign: req.body.campaign,
			nombre_mostrar: req.body.nombre,
			perfil_usuario: req.body.perfil,
			nombre_perfil: nombrePerfil
		}

		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		db.query('INSERT INTO usuarios SET ?', user, function(err, row, fields){
			// if(err) throw err
			if (err){
				res.render('error', {title: 'Error!', info: 'Se produjo un error al ingresar el articulo!', error: err})
			}
			else {
				return res.redirect('/')
			}
			db.end()
		})		
	},

	editUsuarios : function(req, res, next){
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()
		var consulta1 = null

		db.query(`SELECT u.id_usuario, u.nombre_usuario, u.cargo_usuario, u.fk_sede, s.nombre_sede, u.fk_campaign, c.nombre_campaign, u.nombre_mostrar, u.perfil_usuario, u.nombre_perfil FROM usuarios u
							JOIN sedes s ON s.id_sede = u.fk_sede
							JOIN campaign c ON c.id_campaign = u.fk_campaign
							ORDER BY u.nombre_mostrar`, function(err, rows, fields){
			if(err) throw err
			consulta1 = rows
			db.end()
		res.render('users/listaUsuarios', {consulta1 : consulta1})
		})
	},

	modificarUser : function(req, res, next){
		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()
		var consulta1 = null
		var consulta2 = null
		var consulta3 = null
		var consulta4 = null

		async.parallel([
			function(callback) { db.query(`SELECT u.id_usuario, u.nombre_usuario, u.cargo_usuario, u.fk_sede, s.nombre_sede, u.fk_campaign, c.nombre_campaign, u.nombre_mostrar, u.perfil_usuario, u.nombre_perfil 
							FROM usuarios u
							JOIN sedes s ON s.id_sede = u.fk_sede
							JOIN campaign c ON c.id_campaign = u.fk_campaign
							WHERE u.id_usuario = ?`, req.params.id_usuario, function(err, rows, fields){
					if(err) throw err
					consulta1 = rows
					callback()
	      })
  		},
  		function(callback) { db.query(`SELECT * FROM campaign ORDER BY nombre_campaign`, function(err, rows, fields){
					if(err) throw err
					consulta2 = rows
					callback()
	      })
  		},
  		function(callback) { db.query(`SELECT * FROM sedes ORDER BY nombre_sede`, function(err, rows, fields){
					if(err) throw err
					consulta3 = rows
					callback()
	      })
  		},
  		function(callback) { db.query(`SELECT perfil_usuario, nombre_perfil FROM inventario_digitex.usuarios
									GROUP BY nombre_perfil
									ORDER BY nombre_perfil`, function(err, rows, fields){
					if(err) throw err
					consulta4 = rows
					callback()
	      })
		}], function(err, results) {
			db.end()
			res.render('users/modificarUsuario', {consulta1 : consulta1, consulta2 : consulta2, consulta3 : consulta3, consulta4 : consulta4})
		})	
	},

	postEdit: function(req, res, next){

		var nombrePerfil = null
		if (req.body.perfil == 1){ nombrePerfil = 'Administrador' }
		if (req.body.perfil == 2){ nombrePerfil = 'Responsable Sede' }
		if (req.body.perfil == 3){ nombrePerfil = 'Responsable Campaña' }
		if (req.body.perfil == 4){ nombrePerfil = 'Consultas' }

		var user = {
			nombre_usuario: req.body.usuario,
			cargo_usuario: req.body.cargo,
			fk_sede: req.body.sede,
			fk_campaign: req.body.campaign,
			nombre_mostrar: req.body.nombre,
			perfil_usuario: req.body.perfil,
			nombre_perfil: nombrePerfil
		}

		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		db.query('UPDATE usuarios SET ? WHERE ? ', [user, {id_usuario : req.body.userId}], function(err, rows, fields){
			if(err) throw err
			db.end()
			res.redirect('/EditUsers')

			// if (err){
			// 	res.render('error', {title: 'Error!', info: 'Se produjo un error al ingresar el articulo!', error: err})
			// }
			// else {
			// 	return res.redirect('/')
			// }
			// db.end()
		})		
	},

}