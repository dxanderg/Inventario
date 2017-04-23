var express = require('express');
var router = express.Router();

var controllers = require('.././controllers')

/* GET home page. */
router.get('/', controllers.homecontroller.index);
router.get('/Ingresos', controllers.ingresoscontroller.ingresos);
router.post('/CrearArticulo', controllers.ingresoscontroller.postNuevoArticulo);
router.get('/Traslados', controllers.homecontroller.traslados);
router.get('/Consultas', controllers.consultascontroller.consultas);
router.get('/ModificarArt/:id', controllers.consultascontroller.getModificarArticulo);
router.post('/ActualizarArt', controllers.consultascontroller.postActualizaArticulo);
router.get('/Notificaciones', controllers.homecontroller.notificaciones);

module.exports = router;
