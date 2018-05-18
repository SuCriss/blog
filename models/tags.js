var db = require('./mysql');

var tags = {

    id: { type: 'serial', key: true } , //主键
    tagname: {type : 'text' ,size : 30},
    logo : String,
    created_at  : {type: 'date',time: true }
};
var Tags = db.define('tags',tags);

module.exports = Tags;