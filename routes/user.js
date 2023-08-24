var express = require("express");
var router = express.Router();
const userController = require('./../controller/user.controller');

router.route("/")
    .post(userController.addUser)
    .put(userController.loginUser);

module.exports = router;