const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');

const app = express();
const publicPath = path.join(__dirname, '../public');
const server = http.createServer(app);
const port = process.env.PORT || 3000;
var io = socketIO(server);

//setup start page
app.use(express.static(publicPath));
io.on('connection', (socket) => {
    console.log('New User connected');
    socket.on('disconnect', (reason) => {
        console.log('User disconnected from the server');
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
});