
const router = require('express').Router();

const UserController = require(CONTROLLER_PATH + 'user');

let userController = new UserController();

// Get single user userController.permission('Admin,Manager,Itself'),
router.get('/:id',  userController.get);

// Get all users, userController.permission('Admin,Manager'),
router.get('/', userController.getAll);

// Create user
router.post('/',  userController.create);


// Modify user userController.permission('Admin,Manager'),
router.put('/:id',  userController.update);

// Delete user userController.permission('Admin,Manager'),
router.delete('/:id',   userController.remove )


module.exports = router;
