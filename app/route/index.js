
const express = require('express'),
    router = express.Router();


router.use('/auth', require('./auth.js'));
router.use('/users', require('./user.js'));


module.exports = router;