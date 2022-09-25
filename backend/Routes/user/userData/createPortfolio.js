const express = require('express')
const { getPool } = require('../../../controllers/datenbank/createPool');
const checkUser = require('../../../controllers/userData/checkAccount')

const router = express.Router()


let conn;

router.post('/', async (req, res) => {

  conn = await getPool()
  let date = require('moment')().format('YYYY-MM-DD HH:mm:ss')
  console.log('hi')
  try {
    const { username, userid} = req.body

    

    const find = await checkUser(userid)
    if (find === true) {
      res.status(200).send({ success: false })
    } else {
      await conn.query(`INSERT INTO userdata VALUES (?, ?, ?, ?, ?)`, [userid, username, date, 5000, 0])
      res.status(200).send({ success: true })
    }
  } catch (error) {
    console.log(error);
  }

})

module.exports = router