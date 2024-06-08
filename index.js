const registrationForm = document.getElementById("registration");
const loginForm = document.getElementById("login");
const username = registrationForm.elements["username"];
const email = registrationForm.elements["email"];
const password = registrationForm.elements["password"];
const passwordCheck = registrationForm.elements["passwordCheck"];
const terms = registrationForm.elements["terms"];
const loginUsername = loginForm.elements["username"];
const loginPassword = loginForm.elements["password"];
const errorDisplay = document.getElementById("errorDisplay");

function displayError(message, element) {
	errorDisplay.innerText = message;
	element.focus();
}

function validUsername(usernameVal) {
	const uniqueChar = new Set(usernameVal);
	const isValidLength = usernameVal.length >= 4;
	const hasUniqueChar = uniqueChar.size > 1;
	const isValidPattern = /^[A-Za-z0-9]+$/.test(usernameVal);

	if (!isValidLength) {
		return "Username must be at least 4 characters long";
	} else if (!hasUniqueChar) {
		return "Username must contain at least two unique characters.";
	} else if (!isValidPattern) {
		return "Username cannot contain any special characters or whitespace.";
	}
	return "";
}

function validateEmail(evt) {
	let emailVal = email.value;
	const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
	if (!isValidEmail) {
		return "not valid email address";
	} else if (emailVal.endsWith("example.com")) {
		return "no 'example.com'";
	}
	return "";
}

function validatePassword(passwordVal, usernameVal) {
	const hasMinLength = passwordVal.length >= 12;
	const hasUpperCase = /[A-Z]/.test(passwordVal);
	const hasLowerCase = /[a-z]/.test(passwordVal);
	const hasNumber = /\d/.test(passwordVal);
	const hasSpecialChar = /[!@#$%^&*()]/.test(passwordVal);
	const notHavePassword = !passwordVal.toLowerCase().includes("password");
	const notHaveUsername = !passwordVal.includes(usernameVal);

	if (!hasMinLength) {
		return "should be longer than 12 characters";
	} else if (!hasUpperCase) {
		return "Include upperCase letters";
	} else if (!hasLowerCase) {
		return "Include lowerCase letters";
	} else if (!hasNumber) {
		return "Include numbers";
	} else if (!hasSpecialChar) {
		return "Include special characters";
	} else if (!notHavePassword) {
		return "no word 'password' in it";
	} else if (!notHaveUsername) {
		return "no 'username' in it";
	}
	return "";
}

function validatePasswordCheck(password1, password2) {
	if (password1 !== password2) {
		return "should match";
	}
	return "";
}

//event listener
registrationForm.addEventListener("submit", function (evt) {
	evt.preventDefault();
	let usernameVal = username.value;
	let usernameError = validUsername(usernameVal);
	let emailVal = email.value;
	let emailError = validateEmail(emailVal);
	let passwordVal = password.value;
	let passwordError = validatePassword(passwordVal);
	let passwordTwo = passwordCheck.value;
	let passwordCheckError = validatePasswordCheck(passwordVal, passwordTwo);
	if (usernameError) {
		displayError(usernameError, username);
		return false;
	}
	if (emailError) {
		displayError(emailError, email);
		evt.preventDefault();
		return false;
	}
	if (passwordError) {
		displayError(passwordError, password);
		evt.preventDefault();
		return false;
	}
	if (passwordCheckError) {
		displayError(passwordCheckError, passwordCheck);
		evt.preventDefault();
		return false;
	}

	errorDisplay.innerText = "Resigistation successful!";
	registrationForm.reset();
	return true;
});
