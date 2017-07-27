var express = require('express');
var router = express.Router();
var passport = require('passport')
var controllers = require('.././controllers')

/* Autenticacion */
router.get('/auth/signup', isAdmin, controllers.usercontroller.getSignUp)
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

router.get('*', function(req, res, next){
  return res.render('404')
  // res.send('what???', 404);
});

function isAuthenticated(req, res, next) {
  if (req.user){
    res.locals.currentuser = req.user
  	return next();
  }
  res.redirect('/auth/signin');
}

function isAdmin(req, res, next) {
  if (req.user.perfil == 1){
    res.locals.currentuser = req.user
    return next();
  }
  res.redirect('/');
}

module.exports = router;
