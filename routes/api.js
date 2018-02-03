const express = require('express');
const router = express.Router();
const cookbookCtrl = require('../controllers/cookbook_ctrl');
const recipeCtrl = require('../controllers/recipe_ctrl');
const yummlyCtrl = require('../controllers/yummly_ctrl');
const utils = require('../utils');

// Cookbook Routes
router.post('/cookbooks/register', cookbookCtrl.register);
router.post('/cookbooks/login', cookbookCtrl.login);

router.get('/cookbooks/:id', utils.loginRequired, cookbookCtrl.read);
router.put('/cookbooks/:id', utils.loginRequired, cookbookCtrl.update);
router.delete('/cookbooks/:id', utils.loginRequired, cookbookCtrl.delete);

router.post('/cookbooks/:id/recipes', utils.loginRequired, recipeCtrl.add);
router.delete('/cookbooks/:id/recipes/:r_id', utils.loginRequired, recipeCtrl.del);

// Yummly Routes
router.post('/recipes/search', yummlyCtrl.search);
router.get('/recipe/:id', yummlyCtrl.getRecipe);

module.exports = router;
