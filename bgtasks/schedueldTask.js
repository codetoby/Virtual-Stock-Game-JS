const { getPool } = require("./createPool");
const { updatingPortfolioValues } = require("./controllers/updatingPortfolioValues");

let conn;

const updatePort = async (userid) => {
    let conn = await getPool()
    const userStocks = await conn.query(`SELECT stockticker, shares, buyprice, totalSpend FROM alluserstocks WHERE userid=?`, [userid])
    const userData = await conn.query(`SELECT cash FROM userdata WHERE userid=?`, [userid])
    const change = await totalChange(userStocks, userData)
    return change
}   

async function tasks() {
    

    conn = await getPool()

    const userids = await conn.query(`SELECT userid FROM userdata`)

    for (const userid of userids) {
        
        const change = await updatePort(userid.userid)
        const date = require('moment')().format('YYYY-MM-DD HH:mm:ss')
        await conn.query(`INSERT INTO portvalues
                        VALUES(?, ?, ?)`,
                        [parseInt(userid.userid), parseInt(change.changeTotal), date])
        
    }
    
    console.log('Updated Every Ones Profit in PORTVALUES');

}

tasks()
setInterval(tasks, 86400000)

