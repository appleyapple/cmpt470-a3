const express = require('express');
const cors = require('cors');
const bp = require('body-parser');

const app = express();

// parse requests of content-type: application/json
app.use(bp.json());

// cors policy fix
app.use(cors());

// serves files in client as landing page
app.use(express.static('client'));

require('./routes/rectangleRoutes')(app);

app.listen(3000, () => {
    console.log('Server is running on port 3000.');
});

