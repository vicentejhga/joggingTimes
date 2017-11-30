const router = require('express').Router();
const TimeController = require(CONTROLLER_PATH + 'time');
let timeController = new TimeController();


// Get all times (add id?)
router.get('/:userId', timeController.getAll);

// Get all times from?


// Get one single time
//router.get('/:id', timeController.get);

 
// Create time
router.post('/', timeController.create);

// Remove time
router.delete('/:id', timeController.remove);

//update time
router.put('/:id', timeController.update);

module.exports = router;
