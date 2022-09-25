const { getPool } = require("../datenbank/createPool");

let conn;

const insertIntoHistory = async (userid, ticker, shares, date, ordertype) => {
    conn = await getPool()
    console.log(date)
    await conn.query(`INSERT INTO history
                    VALUES(?, ?, ?, ?, ?)`,
                    [parseInt(userid), ticker, parseInt(shares), date, ordertype])
}

module.exports = insertIntoHistory