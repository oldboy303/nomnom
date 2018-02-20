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

function queryBuilder(obj) {
  var qString = '';
  var allergyArr = [];
  for (var key in obj.allergy) {
    if (obj.allergy[key]) {
      allergyArr.push(obj.allergy[key]);
    }
  }
  if (obj.q) {
    qString += '&q=' + encodeURIComponent(obj.q);
  }
  if (obj.diet) {
    qString += '&allowedDiet[]=' + obj.diet;
  }
  if (allergyArr.length > 0) {
    for(var i = 0; i < allergyArr.length; i++) {
      qString += '&allowedAllergy[]=' + allergyArr[i];
    }
  }
  if (obj.maxResult) {
    qString += '&maxResult=' + obj.maxResult;
  }
  if (obj.start) {
    qString += '&start=' + obj.start;
  }
  return qString;
}


module.exports = {

  search(req, res, next) {
    let searchStr = queryBuilder(req.body);
    console.log('SEARCH STRING' + searchStr)
    axios.get(searchURL + keyParams + searchStr)
      .then((result) => res.json(result.data))
      .catch((error) => res.json({ error: error }));
  },

  getRecipe(req, res, next) {
    axios(recipeURL + req.params.id + keyParams)
      .then((result) => res.json(result.data))
      .catch((error) => res.json({ error: error }));
  }

};
