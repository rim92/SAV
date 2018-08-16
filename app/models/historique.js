var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Historique = new Schema({	

date_achat:String,
derniere_reparation:String,
panne_signalee:String
	
	
});




module.exports = mongoose.model('Historique', Historique);