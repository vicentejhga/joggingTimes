
const router = require('express').Router();
const UserController = require(CONTROLLER_PATH + 'user');
let userController = new UserController();


// Get single user
router.get('/:id', userController.get);

// Create user
router.post('/', userController.create);


router.get('/', userController.getAll);
// Modify user


// Get all users

// Delete user
module.exports = router;
