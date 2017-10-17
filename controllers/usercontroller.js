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

		var user = {
			nombre_usuario: req.body.usuario,
			cargo_usuario: req.body.cargo,
			fk_sede: req.body.sede,
			fk_campaign: req.body.campaign,
			nombre_mostrar: req.body.nombre,
			perfil_usuario: req.body.perfil
		}

		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		db.query('INSERT INTO usuarios SET ?', user, function(err, row, fields){
			if(err) throw err
			db.end()
		})
		req.flash('info', 'Se ha registrado correctamente, ya puede ingresar') ///{message: req.flash('info')}
		return res.redirect('/')
	},

	getSignIn: function(req, res, next){
		return res.render('users/signin')
	},

	logout: function(req, res, next){
		req.logout(),
		res.redirect('/auth/signin')
	}

}