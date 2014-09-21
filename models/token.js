/**
 * Created by Majid on 9/22/2014.
 */

/**
 * New node file
 */
var mongoose = require('mongoose');
var datejs = require('safe_datejs');

var TokenSchema = new mongoose.Schema({
    clientId : { type: mongoose.Schema.Types.ObjectId , required: true},
    token: { type: String, required: true },
    exp: { type: String, required: true },
    state: { type: Boolean, default: true },
    created: { type: Date, default: (new Date()).AsDateJs()},
    deleted: { type: Date, default: (new Date()).AsDateJs()}
});


var TokenModel = mongoose.model('Token', TokenSchema);
module.exports.TokenModel = TokenModel;