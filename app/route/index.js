 
const router = require('express').Router();
const UserController = require(CONTROLLER_PATH + 'user');
let userController = new UserController();

router.get('/', userController.get)
module.exports = router;
