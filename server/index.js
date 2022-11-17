const express = require('express')
const bodyParser = require('body-parser')
const Routes = require('./Routes')
const cors = require('cors')
require('dotenv').config()
const app = express()

app.listen(8080, () => {
    console.log('The API is Starting...')
})

app.use(cors({ origin: 'http://localhost:3000', methods: "GET,HEAD,PUT,PATCH,POST,DELETE", credentials: true}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', Routes)







