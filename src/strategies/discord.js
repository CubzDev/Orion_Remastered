const passport = require('passport');
const DiscordStrategy = require('passport-discord');
const user = require('../database/schemas/user');

passport.serializeUser((user, done) => {
    done(null,user.discordId)
});

passport.use(
    new DiscordStrategy( {
        clientID: process.env.DASHBOARD_CLIENT_ID,
        clientSecret: process.env.DASHBOARD_CLIENT_SECRET,
        callbackURL: process.env.DASHBOARD_CALLBACK_URL,
        scope: ['identify', 'guilds'],
    }, async (accesToken, refreshToken, profile, done) => {

        const {id, username, discriminator, avatar, guilds} = profile;
        console.log(id, username, discriminator, avatar, guilds)
        
        try {
            const findUser = await user.findOneAndUpdate({discordId: id}, {
                discordTag: `${username}#${discriminator}`,
                avatar,
                guilds,
            }, {new: true});
    
            if (findUser) {
                console.log('user was found')
                return done(null, findUser);
            } else {
                const newUser = await user.create( {
                    discordId: id,
                    discordTag: `${username}#${discriminator}`,
                    avatar,
                    guilds,
                });
                return done(null, newUser);
            }
        } catch (err) {
            console.log(err);
            return done(err, null);
        }

    })
);

passport.deserializeUser(async (discordId, done) => {
    try {
        const user = await user.findOne({discordId});
        return user ? done(null, user) : done(null, null);
    } catch (err) {
        console.log(err);
        done(err, null)
    }
});