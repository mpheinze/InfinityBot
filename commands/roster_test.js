/* MEMBERS COMMAND */

const scraper = new require('../util/roster_scraper');

exports.run = async (client, message, args, level) => {
  msgString = await scraper.rosterScraper(message, args);
  message.channel.send(msgString);
}