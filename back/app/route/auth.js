
const router = require('express').Router();
const AuthController = require(CONTROLLER_PATH + 'auth');
let authController = new AuthController();

router.post('/', authController.create);
router.delete('/:token', authController.permission('Itself'), authController.remove);

module.exports = router;
