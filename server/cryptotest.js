var cryptojs = require('crypto-js');

var hashStr = cryptojs.SHA256("testpass2").toString();
var hashStr2 = cryptojs.SHA256("testpass").toString();

console.log(hashStr);




