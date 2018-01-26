const express = require('express');
const router = express.Router();
const cookbookCtrl = require('../controllers/cookbook_ctrl');

// CRUD Routes
router.post('/cookbooks', cookbookCtrl.register);
router.get('/cookbooks', cookbookCtrl.login);
router.put('/cookbooks/:id', cookbookCtrl.update);
router.delete('/cookbooks/:id', cookbookCtrl.delete);

module.exports = router;
