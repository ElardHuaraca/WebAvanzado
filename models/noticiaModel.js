var mongoose = require('mongoose');
Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost:27097/blog");
var modelSchema = new Schema({
    _id:{type:Number,require:true},
    titulo: {type:String,require:true},
    descripcion: {type:String,require:true},
    categoria: {type:String,require:true},
    fecha:{type:Date,require:true},
    comentarios:[{
        autor:{type:String},
        mensaje:{type:String},
        fecha:{type:Date}
    }]
});

model = mongoose.model('posts',modelSchema,'posts');
module.exports = model;