var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next){
	res.render('index');
});

router.get('/index', function(req, res, next) {
	if(req.cookies.user !== null){
		req.user = req.cookies.user;
	}
	console.log(req.user);
	res.render('users', req);
});

router.post('/login', function(req, res, next){
	var username = req.body.username;
	var pwd = req.body.pwd;
	var user = {username: 'admin', pwd:123456};
	console.log(username + ',' + pwd);
	
	if(username == user.username && pwd == user.pwd){
		//Set cookie
		res.cookie("user", username, {maxAge:60000, httpOnly:false});
		res.redirect('index');
	}else{
		console.log("Error user");
		req.error = "User name or password is wrong";
		res.render('index', req);
	}
});

router.get('/logout', function(req, res, next){
	console.log('logout');
	res.clearCookie('user');
	res.render('index');
});

module.exports = router;
