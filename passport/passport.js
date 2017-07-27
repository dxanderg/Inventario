var localStrategy = require('passport-local').Strategy
var mysql = require('mysql')
var bcrypt = require('bcryptjs')

module.exports = function(passport){
	passport.serializeUser(function(user, done){
		done(null, user)
	})

	passport.deserializeUser(function(obj, done){
		done(null, obj)
	})

	passport.use(new localStrategy({
		passReqToCallback : true
	}, function(req, username, password, done){

		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		db.query('SELECT * FROM usuarios WHERE nombre_usuario = ?', username, function(err, rows, fields){
			if(err) throw err

			db.end()

			if(rows.length > 0){
				var user = rows[0]
				if(bcrypt.compareSync(password, user.pass_usuario)){
					return done(null, {
						id: user.id_usuario,
						usuario: user.nombre_usuario,
						nombre: user.nombre_mostrar,
						cargo: user.cargo_usuario,
						sede: user.fk_sede,
						campaña: user.fk_campaign,
						perfil: user.perfil_usuario
					})	
				}
			}
			return done(null, false, req.flash('authmessage', 'Usuario o Password Incorrectos'))
		})

	}))
}