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
        firstName: result.firstName,
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
    });
  },

  login (req, res, next) {
    let cb = req.body;
    Cookbook.findOne({ email: cb.email })
    .then((result) => {
      if (!result) {
        res.status(422).json({ error: 'Invalid email or password' });
      }
      else if (!bcrypt.compareSync(cb.password, result.password)) {
        res.status(401).json({ error: 'Invalid email or password' });
      }
      else {
        let token = jwt.sign({ id: result._id }, process.env.JWT_SECRET);
        let cleanCookbook = {
          id: result._id,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          recipes: result.recipes
        };
        res.json({
          cookbook: cleanCookbook,
          token: token
        });
      }
    })
    .catch((error) => res.status(500).json({ error: 'Oops, something went wrong' }));
  },

  read(req, res, next) {
    Cookbook.findById(req.validatedID.id)
    .then((result) => {
      let token = jwt.sign({ id: result._id }, process.env.JWT_SECRET);
      let cleanCookbook = {
        id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        recipes: result.recipes
      };
      res.json({
        cookbook: cleanCookbook,
        token: token
      });
    })
    .catch((error) => res.status(500).json({ error: 'Oops, something went wrong' }));
  },

  update (req, res, next) {
    let valID = req.validatedID.id;
    let props = req.body;
    if (props.newEmail) {
      Cookbook.findByIdAndUpdate(valID, { email: props.newEmail })
      .then(() => {
        res.json({ message: 'New email saved succesfully' });
      })
      .catch((error) => {
        if(error.code === 11000) {
          res.status(422).json({ error: 'Email is already taken' });
        } else {
          res.status(500).json({ error: 'Oops, something went wrong' });
        }
      });
    }
    else if (props.newPassword && props.oldPassword) {
      Cookbook.findById(valID)
      .then((result) => {
        if (bcrypt.compareSync(props.oldPassword, result.password)) {
          let salt = bcrypt.genSaltSync();
          let hash = bcrypt.hashSync(props.newPassword, salt);
          Cookbook.findByIdAndUpdate(valID, { password: hash })
          .then(() => res.status(200).json({ message: 'Password reset successfuly' }))
          .catch(() => rest.status(500).json({ error: 'Oops, something went wrong' }));
        }
        else {
          res.status(401).json({ error: 'Invalid password' });
        }
      })
      .catch((error) => res.status(500).json({ error: 'Oops, something went wrong' }));
    }
  },

  delete (req, res, next) {
    Cookbook.findByIdAndRemove(req.validatedID.id)
    .then(() => res.status(202).json({ message: 'Your cookbook was deleted' }))
    .catch(() => res.status(500).json({ error: 'Oops, something went wrong' }));
  }

};
