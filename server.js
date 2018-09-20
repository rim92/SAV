// set up ======================================================================
var express = require('express');
var app = express(); 						// create our app w/ express
var mongoose = require('mongoose'); 				// mongoose for mongodb
				// set the port
var database = require('./config/database'); 			// load the database config
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongodb = require("mongodb");
// configuration ===============================================================
mongoose.connect(database.localUrl); 	// Connect to local MongoDB instance. A remoteUrl is also available (modulus.io)

app.use(express.static('./public')); 		// set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request



app.use(require('express-session')({
secret: 'keyboard cat',
resave: false,
saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// passport config
var Account = require('./app/models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// routes ======================================================================
require('./app/routes.js')(app);


//var http = require('http');
//http.createServer(function (req, res) {
//  //res.writeHead(200, {'Content-Type': 'text/plain'});
// res.writeHead(200, {'Content-Type': 'text/html'});
//  res.write(req);
//  res.end();
//}).listen(8080, '192.168.1.150');
//console.log('Server running at http://192.168.1.150:8080/');



//var http = require('http');
//var fs = require("fs");
// 
//http.createServer(function(request, response) {
//	//response.end();
//	
//	
//	fs.readFile('index.html', 'utf8', function(err, contents) {
//    console.log(contents);
//		  response.writeHead(200, {'Content-Type': 'text/html'});
//  response.write(data);
//  response.end();
//});
//	

	
	
//	fs.readFile("index.html", function(err, data){
//  response.writeHead(200, {'Content-Type': 'text/html'});
//  response.write(data);
//  response.end();
//});
	
//	
//fs.readFile("index.html", function(err, data){
//  response.writeHead(200, {'Content-Type': 'text/html'});
//  response.write(data);
//  response.end();
//});
//}).listen(8080);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;
// Connect to the database before starting the application server.

mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://rimi:RIMA23379665@ds125422.mlab.com:25422/sav",{ useMongoClient: true }, function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

