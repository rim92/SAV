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
//require('./app/routes.js')(app);


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

//mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://rimi:RIMA23379665@ds125422.mlab.com:25422/sav",{ useMongoClient: true }, function (err, client) {
//  if (err) {
//    console.log(err);
//    process.exit(1);
//  }
//
//  // Save database object from the callback for reuse.
//  db = client.db();
//  console.log("Database connection ready");
//
//  // Initialize the app.
//  var server = app.listen(process.env.PORT || 8080, function () {
//    var port = server.address().port;
//    console.log("App now running on port", port);
//  });
//});

// api ----------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
        getTodos(res);
    });

	
	   app.get('/fiches', function (req, res) {
        // use mongoose to get all todos in the database
        getFiches(res);
    });
	
	  app.get('/fiche_modifier', function (req, res) {
       
		  	
			Fiche.find({etat: "Oui"  }).exec(function(err, fiches){
if(err)
    res.json({error:err});

    else
        res.json(fiches);
        
        
    });
		  
       
    });
	
	
	
	  app.get('/pieces_indispo', function (req, res) {
       
		  	
			Pieces.find({choix: "indispo"  }).exec(function(err, pieces){
if(err)
    res.json({error:err});

    else
        res.json(pieces);
        
        
    });
		  
       
    });
	
	
	app.get('/fiche/:id',function(req,res){
	
	
		Fiche.findById(req.params.id, function (err, fiche) {
        
	if(err)
		res.send(err);
	
	else
		res.json(fiche);
	
       })
		
	
	});

	
		app.get('/pieces/:id',function(req,res){
	

		
			
			Pieces.find({id_article: req.params.id  }).exec(function(err, pieces){
if(err)
    res.json({error:err});

    else
        res.json(pieces);
        
        
    });
	
	});
	
	
		
		app.get('/email/:designation/:panne/:diagnostic/:prix',function(req,res){
	
			sendEmail(req.params.designation,req.params.panne,req.params.diagnostic,req.params.prix);

});
	
	
			
		app.get('/email_piece/:designation/:reference/:qte',function(req,res){
	
			sendEmailToSalma(req.params.designation,req.params.reference,req.params.qte);

});
	
	
	
		app.get('/devis',function(req,res){
	
Fiche.find({reparation: "Oui"}).exec(function(err, rep){
if(err)
    res.json({error:err});

    else
        res.json(rep);
        
        
    });
	
	});
	
	
	
	
		app.delete('/piece/:id',function(req,res){
	

		
			
	Pieces.findByIdAndRemove({_id:req.params.id}).exec(function(err, piece){
if(err)
    res.json({error:err});

    else
        res.json({done:1});
        
        
    });
	
	});
	
	
	
	 
	 
    
	
	
	
	
    // create todo and send back all todos after creation
    app.post('/fiche', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Fiche.create({
            nom: req.body.nom,
			prenom: req.body.prenom,
			adresse: req.body.adresse,
			tel: req.body.tel,
			designation: req.body.designation,
			date:req.body.date,
			date_achat: req.body.date_achat,
			frais_diagnostic:req.body.frais_diagnostic,
			panne:req.body.panne,
			reparation: req.body.reparation,
			rerepare:req.body.rerepare,
			num_serie:null,
			panne_signaler:null,
			diagnostic:null,
			reference_piece:null,
			prix_piece:null,
			prix_reparation:null,
			date_diagnostic:null,	
			date_sortie:null,
			observation:null,
			etat:"non",
			added:false
	     
        }, function (err, fiche) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTodos(res);
        });

    });
	
	
	
	//create pieces 

	 app.post('/pieces/:id/:count/:designation/:referencepiece/:qtepiece/:choix/:prixpiece', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        
		 
		 Pieces.create({
            designation_piece:req.params.designation,
			reference_piece:req.params.referencepiece,	
			qte_piece:req.params.qtepiece,	
			choix: req.params.choix,
			prix_piece:req.params.prixpiece,
			id_article:req.params.id
	     
        }, function (err, fiche) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
           // getTodos(res);
        });
			
		

    });
	 
	
	
		//create pieces  test

	 app.post('/test', function (req, res) {


        // create a todo, information comes from AJAX request from Angular
        console.log(req.body);
		 
		 Pieces.create(
            req.body
	     
        , function (err, fiche) {
            if (err)
                res.send(err);
         res.send(200);
            // get and return all the todos after you create another
           // getTodos(res);
        });
			
		

    });
	 
	
	 app.post('/update/piece', function (req, res) {


        // create a todo, information comes from AJAX request from Angular
        console.log(req.body);
		 
		 Pieces.create(
            req.body
	     
        , function (err, fiche) {
            if (err)
                res.send(err);
         res.send(200);
            // get and return all the todos after you create another
           // getTodos(res);
        });
			
		

    });
	
	
	
		
	 app.post('/archive', function (req, res) {


        // create a todo, information comes from AJAX request from Angular
        console.log(req.body);
		 
		 Archive.create(
            req.body
	     
        , function (err, fiche) {
            if (err)
                res.send(err);
         res.send(200);
            // get and return all the todos after you create another
           // getTodos(res);
        });
			
		

    });
	 
	 
	
	
	//update date entree
	   app.put('/date_entree/:id/:date',function(req,res) {
		  // console.log("idd"+req.params.id);
	   
  Fiche.findByIdAndUpdate({"_id":req.params.id},{$set:{date_diagnostic:req.params.date,etat:"loading"}},{new:true},function(err, cat){
if(err){
	console.log('oops erreur ');
    res.json({error:err});
}
    else{
		console.log("update done !");
        res.json(cat);
	}
    });
    
});
	
	
	
	app.post('/logout', function(req, res) {
req.logOut();
		res.send(200);

});
	
		//update fiche technique
	   app.put('/fiche_technique/:id/:num_serie/:panne_signaler/:diagnostic/:prix_reparation/:observation',function(req,res) {
		   
  Fiche.findByIdAndUpdate({"_id":req.params.id},{$set:{num_serie:req.params.num_serie,panne_signaler:req.params.panne_signaler,diagnostic:req.params.diagnostic,prix_reparation:req.params.prix_reparation,observation:req.params.observation,added:true,etat:"Oui"}},{new:true},function(err, cat){
if(err){
	console.log('oops erreur ');
    res.json({error:err});
}
    else{
		console.log("update done !");
        res.json(cat);
	}
    });
    
});
	
	
	
	//update fiche rerepare
	   app.put('/fiche/:id/:derniere_reparation',function(req,res) {
		   
  Fiche.findByIdAndUpdate({"_id":req.params.id},{$set:{derniere_reparation:req.params.derniere_reparation}},{new:true},function(err, fiche){
if(err){
	console.log('oops erreur ');
    res.json({error:err});
}
    else{
		console.log("update done !");
        res.json(fiche);
	}
    });
    
});
	
	
		
	//update date sortie
	   app.put('/date_sortie/:id/:date',function(req,res) {
		  // console.log("idd"+req.params.id);
	   
  Fiche.findByIdAndUpdate({"_id":req.params.id},{$set:{date_sortie:req.params.date,etat:"done"}},{new:true},function(err, cat){
if(err){
	console.log('oops erreur ');
    res.json({error:err});
}
    else{
		console.log("update done !");
        res.json(cat);
	}
    });
    
});
	
	
	   // create fiche
    app.post('/api/todos', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Fiche.create({
            username: req.body.username,
			password: req.body.password,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTodos(res);
        });

    });

	
	app.post('/register', function(req, res) {
//Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
//if (err) {
//console.log("error");
//}
		console.log("regiistr"+req.body.username);
		
		if( req.body.username =="SONOM" && req.body.password=="STORE2017"){
passport.authenticate('local')(req, res, function () {
console.log("c'est bon");
});
			
		}
		
		else{
		console.log("error");
		
		}
//});
});
	
	  app.get('/profile', isLoggedIn, function(req, res) {
		  console.log(req.user);
       return req.user;
    });

	
//	
//app.post('/login', passport.authenticate('local'), function(req, res) {
//});
//	
		// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

	

app.get('/logout', function(req, res) {
req.logout();
});
	
    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.

//(Focus on This Variable)
var url = 'mongodb://rimi:RIMA23379665@ds125422.mlab.com:25422/sav';      
//(Focus on This Variable)

// Use connect method to connect to the Server
  MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);

    // do some work here with the database.

    //Close connection
    db.close();
	  
	  
	  var server = app.listen(process.env.PORT || 5000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
	  
  }
});