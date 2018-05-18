var express = require('express');
var router = express.Router();
var admin = require('../services/Admin');


/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('admin/login',{error : ''});

});
router.get('/register',function (req,res,next) {

    res.render('admin/register',{error:''})

})

router.post('/login', function(req, res, next) {

    var username = req.body.username;
    var password = req.body.password;

    admin.getAdminInfo(username,password,function (results) {
        if(results){
            for(var i in results){
                if(results[i].username == username && results[i].password ==password){
                    res.render('admin/backend/index',{path : '',open:'',results:results});
                }else{
                    res.render('admin/login',{error : '账号或者密码不存在'});
                }
            }
        }
    })
});
router.post('/register',function (req,res,next) {
    var registerName = req.body.username
    var registerpwd = req.body.password
    admin.addUsers(registerName,registerpwd,function(err,results){
        if (err) {
            res.json({status : 0,msg:'注册失败'});
        }
        res.json({status : 1,msg:'注册成功'});
    });
})

module.exports = router;
