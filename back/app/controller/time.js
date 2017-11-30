
const BaseController = require(CONTROLLER_PATH + 'base');
const TimeHandler = require(HANDLER_PATH + 'time');



class TimeController extends BaseController {
    constructor() {
        super();
        this._timeHandler = new TimeHandler();
        this._passport = require('passport');
    }

    getAll(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            this._timeHandler.getAll(req, this._responseManager.getDefaultResponseHandler(res));
        });
    }

    create(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            this._timeHandler.createNewTime(req, this._responseManager.getDefaultResponseHandler(res));
        });
    }

    update(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            this._timeHandler.updateTime(req, this._responseManager.getDefaultResponseHandler(res));
        });
    }

    remove(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            this._timeHandler.deleteTime(req, this._responseManager.getDefaultResponseHandler(res));
        });
    }

    authenticate(req, res, next, callback) {
        let responseManager = this._responseManager;
        this._passport.authenticate('jwt-rs-auth', {
            onVerified: callback,
            onFailure: function (error) {
                responseManager.respondWithError(res, error.status || 401, error.message);
            }
        })(req, res, next);
    }
}

module.exports = TimeController;