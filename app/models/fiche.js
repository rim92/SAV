var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Fiche = new Schema({
nom: String,
prenom: String,
adresse:String,
tel:String,	
designation:String,
date:String,
date_achat:String,		
panne:String,
reparation:String,
frais_diagnostic:String,
date_achat:String,
num_serie:String,
panne_signaler:String,
diagnostic:String,
garantie:String,
prob_fabrication:String,	
rerepare:Boolean,
date_diagnostic:String,	
date_sortie:String,
prix_reparation:String,	
observation:String,
etat:String,
derniere_reparation:String,	
last_panne:String,
prix_final:String,
added:Boolean
});


module.exports = mongoose.model('Fiche', Fiche);