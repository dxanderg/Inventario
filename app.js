var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash')
var session = require('express-session')
var mysql = require('mysql')
// var passport = require('passport')
// require('./passport/passport')(passport)

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.locals.currentuser = {}

app.use(function auth0(req, res, next) {
    var nodeSSPI = require('node-sspi')
    var nodeSSPIObj = new nodeSSPI({
      retrieveGroups: true
    })
    nodeSSPIObj.authenticate(req, res, function(err){
      res.finished || next()
    })
  })

app.use(function custom_auth(req, res, next) {
    var str = req.connection.user
    var resto = str.split('\\')
    var usuarioIn = resto[1]

    var config = require('./database/config')
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
      
      res.locals.currentuser = userD
      req.user = userD
      return next()
      }
      else {
        // res.status(401).send({message: 'Acceso Denegado!'})
        res.render('acceso')
      }
    })
  })



app.use(cookieParser());
app.use(session({
	secret: 'Sh3ld0n.2017',
	resave: false,
	saveUninitialized: false
}))
app.use(flash())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(passport.initialize())
// app.use(passport.session())

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
