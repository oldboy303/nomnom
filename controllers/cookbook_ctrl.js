const Cookbook = require('../models/cookbook.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').load();

module.exports = {

  register (req, res, next) {
    res.send('THIS IS THE REGISTER/POST ROUTE');
  },

  login (req, res, next) {
    res.send('THIS IS LOGIN/GET ROUTE');
  },

  update (req, res, next) {
    res.send('THIS IS THE UPDATE/PUT ROUTE');
  }, 

  delete (req, res, next) {
    res.send('THIS IS THE DELETE/DELETE ROUTE');
  }

};
