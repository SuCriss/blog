
var User = require("../models/user");
var moment = require('moment');

/**
 * 根据用户名字获取用户信息
 * @param name
 * @param callback
 * @returns {*}
 */
//获取用户信息
exports.getUserInfo = function(name,callback){

    if(name.length == 0)
    {
        return callback(null,[]);
    }
    User.find({username :name },callback);
};
