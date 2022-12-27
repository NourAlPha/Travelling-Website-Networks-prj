var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// login page

app.get('/', function(req, res) {
  res.render('login')
});

app.get('/registration', function(req, res) {
  res.render('registration')
});

app.get('/home', function(req, res) {
  res.render('home')
});


// Home page buttons

app.get('/hiking', function(req, res) {
  res.render('hiking')
});

app.get('/cities', function(req, res) {
  res.render('cities')
});

app.get('/islands', function(req, res) {
  res.render('islands')
});

app.get('/wanttogo', function(req, res) {
  res.render('wanttogo')
});

// Hiking page buttons

app.get('/inca', function(req, res) {
  res.render('inca')
});

app.get('/annapurna', function(req, res) {
  res.render('annapurna')
});


// Cities page buttons

app.get('/paris', function(req, res) {
  res.render('paris')
});

app.get('/rome', function(req, res) {
  res.render('rome')
});

// Islands page buttons

app.get('/bali', function(req, res) {
  res.render('bali')
});

app.get('/santorini', function(req, res) {
  res.render('santorini')
});


var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017", function (err, client) {
  if(err) throw err;
  var db = client.db('ProjectDB');
  //var collection = db.collection('FirstCollection');
  db.collection('FirstCollection').insertOne( { id: 1, name: Omar } );  
});



app.listen(3000); 
