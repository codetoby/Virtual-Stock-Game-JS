const express = require('express')
const checkUser = require('../../../controllers/userData/checkAccount');
const validTicker = require('../../../controllers/buysell/validTicker');
const chechSellOffer = require('../../../controllers/buysell/checkSellOffer');
const updatePort = require('../../../controllers/buysell/updatePortSell');
const insertIntoHistory = require('../../../controllers/buysell/orderHis');

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const { username, userid, stockticker, sellshares } = req.body

        let response;
        let currentPrice;
        let totalSell;
        let date = require('moment')().format('YYYY-MM-DD HH:mm:ss')

        const findUser = await checkUser(userid)
        if (findUser.message) {
            res.send(findUser)
            return
        }

        const stockData = await validTicker(stockticker)
        if (stockData.message) {
            res.send(stockData)
            return
        }

        const usersStockData = await chechSellOffer(userid, stockticker, sellshares)

        if (usersStockData.message) {
            res.send(usersStockData)
            return
        }

        currentPrice = stockData.c 
        totalSell = currentPrice * parseInt(sellshares)

        await updatePort(userid, stockticker, sellshares, totalSell, usersStockData.shares, usersStockData.totalSpend)

        response = {
            message: `You have sold ${sellshares} shares of ${stockticker.toUpperCase()} at $${currentPrice}.`
        }
        await insertIntoHistory(userid, stockticker, sellshares, date, 'sell')
        res.send(response)
    } catch (error) {
        console.log(error)
    }
    
    
})

module.exports = router