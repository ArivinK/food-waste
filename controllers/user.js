var express = require('express');
var router = express.Router();

var passport = require('passport');

var Info = require('../models/info')



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
   res.render('user/login.ejs', {userData:req.user}); 
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

router.post('/user/add-info', (req, res) =>{
    
    var items = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        food: req.body.food,
        quantity: req.body.quantity,
        location: req.body.location,
        time: req.body.time,
        created: new Date()
    }
    
    console.log(items)
    
    var newInfo = new Info(items);
    newInfo.save(function(err, data){
        if(err){
            console.log(err)
        }
        
        res.render('user/add-info.ejs'); 
        
    });
    
});

router.get('/user/profile', (req, res) => {
    console.log(req.user)
    res.render('user/profile.ejs', {userData:req.user}); 
});


module.exports = router;



