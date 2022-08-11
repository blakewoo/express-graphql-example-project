// Maria DB connect
const mariadb = require('mariadb');
const config = require('config')
const pool = mariadb.createPool({
    host: config.sqlDatabase.address,
    user:config.sqlDatabase.id,
    password: config.sqlDatabase.password,
    connectionLimit: 5
});

module.exports = pool