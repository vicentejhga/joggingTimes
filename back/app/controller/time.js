
const BaseController = require(CONTROLLER_PATH + 'base');
const TimeHandler = require(HANDLER_PATH + 'time');



class PostController extends BaseController {
    constructor() {
        super();
        this._timeHandler = new TimeHandler();
        this._passport = require('passport');
    }



    create(req, res, next) {
    
    }

    update(req, res, next) {
      
    }

    remove(req, res, next) {
        
    }

    authenticate(req, res, next, callback) {

    }
}

module.exports = TimeController;