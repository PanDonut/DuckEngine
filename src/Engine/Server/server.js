const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

io.on('data', (id, data) => {
  serverData[id] = data;
});

server.listen(process.env.PORT, () => {
  console.log(`listening on *:${process.env.PORT}`);
});


var serverData = {};

app.get('/data', (req, res) => res.json(serverData));