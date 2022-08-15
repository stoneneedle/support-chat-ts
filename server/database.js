// Run this script ONCE to create database
var cryptojs = require('crypto-js');
const Nedb = require('nedb');
const db = new Nedb('support-chatroom.db');
db.loadDatabase();

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

let names = ['stoney', 'Valek', 'Cay', 'Jezral', 'Mystra', 'RiaBear', 'Mazzik', 'Kirkos', 'Kneesaa', 'KJ', 'Nyx'];
let colors = ['#ff00ff', '#ff0000', '#00ff00', '#0000ff', '#00ffff', '#ffff00', '#777777', '#eeeeee'];
let messageBodies = ['Heya!', 'Sup', 'I\'ma lurk for a while...', 'Yo', 'Quiet in here today...', 'Hi chums',
  'Where is everyone at?', 'Wut'];

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
  };

  messages.push(random_message);
}

chatroom = {
  messages: messages,
};

db.insert({chatroom: chatroom, _id: 0});
console.log('DB populated.');
