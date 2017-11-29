

const BaseAuthStrategy = require(AUTH_STRATEGY + 'base-auth');
const InvalidPayloadError = require(ERROR_PATH + 'invalid-payload');
const UnauthorizedError = require(ERROR_PATH + 'unauthorized');

class SecretKeyAuthStrategy extends BaseAuthStrategy {
    constructor(options) {
        super();
        this._options = options;
        this._initStrategy();
    }

    static get AUTH_HEADER() {
        return "Authorization";
    }

    _initStrategy() {

    }

    get name() {
        return 'secret-key-auth';
    }

    static _extractKeyFromHeader(req) {
        return req.headers[SecretKeyAuthStrategy.AUTH_HEADER.toLowerCase()];
    }

    _verifyCredentials(key) {
        console.log(this.provideSecretKey());
        return key === this.provideSecretKey();
    }

    authenticate(req, callback) {
        let secretKey = SecretKeyAuthStrategy._extractKeyFromHeader(req);
        console.log(secretKey);
        if (!secretKey) {
            return callback.onFailure(new InvalidPayloadError("No auth key provided"));
        }
        if (this._verifyCredentials(secretKey)) {
            return callback.onVerified();
        } else {
            return callback.onFailure(new UnauthorizedError("Invalid secret key"));
        }
    }

    provideSecretKey() {
        return this._options.secretKey;
    }

    provideOptions() {
        return this._options;
    }
}

module.exports = SecretKeyAuthStrategy;
