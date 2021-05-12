var express = require('express');
var router = express.Router();
let controlador = require('../controllers/productoController');

router.get('/listar', function (req, res) {
    controlador.show(req, res);
});
router.get('/mostrar/:id', function (req, res) {
    controlador.detail(req, res);
});
router.post('/', function (req, res) {
    controlador.create(req, res);
});
router.put('/', function (req, res) {
    controlador.update(req, res);
});
router.delete('/:id', function (req, res,) {
    controlador.delete(req, res);
});
module.exports = router;