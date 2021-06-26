const express=require('express')
var app=express();
//  var cookieParser = require('cookie-parser');

var db=require('./db/connection')
var todoRouter=require('./routes/todo')

 app.use(express.json());
 app.use(express.urlencoded({ extended: false }));
 
 //app.use(cookieParser());
 app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*'); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

db.connect((err)=>{
    if(err)
    {
      console.log("error in database connection"+err)
    }
    else{
      console.log("data base connected")
    }
  })
  

 
  app.listen(3000,()=>console.log('Server Running At Port 3000'))
  app.use('/',todoRouter)