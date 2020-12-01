var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller')

/* GET home page. */
router.get('/', userController.getAccountInfo);

router.get('/login', userController.login);

router.post('/login', userController.checkLogin);

router.get('/register', userController.register);

router.post('/register', userController.addNewAccount);

module.exports = router;
