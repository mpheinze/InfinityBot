/* COMMANDLIST COMMAND */

const fs = require('fs');   
const Discord = require('Discord.js');

exports.run = async (client, message, args, level) => {

    var i = 0;
    var msgString = '';

    await fs.readdir('./commands/', (err, files) => {
        if (err) throw err;
        for (i=0;i<files.length;i++) {
            files[i] = files[i].slice(0,-3);
            msgString += files[i] + ', ';
        };
        const embed = new Discord.RichEmbed()
        embed.setTitle('__InfinityBot Commandlist:__');
        embed.setDescription(msgString.slice(0,-2));
        //console.log({embed});
        message.channel.send({embed});
    });
}
