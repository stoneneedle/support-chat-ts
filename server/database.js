// Run this script ONCE to create database
var cryptojs = require('crypto-js');
var fs = require('fs');
const Nedb = require('nedb');
const db = new Nedb('support-chatroom.db');

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

// Initial database state

let chatroom = {};
let messages = [];

let names = ['stoney', 's', 'Valek', 'Cay', 'Jezral', 'Mystra', 'RiaBear', 'Mazzik', 'Kirkos', 'Kneesaa', 'KJ', 'Nyx'];
let colors = ['#ff00ff', '#ff0000', '#00ff00', '#0000ff', '#00ffff', '#ffff00', '#777777', '#eeeeee'];
let messageBodies = ['Heya!', 'Sup', 'I\'ma lurk for a while...', 'Yo', 'Quiet in here today...', 'Hi chums',
  'Where is everyone at?', 'Wut'];
let icons = ['nobody', 'droid2', 'st_aurora', 'st_eclipse', 'st_imp', 'st_jedimaster', 'st_nr2'];

// Sample message generation (for chat room testing)
for (let i = 0; i < 40; i++) {
  let random_message = {
    msgType: "msg",
    message: messageBodies[Math.floor(Math.random()*messageBodies.length)],
    name: names[Math.floor(Math.random()*names.length)],
    color: colors[Math.floor(Math.random()*colors.length)],
    password: cryptojs.SHA512(randstr(10)).toString(),
    imageUrl: "imgurl",
    pageUrl: "pageurl",
    iconUrl: icons[Math.floor(Math.random()*icons.length)],
    ident: cryptojs.SHA1(randstr(10)).toString(),
    auth: "user",
  };

  messages.push(random_message);
}

let message_log = [];

message_log.push(messages);

// Sample message log generation (for chat log testing)
for (let i = 0; i < 40; i++) {
  let random_message = {
    msgType: "msg",
    message: messageBodies[Math.floor(Math.random()*messageBodies.length)],
    name: names[Math.floor(Math.random()*names.length)],
    color: colors[Math.floor(Math.random()*colors.length)],
    password: cryptojs.SHA512(randstr(10)).toString(),
    imageUrl: "imgurl",
    pageUrl: "pageurl",
    iconUrl: "iconurl",
    ident: cryptojs.SHA1(randstr(10)).toString(),
    auth: "user",
  };

  message_log.push(random_message);
}

var users = [];

var admin = {
  name: "stoney",
  password: "dc5bd1a1db458385bb7523da3790d191d3eb56a69a54c5930d83d5d8f1015941966fa7701f9375b1a92c54e0e5a876b3775392705ae01dc44ce09ca0c356ad96",
  type: "admin",
}

var user1 = {
  name: "s",
  password: "dc5bd1a1db458385bb7523da3790d191d3eb56a69a54c5930d83d5d8f1015941966fa7701f9375b1a92c54e0e5a876b3775392705ae01dc44ce09ca0c356ad96",
  type: "user",
};

users.push(admin);
users.push(user1);

// User generation
for (let i = 2; i < names.length; i++) {
  let sample_user = {
    name: names[i].toLowerCase(),
    password: cryptojs.SHA512(randstr(10)).toString(),
    type: "user",
  };

  users.push(sample_user);
}

let active_users = [];

// active user generation
for (let i = 2; i < names.length; i++) {
  let sample_active_user = {
    name: names[i].toLowerCase(),
    imageUrl: '',
    ident: cryptojs.SHA1(randstr(10)).toString(),
    lastPost: new Date().toLocaleTimeString('en-US', { timeZone: 'UTC'}),
  };

  active_users.push(sample_active_user);
}

chatroom = {
  messages: messages,
  message_log: message_log,
  users: users,
  active_users: active_users,
};

//console.log(chatroom);

var sample_db_file = "testDatabase.json";

//Generate sample DB as JSON
fs.writeFile(sample_db_file, JSON.stringify(chatroom), (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("File written successfully\n");
    console.log("The written has the following contents:");
    console.log(fs.readFileSync(sample_db_file, "utf8"));
  }
});

db.loadDatabase();
db.insert({chatroom: chatroom, _id: 0});
console.log('DB populated.');
