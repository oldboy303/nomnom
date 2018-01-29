const express = require('express');
const router = express.Router();
const cookbookCtrl = require('../controllers/cookbook_ctrl');
const utils = require('../utils');

// CRUD Routes
router.post('/cookbooks/register', cookbookCtrl.register);
router.post('/cookbooks/login', cookbookCtrl.login);
router.put('/cookbooks/:id', utils.loginRequired, cookbookCtrl.update);
router.delete('/cookbooks/:id', utils.loginRequired, cookbookCtrl.delete);

module.exports = router;
