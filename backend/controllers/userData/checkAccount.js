const { getPool } = require('../datenbank/createPool');


let conn;

const checkUser = async (userid) => {
    
    conn = await getPool()
    const find = await conn.query(`SELECT userid
                                from userdata 
                                WHERE userid=?`, 
                                [userid])

    console.log(find);

    return find.length === 1 ? true : response = { message: "Missing Portfolio" }
}

module.exports = checkUser
