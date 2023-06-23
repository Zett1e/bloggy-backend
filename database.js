require('dotenv').config()
const mariadb = require('mariadb')

const pool = mariadb.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DBPORT
    
})

module.exports = pool