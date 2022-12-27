var express = require('express');
var path = require('path');
var fs = require('fs');
const { Db } = require('mongodb');
const { render } = require('ejs');
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
var db = null;

MongoClient.connect("mongodb://0.0.0.0:27017", { useNewUrlParser: true }, function(err, client)  {
  if(err) throw err;
  db = client.db('ProjectDB');
});


// login POST 

app.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var collection = db.collection('Users');  // get reference to the collection
  collection.find({username: username , password: password}, {$exists: true}).toArray(function(err, docs) //find if documents that satisfy the criteria exist
  {     
    if(docs.length > 0) //if exists
    {
      res.render('home');
    }
    else // if it does not 
    { 
      res.render('login');
    }
  });
  
});

// registration

app.post('/register', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var collection = db.collection('Users');  // get reference to the collection
  collection.find({username: username}, {$exists: true}).toArray(function(err, docs) //find if documents that satisfy the criteria exist
  {     
    if(docs.length > 0) //if exists
    {
      res.render('registration');
     
    }
    else // if it does not 
    {
      db.collection('Users').insertOne({username : username, password : password}), function(err, result) {
      }
      console.log("1 document inserted");
      
      res.render('home');
    }
  });
  
});
  



app.listen(3000); 
