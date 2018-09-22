const path = require('path');
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname,'../public')
const port  = process.env.PORT||3000;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('New user connected');

  socket.on('createMessage',(message)=>{
    console.log('Message',message);
    io.emit('newMessage',{
    from:message.from,
    message:message.text,
    createdAt:new Date().getTime()
  })
});


socket.on('disconnect',()=>{
    console.log('Disconnect from client');
});

});


server.listen(port,()=>{
  console.log(`App is live on port ${port}`);
})
