
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
                errorMessage: 'Invalid email provided'
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
                    date: data.date,
                    userId: data.userId
                });
            })
            .then((time) => {
                time.save();

                return time;
            })
            .then((saved) => {
                callback.onSuccess(saved);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }


    getAll(req, callback) {
        //req.checkParams('id', 'Invalid user id provided').isMongoId();
   
        let userId = req.params.userId;
        let data = req.body;
        new Promise(function (resolve, reject) {
            JoggingTimeModel.find({"userId":userId}, function (err, times) {
                if (err !== null) {
                    reject(err);
                } else {
                    console.log(times)
                    resolve(times);
                }
            });
        })
        .then((times) => {
            callback.onSuccess(times);
        })
        .catch((error) => {
            callback.onError(error);
        });
    }
}

module.exports = JoggingTimeHandler;