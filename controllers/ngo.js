var express = require('express');
var router = express.Router();
var moment = require('moment');


var User = require('../models/user');
var Info = require('../models/info');
var Charity = require('../models/charity');


router.get('/user/home', (req, res) => {
    
    Info.find(function(err, data){
        res.render('user/home', {title: 'Stop Food Waste - Homepage', userData:req.user, infoData:data});
    });

});  


router.get('/user/add-profile', (req, res) =>{
    res.render('user/add-profile', {title: 'Stop Food Waste - Add Profile', userData:req.user}); 
});

router.post('/user/add-profile', (req, res) =>{
    
    var newData = new Charity();
    newData.name = req.body.name;
    newData.contact = req.body.contact;
    newData.email = req.user.email;
    newData.phone = req.body.phone;
    newData.address = req.body.address;
    newData.city = req.body.city;
    newData.state = req.body.state;
    newData.website = req.body.website;
    newData.description = req.body.description;
    newData.created = new Date();
    
    newData.save(function(err, result){
       if(err){
            console.log(err);
        } 
        
        res.render('user/add-profile', {title: 'Stop Food Waste - Add Profile', userData:req.user}); 
    });
});

router.get('/user/details/:id', (req, res) =>{
     
    Info.findOne({'_id':req.params.id}, function(err, data){
        var d = data.time;
        //var dateTime = d.getDate() + '-' + (d.getMonth()+1) + '-' + d.getFullYear()
        
        var dateval = moment(d).format('MMMM Do, YYYY');
        
        res.render('user/details', {title: 'Stop Food Waste', userData:req.user, infoData:data, dateTime:dateval});
    });
});


router.get('/user/profile', (req, res) =>{
    Charity.find({'email': req.user.email}, (err, data) => {
        res.render('user/profile', {title: 'Stop Food Waste', userData:req.user, data:data[0]}); 
    });
    
});

router.post('/user/profile', (req, res) =>{
    Charity.find({'email': req.user.email}, (err, docs) =>{
        if(err){
            console.log(err);
        }
        
        docs[0].name = req.body.name;
        docs[0].contact = req.body.contact;
        docs[0].email = req.user.email;
        docs[0].phone = req.body.phone;
        docs[0].address = req.body.address;
        docs[0].city = req.body.city;
        docs[0].state = req.body.state;
        docs[0].website = req.body.website;
        docs[0].description = req.body.description;
        docs[0].created = new Date();
        
        docs[0].save();
        
        console.log("Edited Data",docs[0])
        
        res.render('user/profile', {title: 'Stop Food Waste', userData:req.user, data:docs[0]}); 
    });
//    res.redirect('/user/profile');
    
});

router.get('/user/image-gallery', (req, res) => {
    res.render('user/image-gallery', {title: 'Image Gallery || Stop Food Waste', userData:req.user}); 
});



module.exports = router;