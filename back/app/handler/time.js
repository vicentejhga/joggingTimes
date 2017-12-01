
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
        let userId = req.params.userId;
        let data = req.body;
        new Promise(function (resolve, reject) {
            JoggingTimeModel.find({"userId":userId}, function (err, times) {
                if (err !== null) {
                    reject(err);
                } else {
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



    updateTime(req, callback) {
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
                return new Promise(function (resolve, reject) {
                    JoggingTimeModel.findOne({_id: req.params.id}, function (err, time) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!time) {
                                reject(new NotFoundError("Time not found"));
                            }
                            else {
                                resolve(time);
                            }
                        }
                    })
                });
            }
        )
        .then((time) => {
            time.date = validator.trim(data.date);
            time.time = validator.trim(data.time);
            time.distance = validator.trim(data.distance);
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


    deleteTime(req, callback) {
        let data = req.body;
        req.checkParams('id', 'Invalid time id provided').isMongoId();
        req.getValidationResult()
            .then(function (result) {
                    if (!result.isEmpty()) {
                        let errorMessages = result.array().map(function (elem) {
                            return elem.msg;
                        });
                        throw new ValidationError('There are validation errors: ' + errorMessages.join(' && '));
                    }
                    return new Promise(function (resolve, reject) {
                        JoggingTimeModel.findOne({_id: req.params.id}, function (err, time) {
                            if (err !== null) {
                                reject(err);
                            } else {
                                if (!time) {
                                    reject(new NotFoundError("Time not found"));
                                }
                                else {
                                    resolve(time);
                                }
                            }
                        })
                    });
                }
            )
            .then((time) => {
                time.remove();
                return time;
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