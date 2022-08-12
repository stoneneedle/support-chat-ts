const express = require('express');
const Nedb = require('nedb');
const db = new Nedb('database.db');
db.loadDatabase();
console.log('DB is running')
const app = express();
const cors = require('cors');

var md5 = require("md5");
var PORT = 5050;
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api", (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.json({"users": ["userOne", "userTwo", "userThree", "userFour"]});
});

app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
});

// database insert

db.insert({Date: Date()});

db.find({}, function (err, output) {
    console.log(output);
});