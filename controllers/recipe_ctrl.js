const Cookbook = require('../models/cookbook');
module.exports = {

  add(req, res, next) {
    Cookbook.findById(req.validatedID.id)
    .then((result) => {
      result.recipes.push(req.body.recipe);
      return result.save();
    })
    .then(() => Cookbook.findById(req.validatedID.id))
    .then((updated) => res.json({ recipes: updated.recipes }))
    .catch((err) => res.json({ error: err }));
  },

  del(req, res, next) {
    Cookbook.findByIdAndUpdate(req.validatedID.id, {
      $pull: {
        recipes: {
          yummlyId: req.params.r_id
        }
      }
    })
    .then(() => Cookbook.findById(req.validatedID.id))
    .then((updated) => res.json({ recipes: updated.recipes }))
    .catch((err) => res.json({ error: err }));
  }
};
