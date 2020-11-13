const mysql = require('mysql');
const db_config = require('../config/db_config');

// Create connection to database
const connection = mysql.createConnection({
    host: db_config.host,
    user: db_config.user,
    password: db_config.password,
    database: db_config.database
});

connection.connect(error => {
    if (error) throw error;
    console.log('Connection to database successful.');
})

// connection.query('SELECT * FROM rectangles WHERE id=2', (err, res) => {
//     if (err) {
//         console.log('error: ', err);
//         return;
//     }

//     console.log('Rectangles: ', res);
// });

module.exports = connection;
