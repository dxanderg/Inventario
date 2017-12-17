var express = require('express');
var router = express.Router();
// var passport = require('passport')
var controllers = require('.././controllers')
var mysql = require('mysql')

/* Autenticacion */
router.get('/auth/signup', isAdmin, controllers.usercontroller.getSignUp)
router.post('/auth/signup', isAdmin, controllers.usercontroller.postSignUp)
router.get('/EditUsers', isAdmin, controllers.usercontroller.editUsuarios)
router.get('/ModUser/:id_usuario', isAdmin, controllers.usercontroller.modificarUser)
router.post('/ActualizaUser', isAdmin, controllers.usercontroller.postEdit)


/* Modulos */
router.get('/', controllers.homecontroller.index);
router.get('/api-chart/:id_sede', controllers.homecontroller.apiChart);
router.get('/Ingresos', isAuthenticated, isSedeAdmin, controllers.ingresoscontroller.ingresos);
router.post('/CrearArticulo', isAuthenticated, isSedeAdmin, controllers.ingresoscontroller.postNuevoArticulo);
router.post('/CrearTraslado', isAuthenticated, controllers.trasladoscontroller.postNuevoTraslado);
router.get('/Traslados', isAuthenticated, controllers.trasladoscontroller.traslados);
router.get('/Consultas', isAuthenticated, controllers.consultascontroller.preconsultas);
router.post('/ConsultasSede', isAuthenticated, controllers.consultascontroller.consultas);
router.get('/Actualizar', isSedeAdmin, isSedeAdmin, controllers.consultascontroller.preactualizar);
router.post('/ActualizarSede', isAuthenticated, isSedeAdmin, controllers.consultascontroller.actualizar);
router.get('/ModificarArt/:id', isAuthenticated, controllers.consultascontroller.getModificarArticulo);
router.get('/ModificarArtGlobal/:id', isAuthenticated, controllers.consultascontroller.getModificarArticulo);
router.post('/ActualizarArt', isAuthenticated, controllers.consultascontroller.postActualizaArticulo);
router.get('/Notificaciones', isAuthenticated, controllers.homecontroller.notificaciones);
router.get('/Actualizar-Global', isAdmin, controllers.consultascontroller.preglobalinv);
router.post('/Actualizar-Global-Sedes', isAdmin, controllers.consultascontroller.globalinv);
router.get('/Ocupacion', isAuthenticated, controllers.ocupacioncontroller.ocupacion);
router.post('/ActuaOcupacion', isAuthenticated, isSedeAdmin, controllers.ocupacioncontroller.postActuaOcupacion);


router.get('/api-sedes/:ciudad_user', isAuthenticated, controllers.trasladoscontroller.apiSedes)
router.get('/api-articulos/:id_posicion', isAuthenticated, controllers.trasladoscontroller.apiArticulos);
router.get('/api-puestos/:id_puesto', isAuthenticated, controllers.trasladoscontroller.apiPuestos);
router.get('/api-bodegas/:id_sede', isAuthenticated, controllers.trasladoscontroller.apiBodegas);
router.get('/api-items/:id_item', isAuthenticated, controllers.ingresoscontroller.apiItems);
router.get('/api-ocupacion/:id_puesto', isAuthenticated, controllers.ocupacioncontroller.apiOcupacion);
router.get('/api-notificaciones/:id_fechaI/:id_fechaF', isAuthenticated, controllers.notificacionescontroller.apiMovimientos);


router.get('/admin/Index', isAdmin, controllers.admincontroller.index);
router.get('/admin/fabricante/:nombre_fabricante', isAuthenticated, isAdmin, controllers.admincontroller.postFabricante);
router.get('/admin/tipoitem/:tipoitem', isAuthenticated, isAdmin, controllers.admincontroller.postTipoItem);
router.get('/admin/items/:val1/:val2/:val3/:val4/:val5/:val6/:val7?/:val8?/:val9?', isAuthenticated, isAdmin, controllers.admincontroller.postItems);
router.get('/admin/sedes/:val1/:val2/:val3', isAuthenticated, isAdmin, controllers.admincontroller.postSedes);
router.get('/admin/bodegas/:val1/:val2', isAuthenticated, isAdmin, controllers.admincontroller.postBodegas);
router.get('/admin/puestos/:val1/:val2/:val3/:val4', isAuthenticated, isAdmin, controllers.admincontroller.postPuestos);
router.get('/admin/campana/:val1/:val2/:val3', isAuthenticated, isAdmin, controllers.admincontroller.postCampana);
router.get('/bodega/:id_sede', isAuthenticated, controllers.admincontroller.apiBodega);

router.get('/Reportes', isAuthenticated, controllers.reportescontroller.index);
router.post('/ReportQuerySerial', isAuthenticated, controllers.reportescontroller.querySerial);
router.post('/ReportQueryPlaqueta', isAuthenticated, controllers.reportescontroller.queryPlaqueta);
router.post('/ReportQueryResponsable', isAuthenticated, controllers.reportescontroller.queryResponsable);
router.post('/ReportQueryPropietario', isAuthenticated, controllers.reportescontroller.queryPropietario);
router.post('/ReportQueryArticulo', isAuthenticated, controllers.reportescontroller.queryArticulo);
router.post('/ReportQueryItem', isAuthenticated, controllers.reportescontroller.queryItem);
router.post('/ReportQueryEstado', isAuthenticated, controllers.reportescontroller.queryEstado);
router.post('/ReportQuerySede', isAuthenticated, controllers.reportescontroller.querySede);

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
