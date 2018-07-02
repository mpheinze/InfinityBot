///// ----- InfinityBot - !nextraid ----- /////

// Command syntax: !nextraid
// Arguments: 0
// Shows next upcoming calendar event as an embed

const Discord = require("Discord.js");
const EventScraper = new require('../util/nextevent_scraper');

exports.run = async (client, message, args, level) => {
    EventScraper.event_scraper(function(event_data) {

        // Formatting date and time strings
        let event_date = new Date(event_data.meta_data.date).toUTCString();
        event_date = `${event_date.substring(0, event_date.length - 7)} ST \n`;
        
        // Setting event avatar to default if not set on the site
        if (event_data.meta_data.avatar_url === '/s3/missing/event_photo.png') {
            var avatar_url_use = 'https://s3.amazonaws.com/s3.mmoguildsites.com/s3/event_photos/869326/original.png?1527890717';
        } else {
            var avatar_url_use = event_data.meta_data.avatar_url;
        };

        // Creating embed object 
        const embed = new Discord.RichEmbed()
            .setTitle(event_data.meta_data.title)
            .setURL(event_data.meta_data.url)
            .setAuthor("Super Infinity Friends' Next Raid:", message.guild.iconURL)
            .setColor(2190157)
            .setFooter('© Your friendly neighborhood InfinityBot', client.user.avatarURL)
            .setThumbnail(avatar_url_use)
            .setTimestamp()
            .addField('__Date and time__', event_date)
            .addField('__Sign-ups__',
                `Total: ${event_data.meta_data.signup_total} (${event_data.meta_data.signup_maybe} maybe)\n` + 
                `Tanks: ${event_data.meta_data.role_count.tank}\n` +
                `Damage: ${event_data.meta_data.role_count.damage}\n` +
                `Healers: ${event_data.meta_data.role_count.healer}`
            )
            .addField('__Description__', event_data.meta_data.description)

        // Sending embed to channel
        message.channel.send({embed});

    })
}