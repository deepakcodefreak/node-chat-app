const path = require('path');
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const {generateMessage} = require('./utils/message.js')

const publicPath = path.join(__dirname,'../public')
const port  = process.env.PORT||3000;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('New user connected');

socket.emit('welcomeMessage',generateMessage('Admin','Welcome to chat APP'));

socket.broadcast.emit('newUser',generateMessage('Admin','New user joined'));



  socket.on('createMessage',(message,callback)=>{
    console.log('Message',message);

    io.emit('newMessage',generateMessage(message.from,message.text))
    callback('This is from server');
// socket.broadcast.emit('newMessage',{
//   from:message.from,
//   text:message.text,
//   createdAt:new Date().getTime()
// })
//
});


socket.on('disconnect',()=>{
    console.log('Disconnect from client');
});

});


server.listen(port,()=>{
  console.log(`App is live on port ${port}`);
})
