// Dependencies
const express = require('express');
const fs = require('fs');
var cryptojs = require('crypto-js');
var bodyParser = require("body-parser");
const cors = require('cors');
var Datastore = require('nedb')
  , db = new Datastore({ filename: 'support-chatroom.db' });

// Server configuration
const PORT = 5051;

// Fix for semantic issue documented here: https://github.com/louischatriot/nedb/issues/266
fs.readFile('support-chatroom.db', (err, data) => {
  let dbFile = JSON.parse(data.toString());
  db.loadDatabase();
  db.insert({chatroom: dbFile.chatroom, _id: 0});
});

console.log('DB is running');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});

app.get("/api", (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.json({"users": ["userOne", "userTwo", "userThree", "userFour"]});
});

app.get("/api/v1/messages", (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:5173');

  db.find({_id: 0}, function (err, chatRoomObj) {
    let allMessages = chatRoomObj[0].chatroom.messages;

    res.json({
      "messages": allMessages
    });
  });

});

app.post("/api/v1/addmessage", (req, res) => {
  let errors = [];
  if (!req.body.message) {
    errors.push("No message specified.");
  }
  if (errors.length){
    res.status(400).json({"error":errors.join(",")});
    return;
  }
  let data = {
    message: req.body.message
  };

  console.log('RUNNING');

  db.find({_id: 0}, function (err, chatRoomObj) {
    console.log('FOUND');
    let newMessage = {message: req.body.message};
    foundChatRoomObj = chatRoomObj[0];
    console.log(foundChatRoomObj);
    let updatedChatRoomObj = JSON.parse(JSON.stringify(foundChatRoomObj));
    updatedChatRoomObj.chatroom.messages.push(newMessage);
    console.log(updatedChatRoomObj);
  
    db.update({_id: 0}, {chatroom: updatedChatRoomObj.chatroom}, {}, function(err, objReplaced) {
      db.persistence.compactDatafile();
    });
  
  });

  res.json({
    "message": "success",
    "data": data,
  });

});


