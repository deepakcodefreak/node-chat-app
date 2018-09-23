var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('hh:m a')
  console.log('newMessage', message);
  var li = jQuery('<li></li>')
  li.text(`${message.from} ${formattedTime}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('welcomeMessage',function(message){
  console.log(message);
})


socket.on('newUser',function(message) {
  console.log(message);
})


jQuery('#message-form').on('submit',function(e){
  e.preventDefault();

var messageTextBox = jQuery('[name=message]');

socket.emit('createMessage',{
  from:'User',
  text:messageTextBox.val()
},function(){
messageTextBox.val('')
})

})


socket.on('newLocationMessage',function(message){
  var formattedTime = moment(message.createdAt).format('h:mm a');
  console.log(message.url);
  var li = jQuery('<li></li>');
  var a= jQuery('<a target="_blank"> My current Location </a>');

  li.text(`${message.from} ${formattedTime}`);
  a.attr('href',message.url);
  li.append(a);
  jQuery('#messages').append(li);
})





var locationButton = jQuery('#send-location');

locationButton.on('click',function(){
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

locationButton.attr('disabled','disabled').text('sending location ...');

navigator.geolocation.getCurrentPosition(function(position){
  locationButton.removeAttr('disabled').text('Send Location');
  socket.emit('createLocationMessage',{
    latitude:position.coords.latitude,
    longitude:position.coords.longitude
  })
},function(){
  locationButton.removeAttr('disabled').text('Send Location');
  alert('Unable to fetch your location');
})

})
