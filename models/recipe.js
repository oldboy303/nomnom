const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  yummlyId: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    require: true
  },
  prepTime: {
    type: Number,
    required: true
  }
});

module.exports = RecipeSchema;
