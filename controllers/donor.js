var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Info = require('../models/info');

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
    newInfo.val = '0',
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





module.exports = router;