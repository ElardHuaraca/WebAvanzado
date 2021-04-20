var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  datos = {
    "nombre":"Elard Huaraca",
    "email":"elard.huaraca@tecsup.edu.pe"
  };
  res.render('dash',function(err,html){
    res.render('templates/layout',{
      'usuario' : datos,
      'tituloSeccion' : 'Dashboard',
      'seccion' : html
    });
  });
});

module.exports = router;
