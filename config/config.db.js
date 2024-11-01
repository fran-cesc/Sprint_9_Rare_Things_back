const mysql = require('mysql');
let connection;

try {
    connection = mysql.createConnection({
        host: process.env.MYSQLHOST,           // Host proporcionado por Railway
        user: process.env.MYSQLUSER,           // Usuario proporcionado por Railway
        password: process.env.MYSQLPASSWORD,   // Contraseña proporcionada por Railway
        database: process.env.MYSQLDATABASE,   // Nombre de la base de datos proporcionado por Railway
        port: process.env.MYSQLPORT || 3306,   // Puerto proporcionado por Railway o 3306 por defecto
    });
} catch (error) {
    console.log("Error connecting to the database:", error);
}

module.exports = { connection };
