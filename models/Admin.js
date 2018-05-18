/**
 * Created by sukun on 2018/5/18.
 */
var db = require('./mysql');

var Admin = {

    id: { type: 'serial', key: true } , //主键
    username: String,
    password: String,
    created_at  : {type: 'date',time: true },
    updated_at  : {type: 'date',time: true }
};
var Admin = db.define('admin',Admin);

module.exports = Admin;