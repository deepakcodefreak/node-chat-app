const moment = require('moment');
var date = moment();
date.subtract(50,'minutes')
console.log(date.format('MMM Do YYYY : h:m:ss a'));
