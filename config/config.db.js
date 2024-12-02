require("dotenv").config();
const mysql = require('mysql');

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,
    port: process.env.MYSQL_ADDON_PORT || 3306,
    connectionLimit: 10
});

// Function to retrieve data using the connection pool
function dbQuery(query, params, callback) {
    pool.query(query, params, (error, results, fields) => {
        if (error) {
            console.error('Database query error: ', error.code);
            // Optionally, handle specific errors based on `error.code` here
        }
        callback(error, results);
    });
}

module.exports = { dbQuery };
