const {username , room} = Qs.parse(location.search,{ignoreQueryPrefix:true});
const socket = io();
const form = document.getElementById('chat-form');
const chatMessageDiv = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const usersList = document.getElementById("users");

socket.emit("JoinRoom",{username, room});

socket.on("roomUsers",({users,room}) => {
    setRoomName(room);
    outPutRoomUsers(users);
})

socket.on("message", (data) => {
    outputChatMessage(data);
    // اسکرول شدن به آخرین پیام ارسالی
    chatMessageDiv.scrollTop = chatMessageDiv.scrollHeight;
} )

form.addEventListener("submit",(event) => {
    event.preventDefault();
    const message = event.target.msg.value;
    socket.emit("ChatMessage",message);
    event.target.msg.value = '';
    event.target.msg.focus();
})

// نمایش پیام ارسالی کاربر
function outputChatMessage(chatMessage) {
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `<p class="meta"> ${chatMessage.username}<span> ${chatMessage.time} </span></p>
    <p class="text">
       ${chatMessage.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

// نمایش نام اتاق چت کاربر
function setRoomName(room){
    roomName.innerHTML = room;
};

// دریافت و نمایش لیست کابران
function outPutRoomUsers(users) {
    usersList.innerHTML = "";
    users.forEach(user => {
        const li = document.createElement("li");
        li.innerHTML = user.username;
        usersList.appendChild(li);
    });
}