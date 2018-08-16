var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Piece = new Schema({
designation_piece:String,
reference_piece:String,	
qte_piece:String,	
choix:String,	
prix_piece:String,
id_article:String	
});

module.exports = mongoose.model('Piece', Piece);