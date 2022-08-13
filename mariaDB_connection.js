// Maria DB connect
const mariadb = require('mariadb');
const config = require('./config')
const conn = mariadb.createPool({
    host: config.sqlDatabase.address,
    port: config.sqlDatabase.port,
    user:config.sqlDatabase.id,
    password: config.sqlDatabase.password,
    connectLimit:config.sqlDatabase.connectionLimit
});

module.exports = conn