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
const REMOVE_INACTIVE_TIMEOUT = 10_000_000
let userlist = [];

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

// Test API
app.get("/api", (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.json({"users": ["userOne", "userTwo", "userThree", "userFour"]});
});

// Read messages
app.get("/api/v1/messages", (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:5173');

  db.find({_id: 0}, function (err, chatRoomObj) {
    let allMessages = chatRoomObj[0].chatroom.messages;

    res.json({
      "messages": allMessages
    });
  });

});

// Read active users
app.get("/api/v1/activeusers", (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:5173');

  res.json({
    "userlist": userlist
  });

});

// Create message in chat
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
    msgType: req.body.msgType,
    message: req.body.message,
    name: req.body.name,
    color: req.body.color,
    password: req.body.password,
    imageUrl: req.body.imageUrl,
    pageUrl: req.body.pageUrl,
    iconUrl: req.body.iconUrl,
    ident: req.body.ident,
    auth: req.body.auth,
  };

  db.find({_id: 0}, function (err, chatRoomObj) {
    let newMessage = {
      msgType: req.body.msgType,
      message: req.body.message,
      name: req.body.name,
      color: req.body.color,
      password: req.body.password,
      imageUrl: req.body.imageUrl,
      pageUrl: req.body.pageUrl,
      iconUrl: req.body.iconUrl,
      ident: req.body.ident,
      auth: req.body.auth,
    };

    foundChatRoomObj = chatRoomObj[0];
    let updatedChatRoomObj = JSON.parse(JSON.stringify(foundChatRoomObj));
    
    // Active chat messages does not exceed 40
    if (updatedChatRoomObj.chatroom.messages.length <= 40) {
      updatedChatRoomObj.chatroom.messages.push(newMessage);

      db.update({_id: 0}, {chatroom: updatedChatRoomObj.chatroom}, {}, function(err, objReplaced) {
        db.persistence.compactDatafile();
      });
    } else {
      updatedChatRoomObj.chatroom.messages.shift();
      updatedChatRoomObj.chatroom.messages.push(newMessage);

      db.update({_id: 0}, {chatroom: updatedChatRoomObj.chatroom}, {}, function(err, objReplaced) {
        db.persistence.compactDatafile();
      });
    }
  });

  res.json({
    "message": "success",
    "data": data,
  });

});

// Authenticate potentially registered user
app.post("/api/v1/auth", (req, res) => {
  let errors = [];

  // if (!req.body.message) {
  //   errors.push("No message specified.");
  // }

  if (errors.length){
    res.status(400).json({"error":errors.join(",")});
    return;
  }

  let data = {
    name: req.body.name,
    password: req.body.password,
  }

  let auth = "none";

  db.find({_id: 0}, function (err, chatRoomObj) {
    let foundUsers = chatRoomObj[0].chatroom.users;

    for (let user of foundUsers) {
      if ((user.name === data.name) && (user.password === data.password)) {
        auth = user.type;
      }
    }

    res.json({
      auth: auth,
      data: data,
    });

  });



});

app.post("/api/v1/addactiveuser", (req, res) => {
  let errors = [];

  if (errors.length){
    res.status(400).json({"error":errors.join(",")});
    return;
  }

  let activeUser = {
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    ident: req.body.ident,
    lastPost: new Date(),
  };

  addActiveUser(activeUser);

  console.log(userlist);

  res.json({
    "message": "success",
    "activeUser": activeUser,
  });

});

// Helper functions
function randstr(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
    charactersLength));
  }
  return result;
}

// Userlist functions

// Add active user to userlist
function addActiveUser(activeUserObj) {
  let userExists = false;
  if (userlist.length !== 0) {
    for (user of userlist) {
      if (user.ident === activeUserObj.ident) {
        userExists = true;
        user.lastPost = activeUserObj.lastPost;
      }
    }
  }
  if (!userExists) {
    userlist.push(activeUserObj);
  }
}

// Remove active users from userlist on timeout
function dropActiveUsersOnTimeout() {
  let now = new Date();

  userlist = userlist.filter(function(user) {
    let diff = now - user.lastPost;
    return diff < REMOVE_INACTIVE_TIMEOUT;
  });

}

function testAddActiveUsers() {
  let names = ['stoney', 's', 'Valek', 'Cay', 'Jezral', 'Mystra', 'RiaBear', 'Mazzik', 'Kirkos', 'Kneesaa', 'KJ', 'Nyx'];
  for (let i = 0; i < names.length; i++) {
    let test_user = {
      name: names[Math.floor(Math.random()*names.length)],
      imageUrl: "img",
      ident: cryptojs.SHA1(randstr(10)).toString(),
      lastPost: new Date(new Date().setSeconds(Math.floor(Math.random()*60))),
    }
    userlist.push(test_user);
  }
}

testAddActiveUsers();

// Set interval for removing active users on timeout
setInterval(dropActiveUsersOnTimeout, 1000);

// Remove inactive users
//var REMOVE_INACTIVE_TIMEOUT = 5000; // currently thinking 10000000 (10 minutes)

