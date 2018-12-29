const mysql = require('mysql2');

const pool = new mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'online-Super',
    password: 'T14Qu4ntum!!!@@@'
});

module.exports = pool.promise();