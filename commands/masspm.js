///// ----- InfinityBot - !masspm ----- /////

// Command syntax: !masspm [Role] [Message]
// Sends [Message] to all users with [Role]

exports.run = async (client, message, args, level) => {

    // Parsing command syntax for [Role] (role) and [Message] (pm_text)
    var role = args.shift();
    var disclaimer = '[NOTE: This message was sent to all users with the role: ' + role + ']'
    var pm_text = args.join(' ') + '\n' + '\n' + disclaimer;
    
    // Populating userlist with users in [Role]
    let userlist = message.guild.members.filter(member => {
        return member.roles.find('name', role);
    }).map(member => {
        return member.user.id;
    })

    // Messaging the users with the specified role
    for (id of userlist) {
        client.users.get(id).send(pm_text);
    }

    // Sending confirmation message in channel to the author
    var user_count = userlist.length;
    message.channel.send(`${message.author.toString()}, your message was successfully sent to ${user_count} user(s) with the role: ${role}.`);

}