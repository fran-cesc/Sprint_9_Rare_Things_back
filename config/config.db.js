const mysql = require('mysql');
let connection;

try {
    connection = mysql.createConnection({
        host: process.env.MYSQL_ADDON_HOST,
        user: process.env.MYSQL_ADDON_USER,
        password: process.env.MYSQL_ADDON_PASSWORD,
        database: process.env.MYSQL_ADDON_DB,
        port: process.env.MYSQL_ADDON_PORT || 3306,
    });
} catch (error) {
    console.log("Error connecting to the database:", error);
}

module.exports = { connection };
