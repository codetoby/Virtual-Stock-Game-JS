const { getPool } = require('../../../controllers/datenbank/createPool');

const { Router } = require('express')

const router = Router()
let conn;

router.get('/', async (req, res) => {
    try {
        let returnData = []
        const userid = req.user[0].userid
        console.log(req.user);
        console.log(userid)
        conn = await getPool()
        const userData = await conn.query(`SELECT *
                                            FROM portvalues
                                            WHERE userid=?
                                            ORDER BY datet ASC`,
                                            [parseInt(userid)])
        
        if (userData.length === 0) {
            res.send([{}])
        }

        for await (const value of userData) {
            const form = await conn.query(`SELECT DATE_FORMAT(?, '%d/%m/%Y')`, [value.datet])
            console.log(form)
            let date = Object.values(form[0])[0]
            returnData.push({date: date, value: value.portvalue})
        }
        
        res.send(returnData)
    } catch (error) {
        console.log(error);
    }
   
})

module.exports = router