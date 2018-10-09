const path = require('path');
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const {generateMessage} = require('./utils/message.js')
const {isRealString} = require('./utils/validation')
const {generateLocationMessage} = require('./utils/message.js')
const {User} = require('./utils/users');

const publicPath = path.join(__dirname,'../public')
const port  = process.env.PORT||3000;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new User();



app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('New user connected');



socket.on('join',(params,callback)=>{
if(!isRealString(params.name)||!isRealString(params.room)){
  return callback('name and room name are required');
}
socket.join(params.room);
users.removeUser(socket.id);
users.addUser(socket.id,params.name,params.room);

//socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} joined the room`))
//socket.emit('newMessage',generateMessage('admin',`Welcome to chat room ${params.room}`))
io.to(params.room).emit('updateUserList',users.getUserList(params.room));
socket.emit('newMessage',generateMessage('Admin','Welcome to chat APP'));
socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',` ${params.name}  joined the room`));
callback();
})

  socket.on('createMessage',(message,callback)=>{
    console.log('Message',message);
    var user = users.getUser(socket.id);

    if(user && isRealString(message.text))
    {

        //console.log(generateMessage(user[0].name,message.text));
        io.to(user[0].room).emit('newMessage',generateMessage(user[0].name,message.text))

    }


    callback();

});

socket.on('createLocationMessage', (coords) => {
  var user = users.getUser(socket.id);

  if (user) {
    io.to(user[0].room).emit('newLocationMessage', generateLocationMessage(user[0].name, coords.latitude, coords.longitude));
  }
});


socket.on('disconnect',()=>{

  var user = users.removeUser(socket.id);
  if(user)
  {

      io.to(user[0].room).emit('updateUserList',users.getUserList(user[0].room));
      io.to(user[0].room).emit('newMessage',generateMessage('Admin',`${user[0].name} left the room`))
  }
});




});


server.listen(port,()=>{
  console.log(`App is live on port ${port}`);
})
