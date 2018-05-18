
var db = require('./mysql');

 var user = {

         id: { type: 'serial', key: true } , //主键
         username: String,
         password: String,
         created_at  : {type: 'date',time: true },
         updated_at  : {type: 'date',time: true }
 };
var User = db.define('user',user);

module.exports = User;