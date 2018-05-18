
var db = require("../config/db");
var orm = require("orm");
//拼接 连接mysql的 uri
var uri = "mysql://"+db.user+":"+db.password+"@"+db.host+"/"+db.database;
//连接数据库
var conn = orm.connect(uri,function (err, db) {

    if(err)
    {
        return console.error('Connection error: ' + err);
    }

});
module.exports = conn;






