var express = require('express');
var router = express.Router();
const AccountController = require('../controllers/account.controller')

/* GET home page. */
router.get('/', AccountController.getAccountInfo);

router.get('/login', AccountController.login);

router.get('/register', AccountController.register);

module.exports = router;