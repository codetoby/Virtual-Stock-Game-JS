const { Router } = require('express')
const passport = require('passport')

const app = Router()

app.get('/discord', passport.authenticate('discord'));

app.get('/discord/redirect', passport.authenticate('discord', {
    failureRedirect: 'https://tleem.me/userPortfolio',
    successRedirect: 'https://tleem.me/userPortfolio'
}), function(req, res) {
    res.redirect('https://tleem.me/userPortfolio')
});

module.exports = app