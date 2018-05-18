var express = require('express');
var router = express.Router();
var user = require('../services/User');
var moment = require('moment');
var tags = require('../services/Tags');
var article = require('../services/Article');
router.get('/', function(req, res, next) {
    //文章列表
    //每页显示的记录数
    var pageSizes = 5;
    //当前页
    var pageNow = req.query.page ? req.query.page : 1;
    //获取总文章数量
    article.articleCount(function(err,count){
        //获取文章列表
        article.articleList(pageSizes,pageNow,function(err,articleList){
            //时间格式处理
            for (var i = 0;i<articleList.length ;i++)
            {
                articleList[i].pubtime = moment(articleList[i].pubtime).format('YYYY-MM-DD HH:mm:ss');
            }
            //获取最新文章
            article.articleNew(function(err,articleNews){
                //时间格式处理
                for (var i = 0;i<articleNews.length ;i++)
                {
                    articleNews[i].pubtime = moment(articleNews[i].pubtime).format('YYYY-MM-DD');
                }
                //获取标签
                tags.getTagsList(function(err,tags){

                    //获取存档
                    article.articleArchives(function(err,archives){

                     //文章分类文章数
                        article.articleTagCount(function(err,tagCounts){

                            //计算总页数
                            var totalPage = parseInt((count + pageSizes -1) / pageSizes);
                            res.render('index',{
                                articleList : articleList,
                                articleNews : articleNews,
                                tagList : tags,
                                archives : archives,
                                tagCounts : tagCounts,
                                totalCount: count,
                                totalPage : totalPage,
                                currentPage : pageNow,
                                path : 'index'
                            });
                        });
                    });
                });
            });
        });
    });
});
//获取文章具体内容
router.get('/:id.html',function(req, res, next){

    var id = req.params.id;
    article.articleNew(function(err,articleNews){
        //时间格式处理
        for (var i = 0;i<articleNews.length ;i++)
        {
            articleNews[i].pubtime = moment(articleNews[i].pubtime).format('YYYY-MM-DD');
        }
        //获取标签
        tags.getTagsList(function(err,tags){
            //获取存档
            article.articleArchives(function(err,archives){
                //文章分类文章数
                article.articleTagCount(function(err,tagCounts){
                  //更新文章的点击数
                    article.articleViewsUpdate(id,function(err,result){
                        //获取 上一篇和下一篇
                        article.upAndDown(id,function(err,updowns){
                            console.log(updowns);
                            res.render('article',{
                                articleNews : articleNews,
                                tagList : tags,
                                archives : archives,
                                tagCounts : tagCounts,
                                aid : id,
                                updowns : updowns,
                                path : 'index'
                            });
                        });
                    });
                });
            });
        });
    });
});
//点赞
router.get('/good',function(req, res, next){

    var id = req.query.id;
    article.articleGoodUpdate(id,function(err,result){

        if (err) {

            return next(err);
        }
        res.json({status:1,msg:'点赞成功'});
    });
});
//踩
router.get('/bad',function(req, res, next){

    var id = req.query.id;
    article.articleBadUpdate(id,function(err,result){

        if (err) {

            return next(err);
        }
        res.json({status:1,msg:'踩成功'});
    });
});
//文章列表
router.get('/list',function(req, res, next){
    //文章列表
    //每页显示的记录数
    var pageSizes = 10;
    //当前页
    var pageNow = req.query.page ? req.query.page : 1;
    //查询条件
    var tagid =  req.query.id ? req.query.id : 0;
    var key = req.query.key ? req.query.key : 0;
    var date  = req.query.date ? req.query.date : 0;
    //获取文章列表
    var param = {'pageSize' : pageSizes,'pageNow':pageNow,'tagid':tagid,'key' : key,'date' : date};
    article.articleSearchList(param,function(err,articleList){
        //时间格式处理
        for (var i = 0;i<articleList.length ;i++)
        {
            articleList[i].pubtime = moment(articleList[i].pubtime).format('YYYY-MM-DD HH:mm:ss');
        }
    //获取总文章数量
    article.articleCount(function(err,count){

            //获取最新文章
            article.articleNew(function(err,articleNews){
                //时间格式处理
                for (var i = 0;i<articleNews.length ;i++)
                {
                    articleNews[i].pubtime = moment(articleNews[i].pubtime).format('YYYY-MM-DD');
                }
                //获取标签
                tags.getTagsList(function(err,tags){

                    //获取存档
                    article.articleArchives(function(err,archives){

                        //文章分类文章数
                        article.articleTagCount(function(err,tagCounts){

                            //计算总页数
                            var totalPage = parseInt((count + pageSizes -1) / pageSizes);
                            res.render('articleList',{
                                articleList : articleList,
                                articleNews : articleNews,
                                tagList : tags,
                                archives : archives,
                                tagCounts : tagCounts,
                                totalCount: count,
                                totalPage : totalPage,
                                currentPage : pageNow,
                                path : 'list'
                            });
                        });
                    });
                });
            });
        });
    });
});
router.get('/about',function(req, res, next){

    //获取最新文章
    article.articleNew(function(err,articleNews){
        //时间格式处理
        for (var i = 0;i<articleNews.length ;i++)
        {
            articleNews[i].pubtime = moment(articleNews[i].pubtime).format('YYYY-MM-DD');
        }
        //获取标签
        tags.getTagsList(function(err,tags){

            //获取存档
            article.articleArchives(function(err,archives){

                //文章分类文章数
                article.articleTagCount(function(err,tagCounts){

                    //计算总页数
                    res.render('about',{
                        articleNews : articleNews,
                        tagList : tags,
                        archives : archives,
                        tagCounts : tagCounts,
                        path : 'about'
                    });
                });
            });
        });
    });
});
module.exports = router;
