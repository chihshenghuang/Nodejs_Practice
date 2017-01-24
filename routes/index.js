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
	res.render('login', req);
});

module.exports = router;
