var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Devis = new Schema({
id_client:String,
num_serie:String,
panne:String,
prob_fabrication:String,
diagnostic:String,
date_diagnostic:String,	
date_sortie:String,
observation:String,
prix_reparation:String,	
etat:String	
});


module.exports = mongoose.model('Devis', Devis);