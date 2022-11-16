const axios = require('axios')
require('dotenv').config()

function precise(x) {
    return x.toPrecision();
}

async function currentPortfolioValue(data) {

    let portfolio = 0;

    for await (const stock of data) {
        const ticker = stock.stockticker
        const url = `https://finnhub.io/api/v1/quote?token=${process.env.api_key}&symbol=${ticker.toUpperCase()}`
        const stockData = await axios.get(url)
        const price = stockData.data.c

        portfolio += parseInt(stock.shares) * price
    }
    return precise(portfolio)
}


async function updatingPortfolioValues(data, userData) {

    let portfolioValue = await currentPortfolioValue(data)
    let total = 0

    for await (const stock of data) {
        const { totalSpend } = stock

        total += totalSpend
    }

    const changeTotal = ((parseInt(portfolioValue) + parseInt(userData[0].cash)) - 5000)
    const changePercentage = (parseInt(changeTotal) / parseInt(total)) * 100

    const res = {
        changePercentage: parseFloat(changePercentage).toPrecision(2),
        changeTotal: precise(changeTotal)
    }

    return res
}

module.exports = { updatingPortfolioValues }