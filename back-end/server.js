var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var mongo = require('mongodb').MongoClient;
var mongoose = require('mongoose');

var database;
var Message = mongoose.model('Message',{
    msg:String
});

app.use(bodyParser.json())

app.use(function(req,res,next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type,  Authorization");
    next();
})

//get the messages from the collection
app.get('/api/message', GetMessages);

//post a new massage into the collection
app.post('/api/message', function(req,res){
    console.log(req.body);
    var message = new Message(req.body);
    message.save();
    res.status(200);
});


//return all of the messages from the collection
function GetMessages(req,res){
    Message.find({}).exec(function(err,result){
        res.send(result);
    })
}

mongoose.connect("mongodb://localhost:27017/test",function(err,db){
    if(!err){
        console.log("we are connected to mongo");
    }
    else {
        console.log("maaah, shitsticks!");
        console.log(err);
    }
    
})

var server = app.listen(5000,function(){
    console.log('listening on port ',server.address().port)
});