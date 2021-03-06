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

		var str = req.connection.user
		console.log(str)

		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		db.query(`SELECT u.id_usuario, u.nombre_usuario, u.pass_usuario, u.nombre_mostrar, u.cargo_usuario, u.fk_sede, s.nombre_sede, u.fk_campaign, c.nombre_campaign, u.perfil_usuario FROM usuarios u 
						JOIN campaign c ON c.id_campaign = u.fk_campaign
						JOIN sedes s ON s.id_sede = u.fk_sede
						WHERE nombre_usuario = ?`, username, function(err, rows, fields){
			if(err) throw err

			db.end()

			if(rows.length > 0){
				var user = {
						id: user.id_usuario,
						usuario: user.nombre_usuario,
						nombre: user.nombre_mostrar,
						cargo: user.cargo_usuario,
						sede: user.fk_sede,
						nsede: user.nombre_sede,
						campana: user.fk_campaign,
						ncampana: user.nombre_campaign,
						perfil: user.perfil_usuario
				}
			}

			// if(rows.length > 0){
			// 	var user = rows[0]
			// 	if(bcrypt.compareSync(password, user.pass_usuario)){
			// 		return done(null, {
			// 			id: user.id_usuario,
			// 			usuario: user.nombre_usuario,
			// 			nombre: user.nombre_mostrar,
			// 			cargo: user.cargo_usuario,
			// 			sede: user.fk_sede,
			// 			nsede: user.nombre_sede,
			// 			campana: user.fk_campaign,
			// 			ncampana: user.nombre_campaign,
			// 			perfil: user.perfil_usuario
			// 		})	
			// 	}
			// }
			return done(null, false, req.flash('authmessage', 'Usuario o Password Incorrectos'))
		})
	}))
}