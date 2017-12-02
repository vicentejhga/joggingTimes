
const ResponseManager = require(MANAGER_PATH + 'response');
const PermisionManager = require(MANAGER_PATH + 'permision');
const BaseAutoBindedClass = require(BASE_PACKAGE_PATH + 'base-autobind');

class BaseController extends BaseAutoBindedClass {
    constructor() {
        super();
        if (new.target === BaseController) {
            throw new TypeError("Cannot construct BaseController instances directly");
        }
        this._responseManager = ResponseManager;
        this._permisionManager = ResponseManager;
    }

    getAll(req, res) {

    }

    get(req, res) {

    }

    create(req, res) {

    }

    update(req, res) {

    }

    remove(req, res) {

    }

    authenticate(req, res, callback) {

    }
}
module.exports = BaseController;