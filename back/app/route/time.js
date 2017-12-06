const router = require('express').Router();
const TimeController = require(CONTROLLER_PATH + 'time');


let timeController = new TimeController();


// Create time
router.post('/', timeController.permission('Admin,Itself'), timeController.create);

// Remove time
router.delete('/:id', timeController.permission('Admin,Itself'), timeController.remove);

// Get all times for an specific user
router.get('/:id', timeController.permission('Admin,Itself'), timeController.getAll);


// Get all times for an specific user
router.get('/weekly/:id', timeController.permission('Admin,Itself'), timeController.getWeeklyReport);



// Update time
router.put('/:id', timeController.permission('Admin,Itself'), timeController.update);

module.exports = router;
