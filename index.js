const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require('cors');
// var socket = io.connect('https://chat-now-seva.onrender.com/');

const PORT = process.env.PORT || 3030;

app.use(cors());

const io = new Server(server, {
    cors: {
        origin:"https://chat-now-seva.onrender.com",
    },
});

// var socket = io.connect('https://chat-now-seva.onrender.com/');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    // Listen for disconnect event
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    // Listen for chat-message event
    socket.on('chat-message', (msg) => {
        console.log('message: ' + msg);
        

        // Broadcast the message to all connected clients
        io.emit('chat-message', msg);
    });
});

server.listen(PORT, function () {
    console.log(`Server is running on ${PORT}`);
});
