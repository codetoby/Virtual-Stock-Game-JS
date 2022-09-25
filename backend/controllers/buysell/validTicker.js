const axios = require('axios')

const validTicker = async (ticker) => {

    const url = `https://finnhub.io/api/v1/quote?token=cbobmcaad3i6ndrm5uag&symbol=${ticker.toUpperCase()}`
    const stockInfo = await axios.get(url)

    if (stockInfo.data.d === null) {
        const response = {
            message: "No Valid Stock Ticker"
        }
        return response
    } else return stockInfo.data
    
}

module.exports = validTicker