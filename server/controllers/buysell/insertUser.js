const { getPool } = require('../datenbank/createPool');
let con;

async function insertUser(stockname, userid, usershares, buyprice, usertotalSpend, date) {

    con = await getPool()

    const findStock = await con.query(`SELECT stockticker, shares, totalSpend FROM alluserstocks WHERE userid=? AND stockticker=?`,
        [userid, stockname])

    if (findStock.length === 1) {

        const { shares, totalSpend } = findStock[0]
        
        const updatedShares = shares + parseInt(usershares)
        const updatedBuyPrice = (totalSpend + usertotalSpend) / updatedShares
        const updatedTotalSpend = totalSpend + usertotalSpend

        await con.query(`UPDATE alluserstocks
                        SET shares=?, buyprice=?, totalSpend=?, buydate=? 
                        WHERE userid = ? AND stockticker=? = ?`,
            [updatedShares, updatedBuyPrice, updatedTotalSpend, date, userid, stockname])

    } else await con.query(`INSERT INTO alluserstocks (userid, stockticker, shares, buyprice, totalSpend, buydate) VALUES(?, ?, ?, ?, ?, ?)`,
            [userid, stockname, usershares, buyprice, usertotalSpend, date])

}

module.exports = insertUser


