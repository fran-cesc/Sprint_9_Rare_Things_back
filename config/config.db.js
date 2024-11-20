const mysql = require('mysql');
let connection;

try {

    // CLEVER CLOUD
    // connection = mysql.createConnection({
    //     host: process.env.MYSQL_ADDON_HOST,
    //     user: process.env.MYSQL_ADDON_USER,
    //     password: process.env.MYSQL_ADDON_PASSWORD,
    //     database: process.env.MYSQL_ADDON_DB,
    //     port: process.env.MYSQL_ADDON_PORT || 3306,
    // });

    //LOCALHOST
    connection = mysql.createConnection({
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        password: process.env.DBPASS,
        database: process.env.DBNAME,
        port: process.env.PORT || 3306,
    });

} catch (error) {
    console.log("Error connecting to the database:", error);
}

module.exports = { connection };
