const fs = require('fs'); // this includes a module native to node to deal with file systems, hence, FS.
const Discord = require("Discord.js");
const bot = new Discord.Client();
const token = require("C:/token/token.json");
bot.commands = new Discord.Collection(); // collections explained below

// this next line is a javascript object which contains all the file names in C:/infinitybot/commands/ and only includes the ones which end with .js
// e.g. {'test.js', 'masspm.js', 'nextevent.js', 'help.js'}
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const prefix = ('!');

// bot ready
bot.on("ready", () => {
    console.log("InfinityBot Online");
  });

// Auto-reconnect
bot.on('disconnect', function(erMsg, code) {
  console.log('----- Bot disconnected from Discord with code', code, 'for reason:', erMsg, '-----');
  bot.connect();
});

/* Importing commands - REF ALPHA - Lanayia, you can delete this after you have read and understand what I've done here, or you can leave it/edit it for
a reminder!

This comes from: https://discordjs.guide/#/command-handling/?id=dynamically-reading-command-files

NOTE: this version of collections is not native to javascript, it's part of the Discord.js library, but many other libraries or programming languages
have 'maps' and 'collections' native to them. It's a common concept in programming. If you already know about maps/sets/collections and this is not
new to you, feel free to ignore/delete this.

This uses a clever concept in programming called 'collections' which are subsets of 'maps' I recommend reading up about both collections and maps, 
they are basically lists that you can query, they are sort of like a matrix/array in that you can have multiple dimensions to them, but the clever 
thing is you can have big lists of objects and they can have 'keys' that can be referenced and... they just do a lot of cool stuff, 
but they are basically lists that you can add to.

For a brief explanation of what this does, it uses a for loop to go through the directory /commands/ which you can see in the file system, it then
takes the name of the file and adds it to a 'collection', the collection can be queried for commands at a later date. this will actually run continously
so it's actually possible to drag and drop new commands into the file WHILE THE BOT IS RUNNING and it will read them.

... as long as any command code is placed after this block that is*/

for (const file of commandFiles) { // for all files in the directory 'commands'
  const command = require('./commands/${file}'); // make variable 'command' set to the name of the file
  client.commands.set(command.name, command); // add 'command' to the list of commands
}

// test command // COMMENTED OUT TO TEST IMPORTING
/*
bot.on("message", (message) => {
  if (message.content.startsWith("!",0) && message.content.match("test")) {
    message.channel.send("success!");
    console.log("test");
  }
});*/

  // login token
bot.login(token.token);