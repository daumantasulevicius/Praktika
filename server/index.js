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

var newID = 0;
var connectedUsers = [];
// Array of random words
var words = ["sky", "earth", "fire", "water", "wind","telephone",
             "engine", "keyboard", "screen", "snow", "react", "script",
            "intern", "job", "experience"];

// Endpoint for user to connect to server
app.post('/connect', function(req, res){
    var randWord = words[Math.floor(Math.random()*words.length)]; // Gets random word from word array
    var user = {
            "id" : newID,
            "name" : req.body.name,
            "tries_left" : 10,
            "word" : randWord,
            "shown_word" : randWord.replace(/\D/g, "_"),    // Replaces the letters in word with underscores
            "tried_letters" : [],
            "letters_left" : randWord.length
        } 

    newID = newID + 1;
    connectedUsers.push(user); // Adds user to connected user array
    console.log(connectedUsers);
    res.end(JSON.stringify(user)); // Sends data about connected user
})

// Endpoint for user to try to guess a letter
app.post('/try', function(req, res){
    var letter = req.body.letter.toLowerCase();
    var id = req.body.id;
    
    var user = connectedUsers.find(element => element.id === id); // Find the user object in array with corresponding id
    if(user){                                                     // Check if user exists
        if(user.tries_left > 0){                                  // Check if user has not used 10 of his tries
            if(!user.tried_letters.includes(letter)){             // Check if user has already guessed this letter
                user.tries_left = user.tries_left - 1;            // Decrement tries user has left
                user.tried_letters.push(letter);                  // Add the tried letter to the tried letter array
                if(user.word.includes(letter)){                   // Check if user's word contains the tried letter
                    const indexes = [...user.word.matchAll(new RegExp(letter, "gi"))].map(a => a.index);    // Find indexes of the guessed letter in the word
                    user.letters_left = user.letters_left - indexes.length;     // Decrement how many letters the user has left to guess
                    for(var i = 0; i < indexes.length; i++){
                        user.shown_word = user.shown_word.substr(0, indexes[i]) + letter + user.shown_word.substr(indexes[i] + 1); // Show the correctly guessed letter in the word
                    }
                }
                res.end(JSON.stringify(user));  // Sends data about the user
            }
        }
        else{                               // If user has no more tries left
            res.end("No more tries left");  // Send text message to user
        }
        console.log(user);  
    }
})

// Endpoint for user to get a new word
app.post('/restart', function(req, res){
    var id = req.body.id;
    var user = connectedUsers.find(element => element.id === id); // Find the user object in array with corresponding id
    if (user){
        var randWord = words[Math.floor(Math.random()*words.length)]; // Get a new word from the word array
        user.word = randWord;
        user.shown_word = randWord.replace(/\D/g, "_"); // Replaces the letters in word with underscores
        user.tries_left = 10;
        user.tried_letters = [];
        user.letters_left = randWord.length;
    }
    res.end(JSON.stringify(user));  // Sends data about the user
})

// Endpoint for user to disconnect from server and delete it's object
app.post('/disconnect', function(req, res){
    var id = req.body.id;
    var userIndex = connectedUsers.findIndex(element => element.id === id); // Find the user object index in array with corresponding id
    connectedUsers.splice(userIndex, 1);    // Remove the user object from the connected user array
    console.log(connectedUsers);
    res.end("Disconnected");    // Sends text message about disconnection
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
 })