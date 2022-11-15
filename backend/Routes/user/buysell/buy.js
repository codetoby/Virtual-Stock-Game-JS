const express = require('express')
const checkUser = require('../../../controllers/userData/checkAccount');
const insertUser = require('../../../controllers/buysell/insertUser');
const validTicker = require('../../../controllers/buysell/validTicker');
const updatePortBuy = require('../../../controllers/buysell/updatePortBuy');
const insertIntoHistory = require('../../../controllers/buysell/orderHis');
const router = express.Router()


router.post('/', async (req, res) => {

    try {
        const { username, userid, stockticker, shares } = req.body

        let response;
        let currentPrice;
        let totalSpend;

        let date = require('moment')().format('YYYY-MM-DD HH:mm:ss')

        const findUser = checkUser(userid)
        if (findUser) {

            const stockData = await validTicker(stockticker)

            if (stockData.message) {
                return res.send(stockData)
            }

            currentPrice = stockData.c
            totalSpend = currentPrice * shares

            const updatedPortfolio = await updatePortBuy(userid, totalSpend)

            if (updatedPortfolio.message) {
                res.send(updatedPortfolio)
                return
            }

            await insertUser(stockticker.toLowerCase(), userid, shares, currentPrice, totalSpend, date)

            response = {
                message: `You have bought ${shares} shares of ${stockticker.toUpperCase()} at $${currentPrice}.`
            }
            await insertIntoHistory(userid, stockticker, shares, date, 'buy')
            res.send(response)

        } else {

            res.send(findUser)
        }
    } catch (error) {
        console.log(error);
    }

})

module.exports = router
