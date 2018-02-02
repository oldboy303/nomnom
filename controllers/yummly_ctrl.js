const axios = require('axios');
require('dotenv').load();

const serializer = (obj) => {
  let str = [];
  for (var prop in obj) {
    str.push(encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop]));
  }
  return '&' + str.join('&');
};

const searchURL = `http://api.yummly.com/v1/api/recipes`;

const recipeURL = `http://api.yummly.com/v1/api/recipe/`;

const keyParams = `?_app_id=${ process.env.YUMMLY_ID }&_app_key=${ process.env.YUMMLY_KEY }`;


module.exports = {

  search(req, res, next) {
    let searchStr = serializer(req.body);
    axios.get(searchURL + keyParams + searchStr)
      .then((result) => res.json(result.data))
      .catch((error) => res.status(500).json({ error: error }));
  },

  getRecipe(req, res, next) {
    axios(recipeURL + req.query.id + keyParams)
      .then((result) => res.json(result.data))
      .catch((error) => res.status(500).json({ error: error }));
  }

};
