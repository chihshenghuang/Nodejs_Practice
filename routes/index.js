var express = require('express');
var router = express.Router();
var isLoginError = false;
var crypto = require('crypto');
var multer = require('multer');
var upload = multer({dest:'uploads/'});

const fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next){
  res.render('index', {title: 'Welcome'});
});


// User login success
router.get('/success', function(req, res, next) {
  isLoginError = true;
  if(req.cookies.user !== null){
    console.log(req.cookies.user);
    res.render('users', req);
  }
});

// User login fail
router.get('/error', function(req, res, next){
  if(req.error !== null){
    console.log("error error");
    isLoginError = true;
    req.error = null;
    res.render('index', {title: 'Wrong, please try again!', isLoginError: isLoginError});
  }
});

router.get('/signup', function(req, res, next){
  res.render('signup', req);
});

router.post('/signup', function(req, res, next){
  var db = req.con;
  var hashPassword = saltHashPassword(req.body.pwd);
	
  var sql = {
    account: req.body.username,
    usersalt: hashPassword.salt,
    password: hashPassword.passwordHash,
    email: req.body.email,
    create_time: new Date,
    update_time: new Date
  };

  var query = db.query('INSERT INTO users SET ?', sql, function(err,rows){
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
  var usersalt;

  db.query('SELECT * FROM users', function(err, rows){
    if(err){
      console.log(err);
    }
    var objkey = Object.keys(rows);
    objkey.forEach(function(objectid){
      var items = Object.keys(rows[objectid]);
      items.forEach(function(itemkey){
        var itemvalue = rows[objectid][itemkey];
        if((itemkey == 'account') && (itemvalue == username)){
          usersalt = rows[objectid].usersalt;
	  username_verify = true;
	  console.log(itemvalue, username_verify);
        }
        if((itemkey == 'password') && username_verify == true && (sha512(password, usersalt).passwordHash == itemvalue)){
          password_verify = true;
	  console.log(itemvalue, password_verify);
        }
      })	
			
    })
	
    if((username_verify == true) && (password_verify == true)){
      //Set cookie
      console.log("set cookie");
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
  res.render('index', {title: 'Welcome!'});
});

/* GET pagination practice page */
router.get('/pagination', function(req, res, next){
  console.log('pagination');
  res.render('pagination');
});

/* File download */
router.get('/:file', function(req, res, next){
  var file = req.params.file;
  path = __dirname + "/../files/" + file;
  console.log(path);
  res.download(path, function(err){
    if (err)
      res.status(404).send("Sorry, we can't find it!");    
  });
});

/* File upload */
router.post('/upload', upload.single('uploadFile'), function(req, res, next){
  var newPath = __dirname + "/../uploads/" + req.file.filename;
  var renamePath =  __dirname + "/../uploads/" + req.file.originalname;
  fs.readFile(req.file.path, function(err, data){
    if(err)
      throw err;
    fs.writeFile(newPath, data, function(err){
      if(err)
        throw err;
    });
    fs.rename(newPath, renamePath, function(err){
      if(err)
        throw err;
      res.redirect('back');
    });
  });
});






/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */

var genRandomString = function(length){
  return crypto.randomBytes(Math.ceil(length/2))
	 .toString('hex')    /** convert to hexadecimal format */
         .slice(0, length);  /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */

var sha512 = function(password, salt){
  var hash = crypto.createHmac('sha512', salt);    /** Hashing algorithm sha512 */
  hash.update(password);
  var value = hash.digest('hex');
  return{
    salt:salt,
    passwordHash:value
  };
};

function saltHashPassword(userpassword){
	var salt = genRandomString(16);
	var passwordData = sha512(userpassword, salt);
	console.log('User Password = ' + userpassword);
	console.log('PasswordHash = '+ passwordData.passwordHash);
	console.log('\nsalt = ' + passwordData.salt);
	return passwordData;
}

module.exports = router;
