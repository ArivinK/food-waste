var express = require('express');
var router = express.Router();
var moment = require('moment');

//AIzaSyC2rTr_2XIaCMerWxt3VTdZ1-e0n9XXJvM


var User = require('../models/user');
var Info = require('../models/info');


router.get('/user/home', (req, res) => {
    
    Info.find(function(err, data){
        res.render('user/home', {title: 'Stop Food Waste - Homepage', userData:req.user, infoData:data}); 
    });
});

router.get('/user/add-profile', (req, res) =>{
    res.render('user/add-profile', {title: 'Stop Food Waste - Add Profile', userData:req.user}); 
});

router.get('/user/details/:id', (req, res) =>{
     
    Info.findOne({'_id':req.params.id}, function(err, data){
        var d = data.time;
        //var dateTime = d.getDate() + '-' + (d.getMonth()+1) + '-' + d.getFullYear()
        
        var dateval = moment(d).format('MMMM Do, YYYY');
        
        res.render('user/details', {title: 'Stop Food Waste', userData:req.user, infoData:data, dateTime:dateval});
    });
});



module.exports = router;