const express = require('express');
const socket = require('socket.io');
const path = require('path');
const http = require('http');
const messageHandler = require('./utils/chat_message_handeler');

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(express.static(path.join(__dirname, "public")));

//connection => یک ایونت از قبل تعریف شده هست
io.on("connection", (socket) => {
    socket.emit('message',messageHandler("mohammad","user join the chat server"))
    //broadcast => پیام برای تمام کاربران به حاضر در چت به غیر از کاربر جاری ارسال میشه
    //socket.broadcast.emit('message',"user join the chat server");

    socket.on("ChatMessage", (message) =>{
        io.emit('message',messageHandler("mohammad",message));
    })
})



server.listen(9090,() => {
    console.log("Listen on 9090")
});

