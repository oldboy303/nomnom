const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  title: {
    type: String
  }
});

module.exports = RecipeSchema;
