var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Info = require('../models/info');
var Charity = require('../models/charity');

router.get('/user/add-info', (req, res) => {
   res.render('user/add-info', {title: 'Stop Food Waste - Add Information', userData:req.user});
});

router.post('/user/add-info', (req, res) => {
    
    var newInfo = new Info();
    newInfo.donor = req.body.donor;
    newInfo.name = req.body.name;
    newInfo.phone = req.body.phone;
    newInfo.address = req.body.address;
    newInfo.city = req.body.city;
    newInfo.state = req.body.state;
    newInfo.donortype = req.body.donortype;
    newInfo.food = req.body.food;
    newInfo.time = req.body.time;
    newInfo.created = new Date()

    newInfo.save(function(err, result){
        if(err){
            console.log(err);
        }
        
        res.render('user/add-info', {title: 'Stop Food Waste - Add Information', userData:req.user}); 
        
    });
    
});


router.get('/user/profile', (req, res) =>{
    res.render('user/profile', {title: 'Stop Food Waste', userData:req.user}); 
});

router.get('/user/view-charity', (req, res) =>{
    Charity.find({}, (err, data) => {
        res.render('user/view-charity', {title: 'Stop Food Waste', userData:req.user, orgData:data}); 
    });
    
});

router.get('/user/view-details/:id', (req, res) =>{
    Charity.findOne({'_id':req.params.id}, (err, data) => {
        res.render('user/view-details', {title: 'Stop Food Waste', userData:req.user, orgData:data}); 
    });
    
});





module.exports = router;