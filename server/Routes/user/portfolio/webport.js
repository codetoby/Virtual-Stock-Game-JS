const express = require('express')
const { getPool } = require('../../../controllers/datenbank/createPool');
const { totalChange } = require('../../../controllers/portfolio/utilsPort');
require('dotenv').config()
const axios = require('axios');
const router = express.Router()

let conn;

async function currentPortfolioValue(data) {

    let portfolio = 0;

    for await (const stock of data) {
        const ticker = stock.stockticker
        const url = `https://finnhub.io/api/v1/quote?token=${process.env.api_key}&symbol=${ticker.toUpperCase()}`
        const stockData = await axios.get(url)
        const price = stockData.data.c

        portfolio += parseInt(stock.shares) * price
    }
   
    return portfolio
}

router.get('/', async (req, res) => {

    try {
        if(!req.user) {
            res.redirect('http://188.68.41.89:3000/login')
            return
        }
        const userid = req.user[0].userid
    
        conn = await getPool()
    
        let returnData = {
            userData: {},
            userStocks : []
        }
    
        const userStocks = await conn.query(`SELECT stockticker, shares, buyprice, totalSpend, buydate FROM alluserstocks WHERE userid=?`, [userid])
        const userData = await conn.query(`SELECT cash, portfolio FROM userdata WHERE userid=?`, [userid])
    
        const portValue = await currentPortfolioValue(userStocks)
        const change = await totalChange(userStocks, userData)
        const resData = {
            cash: userData[0].cash,
            portfolio: portValue,
            change: change
        }
    
        returnData.userData = resData
    
        if (userStocks.length === 0) {
            let response = {
                message: "No Stocks Found"
            }
            res.send({ message: response.message, userdata: resData })
            return
        } else {
          
            for ( const stock of userStocks) {
    
                const url = `https://finnhub.io/api/v1/quote?token=${process.env.api_key}&symbol=${stock.stockticker.toUpperCase()}`
                const stockInfo = await axios.get(url)
    
                const currentPrice = stockInfo.data.c
                const Change = stockInfo.data.d
                const percentChange = stockInfo.data.dp
                const prevDay = stockInfo.data.pc
    
                const shares = stock.shares
                const ticker = stock.stockticker
                const buyprice = stock.buyprice
                const totalAmountSpend = parseInt(shares) * parseInt(currentPrice)
    
                const userProfit = totalAmountSpend - stock.totalSpend
    
                const percent = ((totalAmountSpend / stock.totalSpend) - 1) * 100
    
                const resData = {
                    buydate: stock.buydate,
                    stockticker: ticker,
                    currentprice: currentPrice,
                    shares: shares,
                    buyprice: buyprice,
                    totalAmountSpend: totalAmountSpend,
                    percentChange: percentChange,
                    change: Change,
                    prevDay: prevDay,
                    userProfit: userProfit,
                    percent: percent
                }
                returnData.userStocks.push(resData)
            }
            res.send(returnData)
        }
    } catch (error) {
        console.log(error.response.data.error)
    }
    

})

module.exports = router