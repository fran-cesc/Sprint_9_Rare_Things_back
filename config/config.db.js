const mysql = require('mysql');
let connection;

try {
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT || 3306,
    });
} catch (error) {
    console.log("Error connecting to the database:", error);
}

module.exports = { connection };
