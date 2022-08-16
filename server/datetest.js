var cryptojs = require('crypto-js');
var addMinutes = require('date-fns/addMinutes');
var compareAsc = require('date-fns/compareAsc');

// var d = new Date();

// const timeFormat = (date) => {
//   var hours = date.getHours();
//   var minutes = date.getMinutes();
//   var seconds = date.getSeconds();
//   var ampm = hours >= 12 ? 'pm' : 'am';

//   hours = hours % 12;
//   hours = hours ? hours : 12;
//   minutes = minutes < 10 ? '0' + minutes : minutes;
//   seconds = seconds < 10 ? '0' + seconds : seconds;
//   var strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;

//   return strTime;
// };

// const timeZone = (date) => {
//   var timezone = date.getTimezoneOffset() / 60;
//   return timezone;
// }

// console.log(timeFormat(d));
// console.log(timeZone(d));

//console.log(new Date().toLocaleTimeString('en-US', { timeZone: 'UTC'}));

// let userlist = [];

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

function addActiveUser() {
  new_user = {
    name: randstr(10),
    lastPost: new Date(),
  }
  userlist.push(new_user);
}

async function addActiveUsers() {
  console.log('Start making users...');
  addActiveUser();
  await new Promise(resolve => setTimeout(resolve, 1000));
  addActiveUser();
  await new Promise(resolve => setTimeout(resolve, 1000));
  addActiveUser();
  await new Promise(resolve => setTimeout(resolve, 1000));
  addActiveUser();
  await new Promise(resolve => setTimeout(resolve, 1000));
  addActiveUser();
  //console.log(userlist);

  var oldtime = userlist[1].lastPost;
  //console.log(oldtime);
  var now = new Date();
  var diff = now - oldtime;
  console.log(diff);
}

// addActiveUsers();
//console.log(new Date(new Date().setMinutes(Math.floor(Math.random()*10)).getMinutes()));

//console.log(addMinutes(new Date(), Math.random()*10));

//new Date(new Date().setSeconds(Math.floor(Math.random()*60)));

let sample_userlist = [];

// Debug - PCG add active users
function testAddActiveUsers() {
  let names = ['Stoney', 'S', 'Valek', 'Cay', 'Jezral', 'Mystra', 'RiaBear', 'Mazzik', 'Kirkos', 'Kneesaa', 'KJ', 'Nyx'];
  let names_size = names.length;
  for (let i = 0; i < names_size; i++) {
    let rand_name = names[Math.floor(Math.random()*names.length)];
    
    let test_user = {
      name: rand_name,
      imageUrl: "img",
      ident: cryptojs.SHA1(randstr(10)).toString(),
      lastPost: addMinutes(new Date(), Math.random()*10),
    }
    sample_userlist.push(test_user);
    names.splice(names.indexOf(rand_name), 1);
  }

  //console.log(sample_userlist);
}



testAddActiveUsers();

console.log(sample_userlist);

sample_userlist.sort((userA, userB) => {
  return compareAsc(userA.lastPost, userB.lastPost);
});

console.log(sample_userlist);