var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser  = require('cookie-parser');
var multer = require('multer');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var connectionString = 'mongodb://127.0.0.1:27017/cs5610';
var db = mongoose.connect(process.env.OPENSHIFT_MONGODB_DB_URL || connectionString);

app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(session({ secret: 'priyanka'}));
app.use(cookieParser('priyanka'));
app.use(passport.initialize());
app.use(passport.session());


require("./public/assignment/server/app.js")(app,mongoose,db);
require("./public/project/server/app.js")(app);

app.listen(port, ipaddress);
