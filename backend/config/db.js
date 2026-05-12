const mysql = require('mysql2/promise');
const db = mysql.createPool({
    host: '34.172.113.167', 
    user: 'admin',          
    password: 'mypassword', 
    database: 'notes_123230185'   
});

module.exports = db;