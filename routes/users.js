var express = require('express');
var router = express.Router();

router.get('/viewdata', function(req, res, next){
	console.log("View user's data");
	//res.send(req.cookies.user);
	var db = req.con;
	
        db.query('SELECT * FROM users WHERE account = ?', req.cookies.user, function(err, rows){
                if(err){
                        console.log(err);
		}
		res.render('usersdata', {account: rows[0].account, 
					password: rows[0].password, 
					email: rows[0].email,
					create_time: rows[0].create_time,
					update_time: rows[0].update_time})
        });
});

module.exports = router;
