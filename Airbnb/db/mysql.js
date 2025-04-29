const mysql=require('mysql2')
 
const pool=mysql.createPool({
    host: 'localhost',
    user: 'KD3_89348_Ajinkya',
    password: 'manager',
    database: 'airbnb_db'
})

module.exports = pool 

