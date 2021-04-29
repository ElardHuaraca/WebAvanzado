let model = require("../models/noticiaModel");

module.exports = {
    show: function(req,res){
        model.find({},function(err,items){
            if(!err){
                res.json(items);
            }else{
                res.sendStatus(500);
                console.log(err);
            }
        });
    },
    detail: function(req,res){
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
        obj._id = req.body.id;
        obj.titulo = req.body.titulo;
        obj.descripcion = req.body.descripcion;
        obj.categoria = req.body.categoria;
        obj.fecha = new Date();
        obj.comentarios = []
        console.log(obj);
        obj.save(function (err, newData) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.json(newData);
            }
        });
    },
    update: function (req, res) {
        let val_id = req.body.id;
        let datos = {
            titulo : req.body.titulo,
            descripcion : req.body.descripcion,
            categoria : req.body.categoria,
            fecha : req.body.fecha,
            comentarios: req.body.comentarios
        };
        model.updateOne({ _id: val_id }, datos, function (err, newData) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.send(newData);
            }
        });
    },
    delete: function (req, res) {
        let val_id = req.params.id;
        console.log(val_id);
        model.deleteOne({_id:val_id},function (err) {
            if(err){
                console.log(err);
                res.sendStatus(500);
            }else{
                res.sendStatus(200);
            }
        });
    }
}