const mariadb = require('mariadb')

var pool;
module.exports = {
        getPool: function () {
        if (!pool) {
        const config = {
            connectionLimit : 10,
            host: "188.68.41.89",
            port: "3308",
            user: "toby",
            password: "AktienBotTobyCarl",
            database: "stockbot"
        };
        pool = mariadb.createPool(config);
        }
        return pool;   
    }     
};



