var express = require('express');
var router = express.Router();

var isLoginError = false;


/* GET home page. */
router.get('/', function(req, res, next){
		res.render('index', {title: 'welcome'});
});

// User login success
router.get('/success', function(req, res, next) {
	isLoginError = true;
	if(req.cookies.user !== null){
		console.log(req.user);
		res.render('users', req);
	}
});

// User login fail
router.get('/error', function(req, res, next){
	if(req.error !== null){
		console.log("error error");
		isLoginError = true;
		req.error = null;
		res.render('index', {title: 'Wrong', isLoginError: isLoginError});
	}
});


router.get('/signup', function(req, res, next){
	res.render('signup', req);
});

router.post('/signup', function(req, res, next){
	var db = req.con;
	var sql = {
		account: req.body.username,
		password: req.body.pwd
	};

	var query = db.query('INSERT INTO user SET ?', sql, function(err,rows){
		if(err){
			console.log(err);
		}
		console.log("Success to sign up!");
		res.render('index');
	});
});

router.post('/login', function(req, res, next){
	var db = req.con;
	var username = req.body.username;
	var password = req.body.pwd;
	var username_verify = false,
	    password_verify = false;

	db.query('SELECT * FROM user', function(err, rows){
		if(err){
			console.log(err);
		}
		var objkey = Object.keys(rows);
		objkey.forEach(function(objectid){
			var items = Object.keys(rows[objectid]);
			items.forEach(function(itemkey){
				var itemvalue = rows[objectid][itemkey];
				if((itemkey == 'account') && (itemvalue == username)){
					username_verify = true;
					console.log(itemvalue, username_verify);
				}
				if((itemkey == 'password') && (itemvalue == password) && username_verify == true){
					password_verify = true;
					console.log(itemvalue, password_verify);
				}
			})
		})
	
		console.log(username_verify, password_verify);
		if((username_verify == true) && (password_verify == true)){
			//Set cookie
			username_verify = false;
			password_verify = false;
			res.cookie("user", username, {maxAge:60000, httpOnly:false});
			res.redirect('success');
		}else{
			console.log("Error user");
			username_verify = false;
			password_verify = false;
			req.error = 'Wrong';
			res.redirect('error');
		}
	});
});

router.get('/logout', function(req, res, next){
	console.log('logout');
	//res.clearCookie('user');
	res.render('index', {title: 'welocme'});
});

module.exports = router;
