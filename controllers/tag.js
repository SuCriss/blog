/**
 * Created by Administrator on 2016/4/4.
 */
var express = require('express');
var router = express.Router();
var tags = require('../services/Tags');
var moment = require('moment');
//分类列表
router.get('/tags', function(req, res, next) {

    tags.getTagsList(function(err,tags){

        if (err) {

            return next(err);
        }
        for (var i = 0;i<tags.length ;i++)
        {
            tags[i].created_at = moment(tags[i].created_at).format('YYYY-MM-DD HH:mm:ss');
        }

        res.render('admin/backend/tags/index',{tagList : tags,path : '/tag/tags',open:'tag'});
    });
});
//添加分类界面
router.get('/addtag',function(req,res,next){


    res.render('admin/backend/tags/addtag',{path : '/tag/addtag',open:'tag'});

});
//添加分类处理
router.post('/addtagdeal',function(req,res,next){

    var tagname = req.body.tagname;

    tags.addTag(tagname,function(err,results){
        if (err) {

            return next(err);
        }
        res.redirect('/tag/tags');
    });
});
//更新分类处理
router.post('/updatetag',function(req,res,next){

    var tagname = req.body.tagname;
    var id = req.body.id;
    tags.updateTag(id,tagname,function(err,result){
        if (err) {

            res.json({status : 0,msg:'更新失败'});
        }
        res.json({status : 1,msg:'更新成功'});
    });
});
module.exports = router;
