let model = require('../models/productoModel');
module.exports = {
	show: function (req, res) {
		model.find({}, function (err, data) {
			if (err) {
				console.log(err);
				res.sendStatus(500);
			} else {
				res.json(data);
			}
		});
	},
	detail: function (req, res) {
		let val_id = req.params.id;
		model.findOne({ _id: val_id }, function (err, data) {
			if (err) {
				console.log(err);
				res.sendStatus(500);
			} else {
				res.json(data);
			}
		});
	},
	create: function (req, res) {
		let obj = new model;
		obj.descripcion = req.body.descripcion;
		obj.precio = req.body.precio;
		obj.save(function (err, data) {
			if (err) {
				console.log(err);
				res.sendStatus(500);
			} else {
				res.json('ok');
			}
		});
	},
	update: function (req, res) {
		console.log(req.body);
		let val_id = req.body._id;
		let datos = {
			descripcion: req.body.descripcion,
			precio: req.body.precio,
		};
		model.updateOne({ _id: val_id }, datos, function (err, data) {
			if (err) {
				console.log(err);
				res.sendStatus(500);
			} else {
				res.json(data);
			}
		});
	},
	delete: function (req, res) {
		let val_id = req.params.id;
		model.deleteOne({ _id: val_id }, function (err) {
			if (err) return handleError(err);
			res.json('ok');
		});
	}
};