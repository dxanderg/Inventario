var mysql = require('mysql')
var bcrypt = require('bcryptjs')

module.exports = {

	getSignUp: function(req, res, next){
		return res.render('users/Signup')
	},

	postSignUp: function(req, res, next){
		console.log('adentro')
		var salt = bcrypt.genSaltSync(10)
		var password = bcrypt.hashSync(req.body.password, salt)

		var user = {
			nombre_usuario: req.body.usuario,
			cargo_usuario: req.body.cargo,
			pass_usuario: password,
			fk_sede: '1',
			fk_campaign: '9',
			nombre_mostrar: req.body.nombre,
			perfil_usuario: req.body.perfil
		}
		console.log(user)

		var config = require('.././database/config')

		var db = mysql.createConnection(config)

		db.connect()

		db.query('INSERT INTO usuarios SET ?', user, function(err, row, fields){
			if(err) throw err
			db.end()
		})
		req.flash('info', 'Se ha registrado correctamente, ya puede ingresar') ///{message: req.flash('info')}
		return res.redirect('/auth/signin')
	},

	getSignIn: function(req, res, next){
		return res.render('users/signin')
	},

	logout: function(req, res, next){
		req.logout(),
		res.redirect('/auth/signin')
	}

}