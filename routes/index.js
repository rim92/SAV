var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
router.get('/', function (req, res) {
res.render('index.twig', { user : req.user });
});
router.get('/register', function(req, res) {
res.render('register.twig', { });
});
/*router.post('/register', function(req, res) {
Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
if (err) {
return res.render('register.twig', { account : account });
}
passport.authenticate('local')(req, res, function () {
res.redirect('/');
    });
});
});*/

router.post('/register', function(req, res) {
Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
if (err) {
return res.render("register.twig", {info: "Sorry. That username already exists. Try again."});
}
passport.authenticate('local')(req, res, function () {
res.redirect('/');
});
});
});


router.get('/login', function(req, res) {
res.render('login.twig', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
res.redirect('/');
});
router.get('/logout', function(req, res) {
req.logout();
res.redirect('/');
});
router.get('/ping', function(req, res){
res.status(200).send("test!");
});
module.exports = router;