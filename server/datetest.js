var d = new Date();

const timeFormat = (date) => {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var ampm = hours >= 12 ? 'pm' : 'am';

  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  var strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;

  return strTime;
};

const timeZone = (date) => {
  var timezone = date.getTimezoneOffset() / 60;
  return timezone;
}

// console.log(timeFormat(d));
// console.log(timeZone(d));

console.log(new Date().toLocaleTimeString('en-US', { timeZone: 'UTC'}));