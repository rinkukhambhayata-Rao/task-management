const userService = require("../services/user.service");

let userController = {};
userController.addUser = function (req, res) {
    console.log('body params ',req.body);
    userService.addUser(req.body)
    .then((response) => {
        console.log('response from add user service ',response);
        return res.status(response.status).json({ status: response.status, message: response.message || 'success', data: response.data });
    }).catch((error) => {
        return res.status(error.status || 500).json({ status: error.status, message: error.message || 'failure', data: {} });
    });
}

userController.loginUser = function (req, res) {
    console.log('query params ',req.body);
    userService.loginUser(req.body)
    .then((response) => {
        console.log('response from add user service ',response);
        return res.status(response.status).json({ status: response.status, message: response.message || 'success', data: response.data });
    }).catch((error) => {
        return res.status(error.status || 500).json({ status: error.status, message: error.message || 'failure', data: {} });
    });
}

module.exports = userController;