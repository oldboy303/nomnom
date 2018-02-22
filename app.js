const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const api = require('./routes/api');

require('dotenv').config();

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGOLAB_URI || process.env.DATABASE_URL);
  mongoose.connection
    .on('connected', () => console.log('CONNECTED TO DEFAULT DB'))
    .on('error', (error) => console.warn('WARNING: ', error));
}

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/', api);

app.all('*', (req, res) => {
  res.sendFile('index.html', { root: __dirname + '/public/' });
});

module.exports = app;
