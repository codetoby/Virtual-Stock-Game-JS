const { Strategy } = require('passport-discord')
const passport = require('passport');
const { getPool } = require('../datenbank/createPool');
require('dotenv').config();

let conn;

passport.serializeUser((user, done) => {
    console.log(user);
    return done(null, user.userid)
})

passport.deserializeUser(async (id, done) => {
    conn = await getPool()
    const find = await conn.query(`SELECT * from discordauth02 WHERE userid =?`, [id])
    return find ? done(null, find) : done(null, null)
})

passport.use(
    new Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    scope: ["identify", 'email']
    },
    async (accessToken, refreshToken, profile, done) => {
        const { id, email, avatar, username, discriminator} = profile
        conn = await getPool()

        const avatar_url =`https://cdn.discordapp.com/avatars/${id}/${avatar}.jpg`

        const find = await conn.query(`SELECT * from discordauth02 WHERE userid =?`, [id])
        if (find.length === 1) {
            await conn.query(`UPDATE discordauth02
            SET accessToken = ?, refreshToken=?, avatar_url=?, username=?, discriminator=?
            WHERE userid=?`, [
                accessToken, refreshToken, avatar_url, username, discriminator, id
                
            ])
            return done(null, find[0])
        }
        else {
            const newUser = await conn.query(`INSERT INTO discordauth02 
            (userid, accessToken, refreshToken, email, avatar_url, username, discriminator)
            VALUES (?, ?, ?, ?, ?, ?, ?)`, [ 
                id, accessToken, refreshToken, email, avatar_url, username, discriminator
            ])
            return done(null, newUser[0])
        }
    })
)



