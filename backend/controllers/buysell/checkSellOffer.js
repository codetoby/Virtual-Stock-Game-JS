const { getPool } = require("../datenbank/createPool");

let conn;
let response;

const chechSellOffer = async(userid, stockticker, sellshares) => {

    conn = await getPool()
    const findStock = await conn.query(`SELECT stockticker, shares, totalSpend
                                        FROM alluserstocks WHERE userid=?
                                        AND stockticker=?`,
                                        [userid, stockticker])

    if (findStock.length === 0) return {message: `You don't have the Stock ${stockticker.toUpperCase()}`}
    
    const shares = findStock[0].shares
    if (shares < sellshares) {
        return {
            message: `You don't have these many shares. You have just got ${shares} of ${stockticker.toUpperCase()}.`
        }
    }

    return findStock[0]
}

module.exports = chechSellOffer