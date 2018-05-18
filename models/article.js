
var db = require('./mysql');

var Tag = require('./tags');
var article = {

    id: { type: 'serial', key: true } , //主键
    title : String,
    leftLogo:String,
    content : {type: 'text'},
    pubtime : {type: 'date',time: true },
    date : String,
    brief : {type : 'text'},
    tag_id : {type: 'integer'},
    hits : {type: 'integer',defaultValue: 0 },
    bad : {type: 'integer',defaultValue: 0 },
    good : {type: 'integer',defaultValue: 0 },
    image : String
};

var Article = db.define('article',article);

Article.hasOne('tag',Tag,{autoFetch:true});

module.exports = Article;