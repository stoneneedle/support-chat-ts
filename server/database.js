// Run this script ONCE to create database

const Nedb = require('nedb');
const db = new Nedb('support-chatroom.db');
db.loadDatabase();
console.log('DB is running');

// Initial database state

let chatroom = {};
let message =       {
  message: "hello world",
  name: "testuser1",
  color: "#ff00ff",
  password: "13d249f2cb4127b40cfa757866850278793f814ded3c587fe5889e889a7a9f6c",
  image_url: "",
  page_url: "",
  icon_url: "",
};

let message2 = {
  message: "hello world",
  name: "testuser2",
  color: "#ff0000",
  password: "9f6567a6d8a2eae61a1139b193c981dd6fcc2399f07760dec8de3d469decf5aa",
  image_url: "",
  page_url: "",
  icon_url: "",
};

chatroom = {
  messages: [message, message2],
};

db.insert({chatroom: chatroom, _id: 0});
