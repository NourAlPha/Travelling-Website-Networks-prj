var express = require('express');
var path = require('path');
var fs = require('fs');
//const { Db } = require('mongodb');
//const { render } = require('ejs');
var app = express();
var session = require('express-session');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'ssshhhhh!', saveUninitialized: true, resave: true }));

// DB Connection
var MongoClient = require('mongodb').MongoClient;
var db = null;

MongoClient.connect("mongodb://0.0.0.0:27017", { useNewUrlParser: true }, function(err, client)  {
  if(err) throw err;
  db = client.db('ProjectDB');
});


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
  var username = req.session.username;
  var place = "Inca Trail";
  var collection = db.collection('Users');  // get reference to the collection
  collection.find({username: username}, {$exists: true}).toArray(function(err, docs) //find if documents that satisfy the criteria exist
  {     
    if(docs[0].wanttogo.includes(place)) //if exists
    {
      res.render('inca' , {message: true});
    }
    else // if it does not 
    { 
      res.render('inca' , {message: false});
    }
  });
});

app.get('/annapurna', function(req, res) {
  var username = req.session.username;
  var place = "Annapurna";
  var collection = db.collection('Users');  // get reference to the collection
  collection.find({username: username}, {$exists: true}).toArray(function(err, docs) //find if documents that satisfy the criteria exist
  {     
    if(docs[0].wanttogo.includes(place)) //if exists
    {
      res.render('annapurna' , {message: true});
    }
    else // if it does not 
    { 
      res.render('annapurna' , {message: false});
    }
  });
});


// Cities page buttons

app.get('/paris', function(req, res) {
  var username = req.session.username;
  var place = "Paris";
  var collection = db.collection('Users');  // get reference to the collection

  collection.find({username: username}, {$exists: true}).toArray(function(err, docs) //find if documents that satisfy the criteria exist
  {  
    console.log(docs[0].wanttogo);   
    if(docs[0].wanttogo.includes(place)) //if exists
    {
      res.render('paris' , {message: true});
    }
    else // if it does not 
    { 
      res.render('paris' , {message: false});
    }
  });
});

app.get('/rome', function(req, res) {
  var username = req.session.username;
  var place = "Rome";
  var collection = db.collection('Users');  // get reference to the collection
  collection.find({username: username}, {$exists: true}).toArray(function(err, docs) //find if documents that satisfy the criteria exist
  {     
    if(docs[0].wanttogo.includes(place)) //if exists
    {
      res.render('rome' , {message: true});
    }
    else // if it does not 
    { 
      res.render('rome' , {message: false});
    }
  });
});

// Islands page buttons

app.get('/bali', function(req, res) {
  var username = req.session.username;
  var place = "Bali";
  var collection = db.collection('Users');  // get reference to the collection
  collection.find({username: username}, {$exists: true}).toArray(function(err, docs) //find if documents that satisfy the criteria exist
  {     
    if(docs[0].wanttogo.includes(place)) //if exists
    {
      res.render('bali' , {message: true});
    }
    else // if it does not 
    { 
      res.render('bali' , {message: false});
    }
  });
});

app.get('/santorini', function(req, res) {
  var username = req.session.username;
  var place = "Santorini";
  var collection = db.collection('Users');  // get reference to the collection
  collection.find({username: username}, {$exists: true}).toArray(function(err, docs) //find if documents that satisfy the criteria exist
  {     
    if(docs[0].wanttogo.includes(place)) //if exists
    {
      res.render('santorini' , {message: true});
    }
    else // if it does not 
    { 
      res.render('santorini' , {message: false});
    }
  });
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
      req.session.username = username;
      res.render('home');
    }
    else // if it does not 
    { 
      res.render('login', {message: "Wrong Credentials"});
    }
  });
  
});

// registration

app.post('/register', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var wanttogo = [];
  var collection = db.collection('Users');  // get reference to the collection
  collection.find({username: username}, {$exists: true}).toArray(function(err, docs) //find if documents that satisfy the criteria exist
  {     
    if(docs.length > 0) //if exists
    {
      res.render('registration' , {message: "Username already exists"});
     
    }
    else // if it does not 
    {
      db.collection('Users').insertOne({username : username, password : password , wanttogo : wanttogo}), function(err, result) {
      }
      req.session.username = username;
      res.render('home');
    }
  });
  
});

// want to go

app.post('/wanttogolist', function(req, res) {
  var username = req.session.username;
  console.log(username);
  var place = req.body.place;
  var collection = db.collection('Users');  // get reference to the collection

  db.collection("Users").updateOne({username: {$eq: username}}, {
    $push: {
        wanttogo: place
     }
 });
  res.render('home');
});
  



app.listen(3000); 
