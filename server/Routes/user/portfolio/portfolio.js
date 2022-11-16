const express = require('express')
const checkUser = require('../../../controllers/userData/checkAccount');
const { getPool } = require('../../../controllers/datenbank/createPool');
const { currentPortfolioValue, updatePreviousDay, totalChange, userStockData } = require('../../../controllers/portfolio/utilsPort');

const router = express.Router()
let conn;

router.get('/:userid', async (req, res) => {
    try {
        const userid = req.params.userid

        const findUser = await checkUser(userid)
        if (findUser.message) {
            res.send(findUser)
            return
        }

        conn = await getPool()

        const userStocks = await conn.query(`SELECT stockticker, shares, buyprice, totalSpend FROM alluserstocks WHERE userid=?`, [userid])
        const userData = await conn.query(`SELECT cash, portfolio FROM userdata WHERE userid=?`, [userid])
        const resData = {
            cash: userData[0].cash,
            portfolio: userData[0].portfolio
        }
        if (userStocks.length === 0) {
            let response = {
                message: "No Stocks Found"
            }
            res.send({ message: response.message, userdata: resData })
            return
        } else {
            const portfolioValue = await currentPortfolioValue(userStocks)
            const updatePreviousDayChange = await updatePreviousDay(userStocks)
            const totalChangeLT = await totalChange(userStocks, userData)
            const userDataStock = await userStockData(userStocks)
            res.send({ portfolio: portfolioValue, updatePreviousDayChange, totalChangeLT, userDataStock, userdata: resData })
        }
    } catch (error) {
        console.log(error.response.data.error)
    }


})

module.exports = router