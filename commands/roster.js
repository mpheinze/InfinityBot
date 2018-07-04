/* MEMBERS COMMAND */

//const scraper = new require('../util/roster_scraper');
const request = require('request');

var url = `https://superinfinityfriends.shivtr.com/members.json`
var msgString = "__Members of the Super Infinity Friends roster:__ \n";

exports.run = async (client, message, args, level) => {

    // Scraping event calendar to find the next upcoming event
    request({
        url: url, // requests URL
        json: true // which is a JSON
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            for (member of body.members){
                msgString += member.display_name + ", ";
            } 
        message.channel.send(msgString);
        }
    });
}