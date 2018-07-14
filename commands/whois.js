/* WHOIS COMMAND 

This command returns some information from the Warmane armory about a character.

*/

const request = require('request');
const cheerio = require('cheerio');

var url = `http://armory.warmane.com/character/Outland/summary`;

exports.run = async (client, message, args, level) => {

    var url = `http://armory.warmane.com/character/Outland/summary`;

    if (args[0] === 'help') {
        message.channel.send("!whois <charactername>\n\nThis will show information about the character from the Warmane armory");
        return;
    }

    if (!/^[a-z]+$/i.test(args[0])) { // regex to check that the input is ONLY letters, names in WoW are only letters.
        message.channel.send("Invalid input, names must be letters only");
        return;
    }
    
    // format the received string to be correct case, capitalised first letter, all rest lowercase
    var characterLower = args[0].toLowerCase();
    var characterFirst = characterLower[0].toUpperCase();
    var characterUrl = "/character/" + characterFirst + characterLower.substr(1) + "/"; // yes, this really is the way you are supposed to do this in JS! I can't believe it.

    url = url.replace("/character/", characterUrl);
    //message.channel.send(url);

    request({
        url: url, // requests URL
        json: false // which is a JSON
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var $ = cheerio.load('<div id="character-sheet">...</div>');


            console.log($('.name').text());
        }
    });
}