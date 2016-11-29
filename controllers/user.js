var express = require('express');
var router = express.Router();

var passport = require('passport');



router.get('/', (req, res) => {
   res.render('index.ejs'); 
});

router.get('/user/signup', (req, res) => {
   res.render('user/signup.ejs'); 
});

router.post('/user/signup', passport.authenticate('local.signup', {
    //succesRedirect: '/profile',
    failureRedirect: '/',
    failureFlash: true
}), function(req, res){
    res.redirect('/user/profile');
});

router.get('/user/login', (req, res) => {
   res.render('user/login.ejs'); 
});

router.post('/user/login', passport.authenticate('local.login', {
    //succesRedirect: '/profile',
    failureRedirect: '/',
    failureFlash: true
}), function(req, res){
    res.redirect('/user/profile');
});



router.get('/user/add-info', (req, res) => {
   res.render('user/add-info.ejs'); 
});

router.get('/user/profile', (req, res) => {
    res.render('user/profile.ejs', {userData:req.user}); 
});


module.exports = router;



