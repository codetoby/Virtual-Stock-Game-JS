const { getPool } = require('../../../controllers/datenbank/createPool');

const { Router } = require('express')

const router = Router()
let conn;

router.get('/', async (req, res) => {
    try {
        let returnData = []
        const userid = req.user[0].userid
        conn = await getPool()
        const userData = await conn.query(`SELECT portvalue, datet
                                        FROM portvalues
                                        WHERE userid=?
                                        ORDER BY datet ASC`,
            [userid])

        for await (const value of userData) {
            const form = await conn.query(`SELECT DATE_FORMAT(?, '%d/%m/%Y')`, [value.datet])
            let date = Object.values(form[0])[0]
            returnData.push({ date: date, value: value.portvalue })
        }

        res.send(returnData)
    } catch (error) {
        console.log(error.response.data.error);
    }
})

module.exports = router