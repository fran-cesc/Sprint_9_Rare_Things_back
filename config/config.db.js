require("dotenv").config();
const mysql = require('mysql');
let connection;

try {

    // Setup connection
    connection = mysql.createConnection({
        host: process.env.MYSQL_ADDON_HOST,
        user: process.env.MYSQL_ADDON_USER,
        password: process.env.MYSQL_ADDON_PASSWORD,
        database: process.env.MYSQL_ADDON_DB,
        port: process.env.MYSQL_ADDON_PORT || 3306,
    });

      // Try to connect
      connection.connect(err => {
        if (err) {
            console.error("Error connecting to the database:", err);
            process.exit(1); // Optionally stop the process if the connection fails
        } else {
            console.log("Database connected successfully.");
        }
    });

} catch (error) {
    console.log("Error connecting to the database:", error);
}

module.exports = { connection };
