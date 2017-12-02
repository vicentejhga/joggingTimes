
const BaseAutoBindedClass = require(BASE_PACKAGE_PATH + 'base-autobind');
const JwtRsStrategy = require(AUTH_STRATEGY + 'jwt-rs');
const SecretKeyAuth = require(AUTH_STRATEGY + 'secret-key');
const CredentialsAuth = require(AUTH_STRATEGY + 'credentials');
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtToken = require(MODEL_PATH + 'auth/jwt-token');
const RevokedToken = require(MODEL_PATH + 'auth/revoked-token').RevokedTokenModel;
const ForbiddenError = require(ERROR_PATH + 'forbidden');

class PermisionManager extends BaseAutoBindedClass {
    constructor() {
       super();
    }


    _verifyRevokedToken(token, payload, callback) {
    

    }



    hasPermision( token ) {

    }
}
exports = module.exports = new PermisionManager();