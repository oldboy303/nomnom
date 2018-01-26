const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.DATABASE_URL);
  mongoose.connection
    .on('connected', () => console.log('CONNECTED TO DEFAULT DB'))
    .on('error', (error) => console.warn('WARNING: ', error));
}


module.exports = app;
