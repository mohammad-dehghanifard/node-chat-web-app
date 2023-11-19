const moment = require("moment");

function chatMessageHandler(username,text){
    return {
        username,
        text,
        time: moment().format('hh:mm a'),
    }
}

module.exports = chatMessageHandler;