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
<<<<<<< HEAD
        let event_time = event_data.event.date.toUTCString();
        event_time = `${event_time.substring(0, event_time.length - 7)} ST`
        
=======
        let event_date = dateFormat(event_data.event.date, 'dd-mm-yyyy');
        let event_time = `${dateFormat(event_data.event.date.setHours(event_data.event.date.getHours() - 1), 'HH:MM')} ST`;
    
>>>>>>> 7435fc3383cfd69c9ba5983ee4da0a646c003336
        message.channel.send({embed: {
            color: 2190157,
            author: {
                name: 'Next upcoming raid:',
                icon_url: message.guild.iconURL
              },
            title: `__**${event_data.event.name}**__`,
            url: event_data.event.event_url,
            fields: [{
                name: 'Date and time',
                value: event_time
                },
                {
                name: 'Description',
                value: `${event_data.event.description}`
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