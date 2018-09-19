//module.exports = {
//    remoteUrl : 'mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu',
//    localUrl: 'mongodb://localhost/sonomusic'
//};


var mongoose = require('mongoose');


//mongoose.connect('mongodb://localhost/test');
mongoose.connect('mongodb://rimi:RIMA23379665@ds125422.mlab.com:25422/sav');



module.exports = mongoose;
