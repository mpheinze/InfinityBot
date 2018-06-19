// Test Code for learning JS //

const Discord = require("Discord.js");
const Client = new Discord.Client({commandPrefix: "!"});
const token = require("C:/token/token.json");


// Client online
Client.on('ready', () => {
    console.log(`Logged in as ${Client.user.tag}!`);
  });

// Test command
Client.on("message", (message) => {
    if (message.content.match("test")) {
      message.channel.send("success!");
      console.log("test");
    }
  });








Client.login(token.token);