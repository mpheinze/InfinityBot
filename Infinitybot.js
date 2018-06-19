var fs = require('fs');

const Discord = require("Discord.js");
const bot = new Discord.Client();
const token = require("C:/token/token.json");

// bot ready
bot.on("ready", () => {
    console.log("InfinityBot Online");
  });

// Auto-reconnect
bot.on('disconnect', function(erMsg, code) {
  console.log('----- Bot disconnected from Discord with code', code, 'for reason:', erMsg, '-----');
  bot.connect();
});

// test command
bot.on("message", (message) => {
  if (message.content.startsWith("!",0) && message.content.match("test")) {
    message.channel.send("success!");
    console.log("test");
  }
});

  // login token
bot.login(token.token);