
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
            'distance':{
                notEmpty: true,
                errorMessage: 'Invalid distance'
            },
            'time':{
                notEmpty: true,
                errorMessage: 'Invalid time'
            },
            'date':{
                notEmpty: true,
                errorMessage: 'Invalid date'
            },  
            'userId': {
                isMongoId: {
                    errorMessage: 'Invalid user Id'
                },
                errorMessage: "Invalid email provided"
            }
        };
    }


    createNewTime(req, callback) {
        let data = req.body;
        let validator = this._validator;
        
        req.checkBody(JoggingTimeHandler.JOGGING_TIME_VALIDATION_SCHEME);
        req.getValidationResult()
            .then(function (result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError('There are validation errors: ' + errorMessages.join(' && '));
                }
                return new JoggingTimeModel({
                    distance: data.distance,
                    time: data.time,
                    date: date.date,
                    authorId: data.authorId
                });
            })
            .then((user) => {
                user.save();
                return user;
            })
            .then((saved) => {
                callback.onSuccess(saved);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

}

module.exports = JoggingTimeHandler;