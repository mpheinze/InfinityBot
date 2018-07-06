///// Parses the members.json from the Shivtr website /////

const request = require('request');

var url = `https://superinfinityfriends.shivtr.com/members.json`
var msgString = "Members of the Super Infinity Friends roster: \n";

// Scraping event calendar to find the next upcoming event
request({
    url: url, // requests URL
    json: true // which is a JSON
}, function (error, response, body) {
    if (!error && response.statusCode === 200) {
        for (member of body.members){
            //console.log(member.display_name);
            msgString += member.display_name + ", ";
        }  
        //console.log(body.members);
        console.log(msgString);
    }
});