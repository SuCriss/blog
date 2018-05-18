/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50624
Source Host           : localhost:3306
Source Database       : blog

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2016-05-28 11:27:52
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT '文章标题',
  `content` text COLLATE utf8_unicode_ci COMMENT '文章内容',
  `pubtime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '发布时间',
  `date` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '存档时间',
  `brief` text COLLATE utf8_unicode_ci COMMENT '简介',
  `tag_id` tinyint(11) NOT NULL COMMENT '分类id',
  `hits` int(11) NOT NULL DEFAULT '0' COMMENT '点击次数',
  `bad` int(11) NOT NULL DEFAULT '0' COMMENT '不好',
  `good` int(11) NOT NULL DEFAULT '0' COMMENT '点赞',
  `image` varchar(255) COLLATE utf8_unicode_ci DEFAULT '' COMMENT '文章logo',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('1', 'PHP使用CURL抓取数据', '\n```PHP\n<?php\n\n	$url=\"http://www.baidu.com;\n    $ch = curl_init(); \n	\n	curl_setopt($ch, CURLOPT_URL, $url); \n	\n	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); \n	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); \n	\n	$response = curl_exec($ch); \n\n	if($error=curl_error($ch)){ \n	die($error); \n	} \n\n	curl_close($ch);\n	print_r($response);\n\n?>\n```\n                ', '2016-04-10 11:11:26', '2016年04月', 'PHP使用CURL抓取数据', '2', '20', '100', '100', '/images/php.jpg');
INSERT INTO `article` VALUES ('2', 'PHP工厂模式和单例模式', '\n                    \n\n> 设计模式无论任何语言都是通用的，java的设计模式达23种之多，PHP种也有一些设计模式，下面简单说下工厂模式和单例模式.\n\nObject.php文件:\n\n```PHP\n<?php\n/**\n * Created by PhpStorm.\n * User: Administrator\n * Date: 2016/3/10\n * Time: 11:57\n */\n\nnamespace Factory;\n\n\nclass Object {\n\n\n    private static $instance;\n\n    /**\n     * 单例模式\n     */\n\n    private function __construct(){\n\n    }\n\n    public static function getInstance(){\n\n        if(self::$instance){\n\n            return self::$instance;\n        }\n        self::$instance = new self();\n\n        return self::$instance;\n    }\n\n\n    public  function say(){\n\n\n        echo __METHOD__;\n\n    }\n\n}\n```\n\nObjectFactory.php文件:\n```php\n<?php\n/**\n * Created by PhpStorm.\n * User: Administrator\n * Date: 2016/3/10\n * Time: 11:56\n */\n\nnamespace Factory;\n\n\nclass ObjectFactory {\n\n    /**\n     * 工厂模式\n     */\n\n    public static function createObject(){\n\n\n        $obj = Object::getInstance();\n\n        \n      return $obj;\n    }\n\n}\n```\n\nautoload.php文件 ：\n```php\n<?php\n/**\n * Created by PhpStorm.\n * User: Administrator\n * Date: 2016/3/10\n * Time: 12:13\n */\n\nspl_autoload_register(\'autoload\');\n\nfunction autoload($className){\n\n\n    $classFile = ROOT.\'/\'.str_replace(\'\\\\\',\'/\',$className).\'.php\';\n\n    include $classFile;\n\n}\n```\n\nindex.php文件:\n\n```php\n<?php\n/**\n * Created by PhpStorm.\n * User: Administrator\n * Date: 2016/3/10\n * Time: 11:55\n */\n\n  define(\'ROOT\',__DIR__);\n\n  require \'autoload.php\';\n\n  $obj =  Factory\\ObjectFactory::createObject();\n\n  $obj->say();\n  ```\n工厂模式的好处就是我们创建对象的方法是统一的，不是在我们需要的地方直接使用new进行创建，降低了模块之间的耦合度，并且当我们修改了类的名称我们只需要在工厂类里修改一处即可完成。\n单例模式好处是我们使用对象的时候不是每次使用都去new一个新对象出来，这样造成很大的开支和浪费，单例模式保证我们程序运行过程中对象产生一次，节省了开支。\n通常模式都是放在一起使用的。\n\n\n                \n                \n                \n                \n                \n                \n                ', '2016-04-12 22:22:08', '2016年04月', '设计模式无论任何语言都是通用 的，java的设计模式达23种之多，PHP种也有一些设计模式，下面简单说下工厂模式和单例模式.', '2', '31', '101', '102', '/images/php.jpg');
INSERT INTO `article` VALUES ('3', 'Apache 代理nodejs', '\n                    \n> * 最近开始学习 Nodejs ，但是机子上已经有了 apache ，所以为了跑 Node ，就查询资料使用apache代理nodejs服务进行工作。\n\n* 1.首先，在 Apache 的配置文件中，打开 mod_proxy 和 mod_proxy_http 至于其他的自己看着打开就好，例如需要 FTP 的话就打开相应的 FTP 选项。即：去掉 httpd.conf     中的：\n\n*  `LoadModule proxy_module modules/mod_proxy.so` 和 `LoadModule proxy_http_module modules/mod_proxy_http.so`前面的 #\n\n*  2.在vhost文件中添加:\n    ```\n    <VirtualHost *:80>  \n          ServerName www.webtest.com  \n          ServerAlias www.webtest.com  \n           \n          ProxyRequests off  \n           \n          <Proxy *>  \n            Order deny,allow  \n            Allow from all  \n          </Proxy>  \n           \n          <Location />  \n            ProxyPass http://localhost:3000/  \n            ProxyPassReverse http://localhost:3000/  \n          </Location>  \n        </VirtualHost>  \n    ```\n\n*  3.在我们的 hosts 文件中增加:127.0.0.1 www.webtest.com\n\n* 4.随便写一个index.js文件\n\n```\n    var app = require(\'express\')();  \n    var http = require(\'http\').Server(app);  \n    var io = require(\'socket.io\')(http);  \n      \n    app.get(\'/\', function(req, res){  \n      \n        res.send(\'<h1>Welcome Realtime Server</h1>\');  \n    });  \n      \n    http.listen(3000, function(){  \n        console.log(\'listening on *:3000\');  \n    });\n\n```\n\n* 5.访问www.webtest.com即可.\n       \n                \n                \n                \n                \n                \n                \n                \n                ', '2016-05-18 21:08:08', '2016年05月', '最近开始学习 Nodejs ，但是机子上已经有了 apache ，所以为了跑 Node ，就查询资料使用apache代理nodejs服务进行工作。', '4', '92', '0', '0', '/images/nodejs.png');

-- ----------------------------
-- Table structure for resource
-- ----------------------------
DROP TABLE IF EXISTS `resource`;
CREATE TABLE `resource` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL COMMENT '资源名称',
  `brief` text COMMENT '资源简介 ',
  `links` varchar(255) DEFAULT NULL COMMENT '资源链接',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of resource
-- ----------------------------

-- ----------------------------
-- Table structure for tags
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tagname` varchar(30) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '分类名称',
  `logo` varchar(255) COLLATE utf8_unicode_ci DEFAULT '' COMMENT 'tag的图片',
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of tags
-- ----------------------------
INSERT INTO `tags` VALUES ('1', 'JAVA', null, '2016-04-01 21:55:11');
INSERT INTO `tags` VALUES ('2', 'PHP', '/images/php.jpg', '2016-03-31 21:55:22');
INSERT INTO `tags` VALUES ('4', 'NodeJs', '/images/nodejs.png', '2016-05-18 21:33:58');
INSERT INTO `tags` VALUES ('5', 'Scala', null, '2016-04-04 22:59:01');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT '' COMMENT '登录名称',
  `password` varchar(255) DEFAULT '' COMMENT '密码',
  `created_at` int(11) DEFAULT NULL,
  `updated_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'gaoxuxu', '123456', null, null);
