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
  if(req.session.username)
    res.render('home')
  else
     res.render('login' , {message: "Please login first"})  
});


// Home page buttons

app.get('/hiking', function(req, res) {
  if(req.session.username)
    res.render('hiking')
  else
     res.render('login' , {message: "Please login first"}) 
});

app.get('/cities', function(req, res) {
  if(req.session.username)
    res.render('cities')
  else
     res.render('login' , {message: "Please login first"}) 
});

app.get('/islands', function(req, res) {
  if(req.session.username)
    res.render('islands')
  else
     res.render('login' , {message: "Please login first"}) 
});

app.get('/wanttogo', function(req, res) {
  if(req.session.username) {
  var username = req.session.username;
  var collection = db.collection('Users');  // get reference to the collection
  collection.find({username: username}, {$exists: true}).toArray(function(err, docs){
    res.render('wanttogo' , {places: docs[0].wanttogo})
  });
  }
  else
      res.render('login' , {message: "Please login first"})
});

// Hiking page buttons

app.get('/inca', function(req, res) {
  if(req.session.username) {
  var username = req.session.username;
  var place = "Inca";
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
  }
  else  
    res.render('login' , {message: "Please login first"})
});

app.get('/annapurna', function(req, res) {
  if(req.session.username) {
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
  }
  else
    res.render('login' , {message: "Please login first"})
});


// Cities page buttons

app.get('/paris', function(req, res) {
  if(req.session.username) {
  var username = req.session.username;
  var place = "Paris";
  var collection = db.collection('Users');  // get reference to the collection

  collection.find({username: username}, {$exists: true}).toArray(function(err, docs) //find if documents that satisfy the criteria exist
  {   
    if(docs[0].wanttogo.includes(place)) //if exists
    {
      res.render('paris' , {message: true});
    }
    else // if it does not 
    { 
      res.render('paris' , {message: false});
    }
  });
  }
  else
    res.render('login' , {message: "Please login first"})
});

app.get('/rome', function(req, res) {
  if(req.session.username) {
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
  }
  else  
    res.render('login' , {message: "Please login first"})
});

// Islands page buttons

app.get('/bali', function(req, res) {
  if(req.session.username) {
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
  }
  else
    res.render('login' , {message: "Please login first"})
});

app.get('/santorini', function(req, res) {
  if(req.session.username) {
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
  }
  else
    res.render('login' , {message: "Please login first"})
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
      res.render('login' , {message: "Succesfully registered"});
    }
  });
});

// want to go

app.post('/wanttogolist', function(req, res) {
  if(req.session.username) {
  var username = req.session.username;
  var place = req.body.place;
  var collection = db.collection('Users');  // get reference to the collection

  db.collection("Users").updateOne({username: {$eq: username}}, {
    $push: {
        wanttogo: place
     }
 });
  res.render('home');
  }
  else
    res.render('login' , {message: "Please login first"})
});
  

// search results
app.post('/search', function(req, res) {
  if(req.session.username) {
  var word = req.body.Search;
  var array = ['Paris', 'Rome', 'Bali', 'Santorini', 'Inca', 'Annapurna'];
  var result = [];
  for(var i = 0; i < array.length; i++) {
    if(array[i].toLowerCase().includes(word.toLowerCase())) {
      result.push(array[i]);
    }
  }
  res.render('searchresults' , {result: result});
  }
  else
    res.render('login' , {message: "Please login first"})
});


// Preventing a user from accessing any page except login and registration without logging in first 


app.listen(3000); 
