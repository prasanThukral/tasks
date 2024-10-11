const mysql = require('mysql2/promise')

const mysqlPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '#Pra@san24',
    database: 'task_db'
})


module.exports = mysqlPool