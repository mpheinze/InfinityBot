const fs = require('fs');
const Discord = require("Discord.js");
const client = new Discord.Client();
const token = require("C:/token/token.json");
client.commands = new Discord.Collection(); // collections explained below

// this next line is a javascript object which contains all the file names in C:/infinityclient/commands/ and only includes the ones which end with .js
// e.g. {'test.js', 'masspm.js', 'nextevent.js', 'help.js'}
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const prefix = ('!');

// client ready
client.on("ready", () => {
    console.log("InfinityBot Online");
  });

// Auto-reconnect
client.on('disconnect', function(erMsg, code) {
  console.log('----- client disconnected from Discord with code', code, 'for reason:', erMsg, '-----');
  client.connect();
});

client.on("message", message => {
  if (message.author.bot) return;
  if(message.content.indexOf(prefix) !== 0) return;

const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

try {
  let commandFile = require(`./commands/${command}.js`);
  commandFile.run(client, message, args);
} catch (err) {
  console.error(err);
}
});

// login token
client.login(token.token);