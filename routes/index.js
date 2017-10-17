var express = require('express');
var router = express.Router();
// var passport = require('passport')
var controllers = require('.././controllers')
var mysql = require('mysql')


/* Autenticacion */
router.get('/auth/signup', isAdmin, controllers.usercontroller.getSignUp)
router.post('/auth/signup', isAdmin, controllers.usercontroller.postSignUp)
// router.get('/auth/signin', controllers.usercontroller.getSignIn)
// router.get('/auth/logout', controllers.usercontroller.logout)
// router.post('/auth/signin', auth0, custom_auth, controllers.homecontroller.index)

// router.post('/auth/signin', auth0, passport.authenticate('local', {
//   successRedirect : '/',
//   failureRedirect: '/auth/signin',
//   failureFlash: true
// }))


/* Modulos */
router.get('/', controllers.homecontroller.index);
router.get('/api-chart/:id_sede', controllers.homecontroller.apiChart);
router.get('/Ingresos', isAuthenticated, isSedeAdmin, controllers.ingresoscontroller.ingresos);
router.post('/CrearArticulo', isAuthenticated, isSedeAdmin, controllers.ingresoscontroller.postNuevoArticulo);
router.post('/CrearTraslado', isAuthenticated, controllers.trasladoscontroller.postNuevoTraslado);
router.get('/Traslados', isAuthenticated, controllers.trasladoscontroller.traslados);
router.get('/Consultas', isAuthenticated, controllers.consultascontroller.consultas);
router.get('/Actualizar', isSedeAdmin, isSedeAdmin, controllers.consultascontroller.actualizar);
router.get('/ModificarArt/:id', isAuthenticated, controllers.consultascontroller.getModificarArticulo);
router.get('/ModificarArtGlobal/:id', isAuthenticated, controllers.consultascontroller.getModificarArticulo);
router.post('/ActualizarArt', isAuthenticated, controllers.consultascontroller.postActualizaArticulo);
router.get('/Notificaciones', isAuthenticated, controllers.homecontroller.notificaciones);
router.get('/Actualizar-Global', isAdmin, controllers.consultascontroller.globalinv);


router.get('/api-articulos/:id_posicion', isAuthenticated, controllers.trasladoscontroller.apiArticulos);
router.get('/api-puestos/:id_puesto', isAuthenticated, controllers.trasladoscontroller.apiPuestos);
router.get('/api-bodegas/:id_sede', isAuthenticated, controllers.trasladoscontroller.apiBodegas);
router.get('/api-items/:id_item', isAuthenticated, controllers.ingresoscontroller.apiItems);


router.get('/admin/Index', isAdmin, controllers.admincontroller.index);
router.get('/admin/fabricante/:nombre_fabricante', isAuthenticated, isAdmin, controllers.admincontroller.postFabricante);
router.get('/admin/tipoitem/:tipoitem', isAuthenticated, isAdmin, controllers.admincontroller.postTipoItem);
router.get('/admin/items/:val1/:val2/:val3/:val4/:val5/:val6/:val7?/:val8?/:val9?', isAuthenticated, isAdmin, controllers.admincontroller.postItems);
router.get('/admin/sedes/:val1/:val2/:val3', isAuthenticated, isAdmin, controllers.admincontroller.postSedes);
router.get('/admin/bodegas/:val1/:val2', isAuthenticated, isAdmin, controllers.admincontroller.postBodegas);
router.get('/admin/puestos/:val1/:val2/:val3/:val4', isAuthenticated, isAdmin, controllers.admincontroller.postPuestos);
router.get('/admin/campana/:val1/:val2/:val3', isAuthenticated, isAdmin, controllers.admincontroller.postCampana);
router.get('/bodega/:id_sede', isAuthenticated, controllers.admincontroller.apiBodega);

router.get('*', function(req, res, next){
  return res.render('404')
});

function isAuthenticated(req, res, next) {
  if (req.user){
    res.locals.currentuser = req.user
    return next();
  }
  res.redirect('/');
}

function isAdmin(req, res, next) {
  if (req.user.perfil == 1){
    res.locals.currentuser = req.user
    return next();
  }
  res.redirect('/');
}

function isSedeAdmin(req, res, next) {
  if (req.user.perfil == 2 || req.user.perfil == 1){
    res.locals.currentuser = req.user
    return next();
  }
  res.redirect('/');
}


module.exports = router;
