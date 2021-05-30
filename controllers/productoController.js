let db = require('../models/dbconection');
const fs = require('fs');

let producto = {
    listar(req, res) {
        let sql = 'SELECT codigo, descripcion, precio, GROUP_CONCAT(imagen.nombre) as imagen FROM PRODUCTO INNER ' +
            'JOIN IMAGEN ON PRODUCTO.codigo = IMAGEN.codigo_producto GROUP BY codigo'
        db.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.json(result);
            }
        });
    },
    store(req, res) {
        var paths = [];
        for (let i = 0; i < req.files.uploads.length; i++) {
            var file = req.files.uploads[i];
            var path = file.path;
            var splited = file.path.split('\\');
            var target_path = './public/images/' + splited[splited.length - 1];
            paths[i] = splited[splited.length - 1];
            fs.copyFile(path, target_path, function (err) {
                if (err) throw err;
                fs.unlink(path, function () {
                    if (err) throw err;
                });
            });
        }
        val_nombre = req.body.descripcion;
        val_precio = req.body.precio;
        let sql = 'INSERT INTO PRODUCTO(descripcion,precio) VALUES(?,?)';
        db.query(sql, [val_nombre, val_precio], function (err, newData) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                for (let j = 0; j < paths.length; j++) {
                    let sql_img = 'INSERT INTO IMAGEN(nombre,codigo_producto) VALUES(?,?)';
                    db.query(sql_img, [paths[j], newData.insertId], function (erro, newImages) {
                        if (erro) {
                            console.log(erro)
                            res, sendStatus(500);
                        }
                        if (j === paths.length - 1) {
                            res.json(newData)
                        }
                    })
                }
            }
        });
    },
    show(req, res) {
        val_id = req.params.id;
        let sql = 'SELECT codigo,descripcion,precio, GROUP_CONCAT(imagen.nombre) as imagen FROM PRODUCTO '
            + 'INNER JOIN IMAGEN ON producto.codigo = imagen.codigo_producto WHERE codigo = ?';
        db.query(sql, [val_id], function (err, rowData) {
            if (err) {
                console.log(err)
                res.sendStatus(500);
            } else {
                res.json(rowData);
            }
        });
    },
    edit(req, res) {
        val_id = req.body.codigo
        val_nombre = req.body.descripcion;
        val_precio = req.body.precio;
        let sql = 'UPDATE PRODUCTO SET descripcion = ?, precio = ? WHERE codigo = ?'
        db.query(sql, [val_nombre, val_precio, val_id], function (err, updateData) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                console.log(req.files)
                if (req.body.dell != '') {
                    for (let i = 0; i < req.body.dell.length; i++) {
                        var img = req.body.dell[i];
                        console.log(img);
                        var path = './public/images/' + img;
                        fs.unlink(path, function (err) {
                            if (err) throw err;
                        });
                        let sql_delete = 'DELETE FROM IMAGEN WHERE nombre = ? and codigo_producto = ?';
                        db.query(sql_delete, [img, val_id], function (err, update) {
                            if (err) {
                                console.log(err);
                                res.sendStatus(500);
                            }
                        });
                    }
                }
                if (req.files.uploads != undefined) {
                    var paths = [];
                    for (let k = 0; k < req.files.uploads.length; k++) {
                        var file = req.files.uploads[k];
                        var path = file.path;
                        var splited = file.path.split('\\');
                        var target_path = './public/images/' + splited[splited.length - 1];
                        paths[k] = splited[splited.length - 1];
                        fs.copyFile(path, target_path, function (err) {
                            if (err) throw err;
                            fs.unlink(path, function () {
                                if (err) throw err;
                            });
                        });
                    }
                    for (let j = 0; j < paths.length; j++) {
                        let sql_img = 'INSERT INTO IMAGEN(nombre,codigo_producto) VALUES(?,?)';
                        db.query(sql_img, [paths[j], val_id], function (erro, newImages) {
                            if (erro) {
                                console.log(erro)
                                res, sendStatus(500);
                            }
                            if (j === paths.length - 1) {
                                res.json(newImages)
                            }
                        })
                    }
                } else {
                    res.json(updateData);
                }
            }
        });
    },
    delete(req, res) {
        val_id = req.params.id;
        let sql_names_images = 'SELECT * FROM IMAGEN WHERE codigo_producto = ?';

        db.query(sql_names_images, [val_id], function (err, result) {
            if (err) {
                console.log(err);
            } else {
                for (let i = 0; i < result.length; i++) {
                    var path = './public/images/' + result[i].nombre;
                    fs.unlink(path, function (err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
            }
        });

        let sql = 'DELETE FROM PRODUCTO WHERE codigo = ?';
        let sql_images = 'DELETE FROM IMAGEN WHERE codigo_producto = ?';
        db.query(sql, [val_id], function (err, newData) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                db.query(sql_images, [val_id], function (err, data) {
                    if (err) {
                        console.log(err);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(200);
                    }
                });
            }
        });
    }
};

module.exports = producto;