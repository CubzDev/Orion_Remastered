const db = require('quick.db');

module.exports = (client, message) => {
    if (message.author.bot) return;

        let prefix = db.get(`guild_${message.guild.id}_prefix`);
        if (!prefix) prefix = client.defaultPrefix

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        if (!message.content.startsWith(prefix)) return;
        if (message.guild && !message.member) message.guild.fetch.members(message.author);

        let member = message.guild.member(message.mentions.users.first() || args[0]);

        let serverPrefix = db.get(`guild_${message.guild.id}_prefix`);

  
    if (message.content.indexOf(prefix) !== 0) return;
  
    

    const cmd = client.commands.get(command);
  
    if (!cmd) return;
  
    cmd.run(client, message, args);
};