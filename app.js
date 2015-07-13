var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(bodyParser.json()); // pull information from html in POST for middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());  // to remember the logged in user
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// passport config
var Account = require('./models/account'); // mongoose account schema
passport.use(new LocalStrategy(Account.authenticate())); //passprt.js strategy 
passport.serializeUser(Account.serializeUser()); //lets user stay logged in
passport.deserializeUser(Account.deserializeUser());

// mongoose
mongoose.connect('mongodb://localhost/passport_local_mongoose_express4'); 



module.exports = app;

