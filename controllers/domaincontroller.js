var mysql = require('mysql')
var async = require('async')
var dateFormat = require('dateFormat')
var _ = require('lodash')

module.exports = {

	dominio: function(req, res, next){
		var str = req.connection.user
		var split = str.split('\\')
		var usuarioIn = split[1]
		// var usuarioIn = `'` + split[1] + `'`
		// var usuarioIn = JSON.stringify(split[1]);

		var config = require('.././database/config')
		var db = mysql.createConnection(config)
		db.connect()

		var consulta0 = null

		db.query(`SELECT u.id_usuario, u.nombre_usuario, u.pass_usuario, u.nombre_mostrar, u.cargo_usuario, u.fk_sede, s.nombre_sede, u.fk_campaign, c.nombre_campaign, u.perfil_usuario FROM usuarios u 
						JOIN campaign c ON c.id_campaign = u.fk_campaign
						JOIN sedes s ON s.id_sede = u.fk_sede
						WHERE nombre_usuario = ?`, usuarioIn, function(err, rows, fields){
			if(err) throw err

			db.end()

			if(rows.length > 0){
				var user = rows[0]
				var userD = {
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
			
			res.redirect('/');
			// res.send({datos : userD})
			// res.render({ data : user})
			}
			else {
				res.status(401).send({message: 'Access denied'})
			}
		})
	}
}
