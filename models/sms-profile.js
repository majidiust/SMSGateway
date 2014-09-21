/**
 * Created by Majid on 9/22/2014.
 */

/**
 * New node file
 */
var mongoose = require('mongoose');
var datejs = require('safe_datejs');

var SMSProfileSchema = new mongoose.Schema({
    username: { type: String, required: true, uniquie: true},
    password: { type: String, required: true},
    sendMethod: {type:String,enum: ['SOAP', 'GET', 'POST']},
    rcvMethod: {type:String,enum: ['SOAP', 'GET', 'POST']},
    sendUrl : {type: String},
    rcvUrl: {type: String},
    created: { type: Date, default: (new Date()).AsDateJs()},
    clients : [{type: mongoose.Schema.ObjectId, ref:'Users'}],
    number : {type: String}
});

var SMSProfileModel = mongoose.model('SMSProfile', SMSProfileSchema);
module.exports.SMSProfileModel = SMSProfileModel;