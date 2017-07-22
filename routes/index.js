var express = require('express');
var router = express.Router();
var passport = require('passport')
var controllers = require('.././controllers')

/* Autenticacion */
router.get('/auth/signup', controllers.usercontroller.getSignUp)
router.post('/auth/signup', controllers.usercontroller.postSignUp)
router.get('/auth/signin', controllers.usercontroller.getSignIn)
router.get('/auth/logout', controllers.usercontroller.logout)
router.post('/auth/signin', passport.authenticate('local', {
	successRedirect : '/',
	failureRedirect: '/auth/signin',
	failureFlash: true
}))


/* Modulos */
router.get('/', controllers.homecontroller.index);
router.get('/Ingresos', controllers.ingresoscontroller.ingresos);
router.post('/CrearArticulo', controllers.ingresoscontroller.postNuevoArticulo);
router.post('/CrearTraslado', controllers.trasladoscontroller.postNuevoTraslado);
router.get('/Traslados', controllers.trasladoscontroller.traslados);
router.get('/Consultas', controllers.consultascontroller.consultas);
router.get('/ModificarArt/:id', controllers.consultascontroller.getModificarArticulo);
router.post('/ActualizarArt', controllers.consultascontroller.postActualizaArticulo);
router.get('/Notificaciones', controllers.homecontroller.notificaciones);

module.exports = router;
