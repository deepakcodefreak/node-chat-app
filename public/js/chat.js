var socket = io();


function scrollToBottom(){
// selectors
var messages = jQuery('#messages');
var newMessage = messages.children('li:last-child');
// heights
var clientHeight = messages.prop('clientHeight');
var scrollTop = messages.prop('scrollTop');
var scrollHeight = messages.prop('scrollHeight');
var newMessageHeight = newMessage.innerHeight();
var lastMessageHeight = newMessage.prev().innerHeight();


if(clientHeight+scrollTop + innerHeight + lastMessageHeight >= scrollHeight){
  messages.scrollTop(scrollHeight);
}

}


socket.on('connect', function () {
  var params = jQuery.deparam(window.location.search);

  socket.emit('join',params,function(err){
    if (err){
      alert(err);
        window.location.href = '/';
    }else{
      console.log('no Error');
    }
  })
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('updateUserList',function(users){
  var ol = jQuery('<ol></ol>');

  users.forEach(function(user){
    ol.append(jQuery('<li></li>').text(user));
  })

  jQuery('#users').html(ol);
})


socket.on('newMessage', function (message) {

var formattedTime = moment(message.createdAt).format('hh:m a')
var template = jQuery('#message-template').html();
var html  = Mustache.render(template,{
  text:message.text,
  createdAt:formattedTime,
  from:message.from
});
jQuery('#messages').append(html);
scrollToBottom();
});



socket.on('newLocationMessage',function(message){
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-template').html()
  var html = Mustache.render(template,{
    from:message.from,
    createdAt:formattedTime,
    url:message.url

  });
  jQuery('#messages').append(html);
  scrollToBottom();
})


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
  text:messageTextBox.val()
},function(){
messageTextBox.val('')
})

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
