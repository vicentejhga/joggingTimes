
const router = require('express').Router();
const UserController = require(CONTROLLER_PATH + 'user');
let userController = new UserController();


// Get single user
router.get('/:id', userController.get);

// Create user
router.post('/', userController.create);

// Get all users
router.get('/', userController.getAll);

// Modify user
router.put('/:id', userController.update);

// Delete user
router.delete('/:id', userController.remove )


module.exports = router;
