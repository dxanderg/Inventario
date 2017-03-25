var express = require('express');
var router = express.Router();

var controllers = require('.././controllers')

/* GET home page. */
router.get('/', controllers.homecontroller.index);
router.get('/Ingresos', controllers.homecontroller.ingresos);
router.get('/Traslados', controllers.homecontroller.traslados);
router.get('/Consultas', controllers.consultascontroller.consultas);
router.get('/Notificaciones', controllers.homecontroller.notificaciones);

module.exports = router;
