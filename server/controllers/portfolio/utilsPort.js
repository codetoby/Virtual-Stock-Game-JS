const axios = require('axios')
require('dotenv').config()
function precise(x) {
    return x.toPrecision();
}

async function userStockData(data) {

    let currentPrices = ['-']
    let stocktickers = ['-']
    let shareslist = ['-']
    let buyPrices = ['-']

    for await (const stock of data) {

        const {stockticker, shares, buyprice} = stock
        const url = `https://finnhub.io/api/v1/quote?token=${process.env.api_key}&symbol=${stockticker.toUpperCase()}`
        const stockData = await axios.get(url)
        const price = stockData.data.c

        currentPrices.push(price.toString())
        stocktickers.push(stockticker.toString().toUpperCase())
        shareslist.push(shares.toString())
        buyPrices.push(buyprice.toString())
    }
    const res = {
        currentPrices: currentPrices,
        stocktickers: stocktickers, 
        shares: shareslist,
        buyPrices: buyPrices
    }

    return res
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

async function updatePreviousDay(data) {

    let prevPortfolioValue = 0
    let portfolioValue = await currentPortfolioValue(data)

    for await (const stock of data) {
        const ticker = stock.stockticker
        const url = `https://finnhub.io/api/v1/quote?token=${process.env.api_key}&symbol=${ticker.toUpperCase()}`
        const stockData = await axios.get(url)
        const prevprice = stockData.data.pc

        prevPortfolioValue += parseInt(stock.shares) * prevprice
    }

    const changePercentage = ((portfolioValue / prevPortfolioValue) - 1) * 100
    const changeTotal = portfolioValue - prevPortfolioValue

    const res = {
        changePercentage: Math.floor(changePercentage),
        changeTotal: precise(changeTotal)
    }

    return res
}

async function totalChange(data, userData) {
    
    let portfolioValue = await currentPortfolioValue(data)
    let total = 0

    for await (const stock of data) {
       const { totalSpend } = stock
       
        total += totalSpend
    }

    const changeTotal = ((parseInt(portfolioValue) + parseInt(userData[0].cash) ) - 5000)
    const changePercentage = (parseInt(changeTotal) / parseInt(total)) * 100

    const res = {
        changePercentage: parseFloat(changePercentage).toPrecision(2),
        changeTotal: precise(changeTotal)
    }

    return res
}

module.exports = {
    userStockData,
    currentPortfolioValue,
    updatePreviousDay,
    totalChange
}