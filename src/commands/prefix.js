const db = require("quick.db");

exports.run = (client, message, args) => {

    let serverPrefix = db.get(`guild_${message.guild.id})prefix`);

    message.channel.send(`My prefix in this server is \`${serverPrefix}\``)

};