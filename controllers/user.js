var express = require('express');
var router = express.Router();

var passport = require('passport');

var User = require('../models/user');
var Info = require('../models/info');

var smtpTransport = require("nodemailer-smtp-transport")
var nodemailer = require('nodemailer');



router.get('/', (req, res) => {
   res.render('index.ejs',{title: 'Stop Food Waste'}); 
});

router.get('/user/signup', (req, res) => {
   res.render('user/signup.ejs', {title: 'Stop Food Waste - Sign Up'}); 
});

router.post('/user/signup', passport.authenticate('local.signup', {
    failureRedirect: '/user/signup',
    failureFlash: true
}), function(req, res){
    res.redirect('/');
});

router.get('/user/login', (req, res) => {
   res.render('user/login.ejs', {title: 'Stop Food Waste - Login', userData:req.user}); 
});

router.post('/user/login', passport.authenticate('local.login', {
    failureRedirect: '/user/login',
    failureFlash: true
}), function(req, res){
    if(req.user.role == "NGO"){
        res.redirect('/user/home');
    }else{
       res.redirect('/user/profile'); 
    }
    
});

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});


module.exports = router;



