/*
###################################
#             Orion               #
#       Coded by Cubz#2954        #
#                                 #
###################################
*/
require("dotenv").config();
require('./strategies/discord');

const fs = require("fs");
const Discord = require("discord.js");
const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const session = require('express-session');
// const MongoStore = require('connect-mongo');

// # Start of website

const app = express();
const PORT = process.env.PORT || 3002;
const routes = require('./routes');

mongoose.connect('mongodb://localhost/oriondashboard', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(session( {
    secret: 'secret',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    resave: false,
    saveUninitialized: false,
    // store: MongoStore.create({ mongooseConnection:  mongoose.connection })
}))
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));


// # Start of discord bot

const client = new Discord.Client();

client.defaultPrefix = '!';
client.noPermission = "You do not have permission to execute this command!";
client.adminPermission = "ADMNINISTRATOR";

client.commands = new Discord.Collection();

function runCommand() {
  client.fetchUser('267744059865432064').then((user) => {
      user.send('test');
     });
}

fs.readdir("./src/commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

fs.readdir("./src/events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, client));
      delete require.cache[require.resolve(`./events/${file}`)];
    });
  });

client.login(process.env.DISCORD_BOT_TOKEN);