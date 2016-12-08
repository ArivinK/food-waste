var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Info = require('../models/info');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Info.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use('local.add-info', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done){
    
    Info.findOne({'email': email}, function(err, user){
        if(err){
            return done(err);
        }
        
        if(user){
            return done(null, false, {errorMessage: 'Email Already Exist'})
        }
        
        var newInfo = new Info();
        newInfo.donor = req.body.donor;
        newInfo.name = req.body.name;
        newInfo.email = req.body.email;
        newInfo.password = newInfo.encryptPassword(req.body.password);
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
                return done(err)
            }
            return done(null, newInfo);
        });
        
    });
    
}));


passport.use('local.login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done){
    
    Info.findOne({'email': email}, function(err, user){
        if(err){
            return done(err);
        }
        
        if(!user){
           return done(null, false, {errorMessage: 'User does not exist'}) 
        }
        
        if(!user.validPassword(password)){
             return done(null, false, {errorMessage: 'Password is invalid'}) 
        }
        return done(null, user);
        
    });
    
}));





