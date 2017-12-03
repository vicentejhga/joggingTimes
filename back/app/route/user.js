
const router = require('express').Router();

const UserController = require(CONTROLLER_PATH + 'user');

let userController = new UserController();

// Get single user
router.get('/:id', userController.permission('Itself,Admin,Manager'), userController.get);

// Get all users
router.get('/', userController.permission('Admin,Manager'), userController.getAll);

// Create user
router.post('/',  userController.create);


// Modify user
router.put('/:id', userController.permission('Admin,Manager'), userController.update);

// Delete user
router.delete('/:id', userController.permission('Admin,Manager'), userController.remove )


module.exports = router;
