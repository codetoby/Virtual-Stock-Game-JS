const { getPool } = require("../datenbank/createPool");

let conn;

const chechSellOffer = async(userid, stockticker, sellshares) => {

    conn = await getPool()
    let response;

    const findStock = await conn.query(`SELECT stockticker, shares, totalSpend
                                        FROM alluserstocks WHERE userid=?
                                        AND stockticker=?`,
                                        [userid, stockticker])

    if (findStock.length === 0) {
        response = {
            message: `You don't have the Stock ${stockticker.toUpperCase()}`
        }
        return response
    }
    
    const shares = findStock[0].shares

    if (shares < sellshares) {
        response = {
            message: `You don't have these many shares. You have just got ${shares} of ${stockticker.toUpperCase()}.`
        }
        return response
    }

    return findStock[0]
}

module.exports = chechSellOffer