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
var relaxSMS = require("./relax-sms-gateway");


var sendSMS = function(req, res){
    try{
        var tos = [];
        tos.push("09128610522");
        tos.push("09197343303");
        relaxSMS.SendRelaxSMS("msadeghi", "76049270", tos , "30002666000220", "test");

//        var to = req.body.to;
//        var profileId = req.body.profile;
//        var msg = req.body.message;
//        if(!to || !profileId || !msg){
//            res.send("Parameters not found", 403);
//        }
//        else{
//            smsProfileModel.find({'_id' : profileId}).exec(function(err, profile){
//                if(err)
//                    res,send(err, 500);
//                else if(!profile){
//                    res.send("profile id is incorrect", 406);
//                }
//                else{
//                    //TODO : User related profile mechanism
//                    relaxSMS.SendRelaxSMS("msadeghi","76049270","09197343303","test");
//                }
//            });
//        }
    }
    catch(ex){
        console.log(ex);
        res.send(ex, 500);
    }
}

//routes

router.route('/sendSMS').post(sendSMS);

module.exports = router;
