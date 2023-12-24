const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require('cors');
var total_user =0;
// var socket = io.connect('https://chat-now-seva.onrender.com/');

const PORT = process.env.PORT || 3030;

app.use(cors());

const io = new Server(server, {
    cors: {
        origin:"https://anonymously-chat-now.onrender.com/",
    },
});

// var socket = io.connect('https://chat-now-seva.onrender.com/');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/about', function(req,res){
    res.sendFile(__dirname + '/public/about.html');
})

io.on('connection', (socket) => {
    console.log('a user connected');
    total_user++;
    console.log(`No. of Users online : ${total_user}`);

    // Listen for disconnect event
    socket.on('disconnect', () => {
        console.log('user disconnected');
        total_user--;
        console.log(`No. of Users online : ${total_user}`);
    });

    // Listen for chat-message event
    socket.on('chat-message', (msg) => {
        console.log('message: ' + msg);
        console.log(total_user);
        

        // Broadcast the message to all connected clients
        io.emit('chat-message', msg);
    });
});

server.listen(PORT, function () {
    console.log(`Server is running on ${PORT}`);
});
