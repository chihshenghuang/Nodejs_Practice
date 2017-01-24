var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/logout', function(req, res, next){
	//Delete cookie
	console.log('logout');
	res.clear('user');
	res.redirect('index');
});

module.exports = router;
