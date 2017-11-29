
const JoggingTimeModel = require(MODEL_PATH + 'time').JoggingTimeModel;
const ValidationError = require(ERROR_PATH + 'validation');
const NotFoundError = require(ERROR_PATH + 'not-found');
const BaseAutoBindedClass = require(BASE_PACKAGE_PATH + 'base-autobind');

class JoggingTimeHandler extends BaseAutoBindedClass {
    constructor() {
        super();
        this._validator = require('validator');
    }

    static get JOGGING_TIME_VALIDATION_SCHEME() {
        return {
    
            'userId': {
                isMongoId: {
                    errorMessage: 'Invalid user Id'
                },
                errorMessage: "Invalid email provided"
            }
        };
    }


}

module.exports = JoggingTimeHandler;