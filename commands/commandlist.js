/* COMMANDLIST COMMAND */

const fs = require('fs');   
var i = 0;
var msgString = '__InfinityBot Commandlist:__ \n';

exports.run = async (client, message, args, level) => {

    fs.readdir('./commands/', (err, files) => {
        if (err) throw err;
        for (i=0;i<files.length;i++) {
            files[i] = files[i].slice(0,-3);
            msgString += files[i] + ', ';
            if (i===files.length) msgString.slice(0,-2);
        }
        message.channel.send(msgString);
    })
}