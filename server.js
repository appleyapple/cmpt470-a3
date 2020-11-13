const express = require('express');
const bp = require('body-parser');

const app = express();

// parse requests of content-type: application/json
app.use(bp.json());

app.get('/', (req, res) => {
    res.json({ message: 'welcome' });
});

require('./routes/rectangleRoutes')(app);

app.listen(3000, () => {
    console.log('Server is running on port 3000.');
});






// var mysql = require('mysql');

// var connection = mysql.createConnection({
//     host: 'db4free.net',
//     user: 'henryyip',
//     password: '123123hh',
//     database: 'cmpt470'
// });

// connection.connect();

// connection.query('SELECT * AS db', function(err, rows, fields) {
//     if (err) throw err;
//     console.log(rows[0].db);
// });

// connection.end();