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

socket.on('disconnect', function(){
    console.log('Disconnected from the server');
});

$('#chatAppFrm').on('submit', function(event){
    event.preventDefault();
    socket.emit('createMessage',{
        from: 'User',
        text: $('#usrMsg').val()
    }, function(){

    });
});