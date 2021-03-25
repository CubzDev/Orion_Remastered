exports.run = (client, message, args) => {
    message.channel.send("testing command!").catch(console.error);
}