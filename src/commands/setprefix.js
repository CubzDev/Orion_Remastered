const db = require('quick.db');

exports.run = (client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(client.noPermission);
    if(!args) return message.channel.send("You need to specify a prefix");
    if(!args[0]) return message.channel.send("You need to specify a prefix");
    if(args[0].length > 3) return message.channel.send("A prefix can only be 3 or characters");
    
    
    if(args[0] === db.get(`guild_${message.guild.id}_premission`)) return message.channel.send("You tried setting the same prefix.");
    if(args[0] === client.defaultPrefix) db.delete(`guild_${message.guild.id}_prefix`);
    db.set(`guild_${message.guild.id}_prefix`, args[0]);
    message.channel.send(`Your prefix has been changed to ${args[0]}`);

}; 
