const express = require('express');
const Nedb = require('nedb');
const db = new Nedb('support-chatroom.db');
db.loadDatabase();
console.log('DB is running')
const app = express();
const cors = require('cors');

var md5 = require("md5");
var PORT = 5051;
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});

// Chat room messages init
let chatroom = {};
let message = {message: 'hello world'};
let message2 = {message: 'Cool chat'};

chatroom = {
  messages: [message, message2],
}

// Initial database state
db.insert({chatroom: chatroom, _id: 0});

app.get("/api", (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.json({"users": ["userOne", "userTwo", "userThree", "userFour"]});
});








// db.find({_id: 0}, function (err, chatRoomObj) {
//   let newMessage = {message: 'Hello there all'};
//   foundChatRoomObj = chatRoomObj[0];
//   let updatedChatRoomObj = JSON.parse(JSON.stringify(foundChatRoomObj));
//   updatedChatRoomObj.chatroom.messages.push(newMessage);

//   db.update({_id: 0}, {chatroom: updatedChatRoomObj.chatroom}, {}, function(err, objReplaced) {
//     db.persistence.compactDatafile();
//   });

// });

