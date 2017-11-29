const router = require('express').Router();
const TimeController = require(CONTROLLER_PATH + 'time');
let timeController = new TimeController();

router.get('/', timeController.getAll);
router.get('/:id', timeController.get);
router.post('/', timeController.create);
router.delete('/:id', timeController.remove);
router.put('/:id', timeController.update);

module.exports = router;
