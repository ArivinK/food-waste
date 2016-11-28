var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var user = require('./controllers/user');

var app = express();

var db

mongoose.connect('mongodb://anu:happyanu123@ds113678.mlab.com:13678/fooddb');

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(bodyParser.json())




app.use(user);



app.listen(3000, () => {
    console.log('listening on 3000');
})