function checkCookie(isLoginError){
	var user = document.cookie;
	var isLoginError = isLoginError;
	console.log("status:" + isLoginError);
	if(!isLoginError){
		if(user != ""){
			alert("Welcome again " + user);
		}else{
			alert("Welcome");
		}
	}else{
		alert("Wrong username or password");
	}
}
