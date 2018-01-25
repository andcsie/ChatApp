var socket = io();
socket.on('connect', function(){
    console.log('Connected to server');

    socket.emit('createMessage', {
        from : "client",
        text : ""
    });
    
});

socket.on('newMessage', function(message){
    console.log(message);
});

socket.on('disconnect', function(){
    console.log('Disconnected from the server');
});