var express = require('express');
var router = express.Router();
let controller = require('../controllers/productoController');

router.get('/', function (req, res, next) {
    controller.listar(req, res);
});

router.get('/mostrar/:id', function (req, res, next) {
    controller.show(req, res);
});

router.post('/', function (req, res) {
    controller.store(req, res);
});

router.put('/', function (req, res) {
    controller.edit(req, res);
});

router.delete('/:id', function (req, res) {
    controller.delete(req, res);
});

module.exports = router;