var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/login', function(req, res, next){
	var username = req.body.username;
	var pwd = req.body.pwd;
	var user = {username: 'admin', pwd:123456};
	console.log(username + ',' + pwd);
		
	if(username == user.username && pwd == user.pwd){
		//Set cookie
		res.cookie("user", username, {maxAge:60000, httpOnly			:false});
		res.redirect('index');
	}else{
		console.log("Error user");
		req.error = 'User name or password is wrong';
		res.render('index', req);
	}
});

router.get('/logout', function(req, res, next){
	//Delete cookie
	console.log('logout');
	res.clear('user');
	res.redirect('index');
});

router.get('/viewdata', function(req, res, next){
	console.log("View user's data");
	console.log(req.cookies.user);
	res.send(req.cookies.user);
});


module.exports = router;
