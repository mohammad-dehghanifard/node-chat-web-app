const express = require('express');
const socket = require('socket.io');
const path = require('path');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (stream)=>{
    console.log("Connection established...");
})

app.listen(9090,() => {
    console.log("Listen on 9090")
});

