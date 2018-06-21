/* TEST COMMAND 

This is how nodejs implements 'functions' by referncing another javascript file on the file system.

This file is explorting a function called 'test'

the 'name' is what will be referenced in the main code when you want to use this function.

the 'description' will be useful when we make a !help command to explain what this command does, in this case, it's quite boring.

Line 24 says that what is inside the curly brackets will be executed when you call 'test' in the main code.
note that it passes two parameters 'message' and 'args'.
this code assumes the first argument you pass is the actual message the bot is responding to, so that you can use it here as you would in the main code.

the 'args' is any other parameters we might want to pass the bot to do clever stuff such as jsons or the name/role/time of the user sending the 
message or any other clever stuff we might want to send.

since 'args' isnt used by this command, we could delete it, but its useful if we ever copy this command as a basic template for future.
*/

module.exports = class test {
    name: 'test', 
    description: 'Test command', 
    execute(message, args) { 
        message.channel.send('Test Success!'); 
    }
};