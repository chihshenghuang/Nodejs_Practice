var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next){
	res.render('index');
});

router.get('/index', function(req, res, next) {
	if(req.cookies.user !== null){

	console.log(req.user);
	res.render('users', req);
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
	var pwd = req.body.pwd;
	var account = [];
	db.query('SELECT * FROM user', function(err, rows){
		if(err){
			console.log(err);
		}
		var objkey = Object.keys(rows);
		objkey.forEach(function(objectid){
			var items = Object.keys(rows[objectid]);
			items.forEach(function(itemkey){
				var itemvalue = rows[objectid][itemkey];
				if(itemvalue == username)
					account.push(itemvalue);		
				if(itemvalue == pwd && account[0] !== null)
					account.push(itemvalue);
			})	
		})
		console.log('user: ' + account[0], 'pwd: ' + account[1]);
	});
		
	if((account[0] == username) && (account[1] == pwd)){
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
