/**
 * Created by Majid on 9/22/2014.
 */

var express = require('express');
var router = express.Router();
var userModel = require("../models/user").UserModel;
var tokenModel = require("../models/token").TokenModel;
var smsProfileModel = require("../models/sms-profile").SMSProfileModel;
var datejs = require('safe_datejs');
var userControl = require("./users");
var soap = require('soap');
var url = 'http://87.107.121.52/post/send.asmx?wsdl';

var sendSMS = function(username, password, to, from, body){
    try{
        var udh = "";
        var recId;
        var status;
        var args = {username : username, password : password, to : to, from : from, text: body, isFlash : false, udh : udh, recId : recId, status : status};
        console.log(args);
        soap.createClient(url, function(err, client) {
            client.SendSms(args, function(err, result) {
                console.log(result);
            });
        });
    }
    catch(ex){
        console.log(ex);
        res.send(ex, 500);
    }
}

//routes

router.route('/sendSMS').post(sendSMS);

module.exports = router;
module.exports.SendRelaxSMS = sendSMS;
