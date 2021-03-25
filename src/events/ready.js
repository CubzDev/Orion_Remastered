module.exports = (client, ready) => {
    console.log(`[ ORION ]: Serving ${client.guilds.cache.size} Servers.`);
    console.log(`[ ORION ]: Serving ${client.users.cache.size} Users.`);
    console.log(`[ ORION ]: Serving ${client.channels.cache.size} Channels.`);
    console.log(`[ ORION ]: Successfully online!`);

    client.user.setActivity("Orion HQ", {
        type: "WATCHING",
        url: "https://github.com/CubzDev/Orion/tree/master"
      });
};