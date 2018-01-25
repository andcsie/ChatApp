const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');

const app = express();
const publicPath = path.join(__dirname, '../public');
const server = http.createServer(app);
const port = process.env.PORT || 3000;
var io = socketIO(server);
const {generateMessage} = require('./utils/message');

//setup start page
app.use(express.static(publicPath));
io.on('connection', (socket) => {
    console.log('New User connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User joined'));

    socket.on('createMessage', (msg) => {
        io.emit('newMessage', generateMessage(msg.from, msg.text));
    });

    socket.on('disconnect', (reason) => {
        console.log('User disconnected from the server');
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
});