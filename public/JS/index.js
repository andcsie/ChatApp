var socket = io();
socket.on('connect', function(){
    console.log('Connected to server');
    
});

socket.on('newMessage', function(message) {
    console.log('New message:', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $('#msgsHist').append(li);
});

socket.on('newLocationMessage', function(message){
    var li = jQuery('<li></li>');
    var anchor = jQuery('<a target="_blank">My current location</a>');
    li.text(`${message.from}: `);
    anchor.attr('href', message.url);
    li.append(anchor);
    $('#msgsHist').append(li);
});

socket.on('disconnect', function(){
    console.log('Disconnected from the server');
});

$('#chatAppFrm').on('submit', function(event){
    event.preventDefault();
    socket.emit('createMessage',{
        from: 'User',
        text: $('#usrMsg').val()
    }, function(){
        $('#usrMsg').val('');
    });
});

$('#sendLocation').on('click', function(){
    if (!navigator.geolocation){
        return alert('No geolocation available for your browser');
    }
    $('#sendLocation').attr('disabled','disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position){
        $('#sendLocation').removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
        });
    }, function(){
        $('#sendLocation').removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    });
});