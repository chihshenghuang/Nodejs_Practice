function checkCookie(isLoginError){
	var user = document.cookie;
	var isLoginError = isLoginError;
	
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
