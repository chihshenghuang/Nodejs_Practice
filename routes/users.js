var express = require('express');
var router = express.Router();

router.get('/viewdata', function(req, res, next){
	console.log("View user's data");
	res.send(req.cookies.user);
});

module.exports = router;
