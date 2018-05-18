/**
 * Created by sukun on 2018/5/18.
 */
var Admin = require("../models/Admin");
var moment = require('moment');
var TABLE = 'admin'
//注册管理员用户
exports.addUsers = function (username,password,callback) {
    var newRecord = {};
    newRecord.username = username;
    newRecord.password = password;
    newRecord.created_at = moment().format('YYYY-MM-DD HH:mm:ss');
    newRecord.updated_at = moment().format('YYYY年MM月');
    Admin.create(newRecord, function(err, results) {

        return callback(err,results);
    });
}
//获取管理员信息
exports.getAdminInfo = function (name,pwd,callback) {
    Admin.find({},function (err,results,files) {
        if(err){
            throw err
        }
        if(results){
            return callback(results)
        }
    })
}