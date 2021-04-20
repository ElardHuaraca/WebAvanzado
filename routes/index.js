var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(request,response) {
  let usuario = request.body.inputEmail;
  let clave = request.body.inputPassword;
  console.log(request.body);
  if (usuario != '' && clave === 'tecsup') {
    response.app.locals.usuario = request.body.inputEmail;
    response.redirect('/dashboard');
  }else{
    response.redirect('/');
  }
});

router.get('/logout',function (request,response) {
  res.redirect('/');
});

module.exports = router;
