
const BaseController = require(CONTROLLER_PATH + 'base');
const UserHandler = require(HANDLER_PATH + 'user');

const util = require("util");

class UserController extends BaseController {
    constructor() {
        super();
        this._userHandler = new UserHandler();
        this._passport = require('passport');
    }

    get(req, res, next) {
        let responseManager = this._responseManager;
        let that = this;
        this._passport.authenticate('jwt-rs-auth', { 
            onVerified: function (token, user) {
                that._userHandler.getUserInfo(req, user, responseManager.getDefaultResponseHandler(res));
            },
            onFailure: function (error) {
                responseManager.respondWithError(res, error.status || 401, error.message);
            }
        })(req, res, next);
    } 

    update(req, res, next) {
      let responseManager = this._responseManager;
        let that = this;
        this._passport.authenticate('jwt-rs-auth', { 
            onVerified: function (token, user) {
               that._userHandler.updateUser(req, responseManager.getDefaultResponseHandler(res));
            },
            onFailure: function (error) {
                responseManager.respondWithError(res, error.status || 401, error.message);
            }
        })(req, res, next);
    }

    getAll(req, res, next) {
        let responseManager = this._responseManager;
        let that = this;
        this._passport.authenticate('jwt-rs-auth', { 
            onVerified: function (token, user) {
                that._userHandler.getAllUsers(req, user, responseManager.getDefaultResponseHandler(res));
            },
            onFailure: function (error) {
                responseManager.respondWithError(res, error.status || 401, error.message);
            }
        })(req, res, next);
    }


    remove(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            this._userHandler.deleteUser(req, this._responseManager.getDefaultResponseHandler(res));
        });
    }




    create(req, res) {
        let responseManager = this._responseManager;
        this._userHandler.createNewUser(req, responseManager.getDefaultResponseHandler(res));
    }

/*
    authenticate(req, res, callback) {
        let responseManager = this._responseManager;
         
        this._passport.authenticate('jwt-rs-auth', {
            onVerified: callback,
            onFailure: function (error) {
                responseManager.respondWithError(res, error.status || 401, error.message);
            }
        })(req, res);
    }
*/
}

module.exports = UserController;