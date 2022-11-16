const axios = require('axios')

const validTicker = async (ticker) => {

    const url = `https://finnhub.io/api/v1/quote?token=cbobmcaad3i6ndrm5uag&symbol=${ticker.toUpperCase()}`
    const stockInfo = await axios.get(url)
    return userInfo.data.d === null ? { message: "No Valid Stock Ticker"} : stockInfo.data  
}

module.exports = validTicker