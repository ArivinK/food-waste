var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');
var Info = require('../models/info');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done){
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var role = req.body.role;
    
    User.findOne({'email': email}, function(err, user){
        if(err){
            return done(err);
        }
        
        if(user){
            return done(null, false, {errorMessage: 'Email Already Exist'})
        }
        
        var newUser = new User();
        newUser.name = name;
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.role = role;
        
        newUser.save(function(err, result){
            if(err){
                return done(err)
            }
            return done(null, newUser);
        });
        
    });
    
}));

passport.use('local.login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done){
    
    User.findOne({'email': email}, function(err, user){
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






