const express = require('express');
const bodyParser = require('body-parser');

const app = express();

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const port = process.env.APP_PORT || 8080;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/node-lab-backend', require('./routes'));

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
});
