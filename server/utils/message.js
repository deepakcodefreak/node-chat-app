var generateMessage = (from,text)=>{
  return {
    from,
    text,
    createdAt:new Date().getTime()
  }
}


var generateLocationMessage = (user,lat,long)=>{
  return {
    from:user,
    url:`https://www.google.com/maps?q=${lat},${long}`,
    createdAt:new Date().getTime()
  }
}


module.exports = {generateMessage,generateLocationMessage};
