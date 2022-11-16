const axios = require('axios')
require('dotenv').config()

const validTicker = async (ticker) => {

    const url = `https://finnhub.io/api/v1/quote?token=${process.env.api_key}&symbol=${ticker.toUpperCase()}`
    const stockInfo = await axios.get(url)
    return userInfo.data.d === null ? { message: "No Valid Stock Ticker"} : stockInfo.data  
}

module.exports = validTicker