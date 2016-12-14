var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var MongoStore = require('connect-mongo')(session);

var app = express();


var user = require('./controllers/user');
var ngo = require('./controllers/ngo');
var donor = require('./controllers/donor');

var db

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://anu:happyanu123@ds113678.mlab.com:13678/fooddb');

mongoose.connect('mongodb://localhost/foodwaste');
require('./config/passport');
//require('./config/pass');



app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(bodyParser.json())

app.use(session({
    secret: 'thisismysecretkey',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(user);
app.use(ngo);
app.use(donor);



app.listen(3000, () => {
    console.log('listening on 3000');
})