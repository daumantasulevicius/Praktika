var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require("fs");
var cors = require('cors');
const { json } = require('express');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors({
    origin: '*'
}));

var connectedUsers = [];
var words = ["dangus", "zeme", "ugnis", "vanduo", "oras", "kompiuteris"]

app.post('/connect', function(req, res){
    var randWord = words[Math.floor(Math.random()*words.length)];
    var user = {
            "name" : req.body.name,
            "tries_left" : 10,
            "word" : randWord,
            "shown_word" : randWord.replace(/\D/g, "_"),
            "tried_letters" : []
        } 


    connectedUsers.push(user);
    console.log(connectedUsers);
    res.end(JSON.stringify(user));
})

app.post('/try', function(req, res){
    var letter = req.body.letter;
    var name = req.body.name;
    
    var user = connectedUsers.find(element => element.name == name);
    if(user){
        if(user.tries_left > 0){
            user.tries_left = user.tries_left - 1;
            user.tried_letters.push(letter);
            if(user.word.includes(letter)){
                const indexes = [...user.word.matchAll(new RegExp(letter, "gi"))].map(a => a.index);
                //console.log(indexes);
                for(var i = 0; i < indexes.length; i++){
                    user.shown_word = user.shown_word.substr(0, indexes[i]) + letter + user.shown_word.substr(indexes[i] + 1);
                }
            }
            res.end(JSON.stringify(user));
        }
        else{
            res.end("No more tries left");
        }
        console.log(user);  
    }
})

app.post('/disconnect', function(req, res){
    var name = req.body.name;
    var userIndex = connectedUsers.findIndex(element => element.name == name);
    connectedUsers.splice(userIndex, 1);
    console.log(connectedUsers);
    res.end("Disconnected");
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
 })