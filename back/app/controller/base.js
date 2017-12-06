
const ResponseManager = require(MANAGER_PATH + 'response');
 
const BaseAutoBindedClass = require(BASE_PACKAGE_PATH + 'base-autobind');

class BaseController extends BaseAutoBindedClass {
    constructor() {
        super();
        if (new.target === BaseController) {
            throw new TypeError("Cannot construct BaseController instances directly");
        }
        this._responseManager = ResponseManager;
        this._passport = require('passport')
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

    permission( allowed ){
        let that = this;
        return function (req, res, next) {
            that.authenticate(req, res, next, (token, user) => {

                let arr_allowed = allowed.split(',');

                if (( arr_allowed.indexOf( user.role ) > -1 ) ||
                    ( arr_allowed.indexOf( 'Itself' ) > -1 && user.id == req.params.id )) {
                    next();
                } else {
              
                    that._responseManager.respondWithError( res,401, "User is not authorized");
                }
            }); 
        };
    }
}
module.exports = BaseController;