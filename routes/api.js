const express = require('express');
const router = express.Router();
const cookbookCtrl = require('../controllers/cookbook_ctrl');
const recipeCtrl = require('../controllers/recipe_ctrl');
const yummlyCtrl = require('../controllers/yummly_ctrl');

// Cookbook Routes
router.post('/cookbooks/register', cookbookCtrl.register);
router.post('/cookbooks/login', cookbookCtrl.login);

router.get('/cookbooks/:token', cookbookCtrl.read);
router.put('/cookbooks/:token', cookbookCtrl.update);
router.delete('/cookbooks/:token', cookbookCtrl.delete);

router.post('/cookbooks/:token/recipes', recipeCtrl.add);
router.delete('/cookbooks/:token/recipes/:r_id', recipeCtrl.del);

// Yummly Routes
router.post('/recipes/search', yummlyCtrl.search);
router.get('/recipe/:id', yummlyCtrl.getRecipe);

module.exports = router;
