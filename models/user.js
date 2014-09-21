var mongoose = require('mongoose');
var bcrypt = require("bcrypt-nodejs");
var datejs = require('safe_datejs');

var Schema = mongoose.Schema;

var UserRole = new Schema({
    rolename            :   {type : String},
    roledesc            :   String
});

var UserActivity = new Schema({
    activityname        : { type: String, required:true},
    activitydate        : Date,
    activitydesc        : String
});

var ReplicateUrl = new mongoose.Schema({
    method: {type:String,enum: ['POST', 'GET']},
    url : {type: String},
    state : {type: String, default:"1"},
    createDate : { type: Date, default: (new Date()).AsDateJs()}
});

var User = new Schema({
    username            :   {type : String,  unique: true, required : true},
    hashedpassword      : {
        type: String,
        required: true
    },
    salt                : {
        type: String,
        required: true
    },
    registerdate        :   {type: String, default:Date.now},
    roles               :   [UserRole],
    activities          :   [UserActivity],
    firstname           :   String,
    lastname            :   String,
    mobileNumber        :   String,
    gender              :   Boolean,
    email               :   {type : String,  unique : true, required : true},
    isaproved           :   Boolean,
    islockedout         :   Boolean,
    replicateUrl        : [ReplicateUrl]
});


User.pre('save', function (callback) {
    console.log("pre saved user function");
    var user = this;
    if (!user.isModified('hashedpassword')) return callback();
    else {
        bcrypt.genSalt(5, function (err, salt) {
            if (err) {
                console.log(err);
                return callback(err);
            }
            else {
                bcrypt.hash(user.hashedpassword, salt, null, function (err, hash) {
                    if (err)
                        return callback(err);
                    else{
                        user.hashedpassword = hash;
                        user.salt = salt;
                        callback();
                    }
                });
            }
        });
    }
});

User.methods.verifyPassword = function (password, cb) {
    bcrypt.compare(password, this.hashedpassword, function (err, isMatch) {
        if (err)
            return cb(err);
        else {
            cb(null, isMatch);
        }
    });
}

User.methods.getBrief = function(){
    var result =  {
        id      :   this.id,
        username : this.username,
        email : this.email,
        firstName : this.firstname,
        lastName : this.lastname,
        registerDate : this.registerdate,
        mobileNumber : this.mobileNumber,
        gender       : this.gender
    };
    return result;
}

User.virtual('userId')
    .get(function () {
        return this.id;
    });

var UserModel = mongoose.model('Users',User);

module.exports.UserModel = UserModel;