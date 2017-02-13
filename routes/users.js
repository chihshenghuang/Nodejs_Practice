var express = require('express');
var router = express.Router();

router.get('/viewdata', function(req, res, next){
	console.log("View user's data");
	//res.send(req.cookies.user);
	var db = req.con;
	
	if(req.cookies.user){	
        	db.query('SELECT * FROM users WHERE account = ?', req.cookies.user, function(err, rows){
                	if(err){
                        	console.log(err);
			}
			res.render('users', {account: rows[0].account, 
					email: rows[0].email,
					create_time: rows[0].create_time,
					update_time: rows[0].update_time})
        	});
	}else{
		console.log("No user login now!");
		res.send("No user login now!");
	}

});

module.exports = router;
