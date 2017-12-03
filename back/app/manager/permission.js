
const BaseAutoBindedClass = require(BASE_PACKAGE_PATH + 'base-autobind');

class PermissionManager extends BaseAutoBindedClass {
    constructor() {
       super();
    }


    permission( allowed ){
        let that = this;
        return function (req, res, next) {
            that.authenticate(req, res, next, (token, user) => {
                let arr_allowed = allowed.split(',');
                console.log(token,use);

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
module.exports = PermissionManager;