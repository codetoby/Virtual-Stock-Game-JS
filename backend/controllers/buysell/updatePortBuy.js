const { getPool } = require('../datenbank/createPool');
const checkFin = require('./checkFin')
let conn;

const updatePort = async (userid, totalSpend, userStocks) => {

    conn = await getPool()

    const userData = await conn.query(`SELECT cash, portfolio from userdata WHERE userid=?`, [userid])
    const checkFinancials = await checkFin(userData[0], totalSpend)

    if (checkFinancials.message) {
        return checkFinancials
    }

    await conn.query(`UPDATE userdata SET cash=?, portfolio=? WHERE userid=?`, [checkFinancials.cash, checkFinancials.portfolio, userid])
    return true
}

module.exports = updatePort