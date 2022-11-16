const { getPool } = require('../datenbank/createPool');

let conn;

const updatePort = async ( userid, stockticker, sellshares, totalSell, prevShares, prevTotal) => {

    conn = await getPool()

    const userData = await conn.query(`SELECT cash, portfolio from userdata WHERE userid=?`, [userid])

    const updatedCash = userData[0].cash + totalSell
    const updatedPortfolio = userData[0].portfolio - totalSell
    const updatedShares = prevShares - parseInt(sellshares)
    const updatedTotalSpend = prevTotal - totalSell
    const updateUserData = {
        cash: updatedCash,
        portfolio: updatedPortfolio
    }
    
    if (updatedShares === 0) {
        return await conn.query(`DELETE FROM alluserstocks WHERE userid=? AND stockticker=?`, [userid, stockticker])
    } else {
        await conn.query(`UPDATE alluserstocks SET shares=?, totalSpend=? WHERE userid=? AND stockticker=?`, [updatedShares, updatedTotalSpend, userid, stockticker])
    }
    
    await conn.query(`UPDATE userdata SET cash=?, portfolio=? WHERE userid=?`, [updateUserData.cash, updateUserData.portfolio, userid])
}

module.exports = updatePort