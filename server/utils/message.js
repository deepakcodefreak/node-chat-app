var moment = require('moment');

var generateMessage = (from,text)=>{
  return {
    from,
    text,
    createdAt:moment().valueOf()
  }
}


var generateLocationMessage = (user,lat,long)=>{
  return {
    from:user,
    url:`https://www.google.com/maps?q=${lat},${long}`,
    createdAt:moment().valueOf()
  }
}


module.exports = {generateMessage,generateLocationMessage};
