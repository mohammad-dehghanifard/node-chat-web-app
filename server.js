const express = require('express');
const socket = require('socket.io');
const path = require('path');
const http = require('http');
const messageHandler = require('./utils/chat_message_handeler');
const {joinUser,getCurrentUser} = require("./service/user_service");

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(express.static(path.join(__dirname, "public")));

//connection => یک ایونت از قبل تعریف شده هست
io.on("connection", (socket) => {

    socket.on("JoinRoom",({username,room}) => {

        const user = joinUser(socket.id,username,room);
        //جدا کردن روم ها از هم
        socket.join(user.room);
        socket.emit('message',messageHandler("mohammad","به چت روم ما خوش آمدید"));
        socket.broadcast.to(user.room).emit('message',messageHandler("mohammad",`${user.username}  به چت وارد شد`))

        //broadcast => پیام برای تمام کاربران به حاضر در چت به غیر از کاربر جاری ارسال میشه
        //socket.broadcast.emit('message',"user join the chat server");
    })



    socket.on("ChatMessage", (message) =>{
        io.emit('message',messageHandler("mohammad",message));
    })
})



server.listen(9090,() => {
    console.log("Listen on 9090")
});

