/**
 * Created by Majid on 9/22/2014.
 */

/**
 * New node file
 */
var mongoose = require('mongoose');
var datejs = require('safe_datejs');

var SMSSchema = new mongoose.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    state: { type: String },
    created: { type: Date, default: (new Date()).AsDateJs()},
    body: { type: String},
    clients : [{type: mongoose.Schema.ObjectId, ref:'Users'}],
    profile: {type: mongoose.Schema.ObjectId, ref:'SMSProfile'}
});


var SMSModel = mongoose.model('SMS', SMSSchema);
module.exports.SMSModel = SMSModel;