var express = require("express");
var router = express.Router();

const userApiController = require("../../controllers/api/user-api-controller");

router.get("/check-email-exist", userApiController.checkEmailExist)

module.exports = router;
