const express = require('express')
const session = require('express-session')
const { getPool } = require('../controllers/datenbank/createPool')
const passport = require('passport')
const MariaDBStore = require('express-session-mariadb-store')

const auth = require('./auth')
const user = require('./user')

require('../controllers/strategie/discord')
require('dotenv').config()
const app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers","*")
    next()
  })

app.use(session({
    secret: "ASAFADSADADSAF",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 365 * 1000},
    store: new MariaDBStore({
        pool: getPool()
    })
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/user', user)
app.use('/api/auth', auth)

module.exports = app