// Test Code for learning JS //

const prefix = '!';
const Discord = require('Discord.js');
const Client = new Discord.Client({commandPrefix: prefix});
const token = require('C:/token/token.json');
const fs = require('fs')

// Client online
Client.on('ready', () => {
    console.log(`Logged in as ${Client.user.tag}!`);
  });

// Return all members of channel
Client.on('message', (message) => {
    if (message.content.match('users')) {
        var userlist = '';
        for(count in Client.users.array()){
            var user = Client.users.array()[count];
            userlist += user.username + '\n';
            console.log(user.roles);
         }
        message.channel.send(userlist);
    }
  });





Client.login(token.token);