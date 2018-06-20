///// ----- InfinityBot - !masspm ----- /////

// Command syntax: !masspm [Role] [Message]
// Sends [Message] to all users with [Role]

// Defining constants
const Discord = require('Discord.js');
const client = new Discord.Client({commandPrefix: '!'});
const token = require('C:/token/token.json');

// Client logged in
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

// Initializing command on !masspm command prompt
client.on('message', (message) => {
    if(message.content.startsWith('!masspm')){
        
        // Parsing command syntax for [Role] (role) and [Message] (pm_text)
        var role = message.content.split(' ')[1];
        var pm_text = message.content.substr(message.content.indexOf(' ', message.content.indexOf(' ') + 1) + 1);

        // Populating userlist with users in [Role]
        let userlist = message.guild.members.filter(member => { 
            return member.roles.find('name', role);
        }).map(member => {
            return member.user.id;
        })

        // Messaging the users with the specified role
        for (id of userlist) {
            client.users.get(id).send(pm_text);
        }

    }
});

client.login(token.token);