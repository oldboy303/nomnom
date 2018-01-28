const Cookbook = require('../models/cookbook.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').load();

module.exports = {

  register (req, res, next) {
    let cb = req.body;
    let salt = bcrypt.genSaltSync();
    let hash = bcrypt.hashSync(cb.password, salt);
    let cookbook = new Cookbook({
      firstName: cb.firstName,
      lastName: cb.lastName,
      email: cb.email,
      password: hash
    });
    cookbook.save()
      .then((result) => {
        let cleanCookbook = {
          id: result._id,
          firstName: result.firstname,
          lastName: result.lastName,
          email: result.email,
          recipes: result.recipes
        };
        let token = jwt.sign({ id: result._id }, process.env.JWT_SECRET);
        res.json({
          cookbook: cleanCookbook,
          token: token
        });
      })
      .catch((error) => {
        if(error.code === 11000) {
          res.status(422).json({ error: 'Email is already taken' });
        } else {
          res.status(500).json({ error: 'Oops, something went wrong' });
        }
      })
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
