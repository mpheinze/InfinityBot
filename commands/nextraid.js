///// ----- InfinityBot - !nextraid ----- /////

// Command syntax: !nextraid
// Arguments: 0
// Shows next upcoming calendar event as an embed

const Scraper = new require('./htmlscraper');
const dateFormat = require('dateformat');

exports.run = async (client, message, args, level) => {

    // Importing html data from scraper
    Scraper.next_event_scraper(function(event_data) {
    
        // formatting date and time strings
        let event_date = dateFormat(event_data.event.date, 'dd-mm-yyyy');
        let event_time = `${dateFormat(event_data.event.date.setHours(event_data.event.date.getHours() - 1), 'HH:MM')} ST`;
    
        message.channel.send({embed: {
            color: 2190157,
            author: {
                name: 'Next upcoming raid:',
                icon_url: message.guild.iconURL
              },
            title: `__**${event_data.event.name}**__`,
            url: event_data.event.event_url,
            description: `Date: ${event_date}. Time: ${event_time}`,
            fields: [{
                name: 'Description',
                value: event_data.event.description
              }
            ],
            timestamp: new Date(),
            footer: {
                icon_url: client.user.avatarURL,
                text: "© Powered by InfinityBot"
              }
        }});

    });

}