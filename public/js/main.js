const socket = io();
const form = document.getElementById('chat-form');

socket.on("message", (data) => outputChatMessage(data))

form.addEventListener("submit",(event) => {
    event.preventDefault();
    const message = event.target.msg.value;
    socket.emit("ChatMessage",message);
})

// نمایش پیام ارسالی کاربر
function outputChatMessage(chatMessage) {
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `<p class="meta">محمد <span>9:12pm</span></p>
    <p class="text">
       ${chatMessage}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}