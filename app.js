
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , cookieParser = require('cookie-parser');
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 8080);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'hjs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

//User login

app.get('/index', function(req, res, next){
	if(req.cookies.user !== null){
		req.user = req.cookies.user;
	}
	console.log(req.user) ;
	res.render('login', req);
});

app.get('/login', function(req, res, next){
	res.render('login')
});

app.post('/login', function (req, res, next){
	var username = req.cookies.username;
	var pwd = req.cookies.pwd;
	var user = {username:'admin', pwd:123456};

	console.log(username + ',' + pwd);
	if(username == user.username && pwd == user.pwd){
		//Set cookie
		res.cookie("user", {username: username}, {maxAge:60000, httpOnly			:false});	
		res.redirect('index');
	}
	else{
		console.log("Error user");
		req.error = 'User name or password is wrong';
		res.render('index',req);	
	}
});


