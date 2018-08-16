var Todo = require('./models/todo');
var Account = require('./models/account');
var Fiche = require('./models/fiche');
var Pieces = require('./models/piece');
var Archive = require('./models/historique');
var passport = require('passport');
var nodemailer = require('nodemailer');
function getTodos(res) {
    Todo.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
};


function sendEmail(designation,panne,diagnostic,prix){

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'sav.sonomusic@gmail.com',
    pass: 'SAV@2018'
  }
});


var mailOptions = {
  from:"sav.sonomusic@gmail.com",
  to: 'sav.sonomusic@gmail.com',
  subject: 'Prix réparation',
  text: "Designation:"+designation+"\n"+"Panne:"+panne+"\n"+"Diagnostique:"+diagnostic+"\n"+"Prix de Mr Sahbi:"+prix
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});


}



function sendEmailToSalma(designation,reference,qte){

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'sav.sonomusic@gmail.com',
    pass: 'SAV@2018'
  }
});


var mailOptions = {
  from:"methni.rim@gmail.com",
  to: 'sonomusic@gnet.tn',
  subject: 'Pièces indisponibles',
  text: "Designation:"+designation+"\n"+"Référence:"+reference+"\n"+"Quantité:"+qte+"\n"
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});


}







function getFiches(res) {
   	
			
			Fiche.find({reparation: "Non"}).exec(function(err, rep){
if(err)
    res.json({error:err});

    else
        res.json(rep);
    });
	
   
        
};


function getFicheById(id){
Fiche.findById(id, function (err, fiche) {
        
	if(err)
		res.send(err);
	
	else
		res.json(fiche);
	
       })

}

module.exports = function (app) {

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
};


	// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

