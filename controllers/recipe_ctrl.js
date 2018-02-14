const Cookbook = require('../models/cookbook');
const jwt = require('jsonwebtoken');
require('dotenv').load();

module.exports = {

  add(req, res, next) {
    let decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
    Cookbook.findById(decoded.id)
      .then((result) => {
        result.recipes.push(req.body.recipe);
        return result.save();
      })
      .then(() => Cookbook.findById(decoded.id))
      .then((updated) => res.json({ recipes: updated.recipes }))
      .catch((err) => res.json({ error: err }));
  },

  del(req, res, next) {
    let decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
    Cookbook.findByIdAndUpdate(decoded.id, {
      $pull: {
        recipes: {
          yummlyId: req.params.r_id
        }
      }
    })
      .then(() => Cookbook.findById(decoded.id))
      .then((updated) => res.json({ recipes: updated.recipes }))
      .catch((err) => res.json({ error: err }));
  }
};
