const router = require('express').Router();
const TimeController = require(CONTROLLER_PATH + 'time');


let timeController = new TimeController();


// Create time
router.post('/', timeController.create);

// Remove time
router.delete('/:id',  timeController.remove);

// Get all times for an specific user
router.get('/:userId/:from?',  timeController.getAll);
//router.get('/:userId/',  timeController.getAll);


// Get all times for an specific user
router.get('/weekly/:userId', timeController.getWeeklyReport);



// Update time
router.put('/:id',  timeController.update);

module.exports = router;
