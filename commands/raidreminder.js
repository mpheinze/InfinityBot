///// ----- InfinityBot - !nextraid ----- /////

// Command syntax: !raidreminder
// Arguments: 0
// Send a reminder to everyone signed up for next upcoming event

var EventScraper = new require('../util/nextevent_scraper');
var fs = require('fs');

exports.run = async (client, message, args, level) => {

    EventScraper.event_scraper(function(event_data) {

        var time_diff = new Date(event_data.meta_data.date) - new Date();
        var hours_to_raid = Math.floor(time_diff / 1000 / 60 / 60);
        var minut_to_raid = Math.round((time_diff / 1000 / 60 / 60 - hours_to_raid) * 60);

        var json = fs.readFileSync('./util/raidreminder_text.json');
        var json_parse = JSON.parse(json);
        var reminder_text = json_parse.default;
        reminder_text = reminder_text.replace('[HOURS]', hours_to_raid)
        reminder_text = reminder_text.replace('[MINUTES]', minut_to_raid)

        // Creating user array from Shivtr, excluding users signed as 'maybe'
        var shivtr_array = event_data.raiders.filter((raider) => {
            return !isNaN(raider.index);
        }).map((raider) => {
            return raider.name.replace(/\s+/g, '').toLowerCase();
        });

        // Creating user array from Discord
        var discord_array = message.guild.members.map(member => {
            return member.user.username.replace(/\s+/g, '').toLowerCase();
        });

        // Creating user ID array from Discord members
        var disc_id_array = message.guild.members.map(member => {
            return member.user.id;
        });

        // Matching all usernames from Shivtr with all usernames from Discord
        var i = 0;
        discord_array.forEach(disc_user => {
            shivtr_array.forEach(shiv_user => {
                if(disc_user.indexOf(shiv_user) > -1) {
                    client.users.get(disc_id_array[i]).send(reminder_text);
                }
            });
            i++;
        });

    });
}