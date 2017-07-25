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
router.get('/', isAuthenticated, controllers.homecontroller.index);
router.get('/Ingresos', isAuthenticated, controllers.ingresoscontroller.ingresos);
router.post('/CrearArticulo', isAuthenticated, controllers.ingresoscontroller.postNuevoArticulo);
router.post('/CrearTraslado', isAuthenticated, controllers.trasladoscontroller.postNuevoTraslado);
router.get('/Traslados', isAuthenticated, controllers.trasladoscontroller.traslados);
router.get('/Consultas', isAuthenticated, controllers.consultascontroller.consultas);
router.get('/ModificarArt/:id', isAuthenticated, controllers.consultascontroller.getModificarArticulo);
router.post('/ActualizarArt', isAuthenticated, controllers.consultascontroller.postActualizaArticulo);
router.get('/Notificaciones', isAuthenticated, controllers.homecontroller.notificaciones);

function isAuthenticated(req, res, next) {
  if (req.user)
    return next();
  
  res.redirect('/auth/signin');
}

module.exports = router;
