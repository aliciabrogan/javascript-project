//elements selected from html file
let loginForm = document.getElementById("form-input")
let loader = document.getElementById("loader")
let toggle = document.getElementById("darkModeToggle")
let welcomeMessage = document.getElementById("welcome-message")

if (document.body.classList.contains("light-mode")){
	localStorage.setItem("theme", "light")
}else{
	localStorage.setItem("theme","dark-mode")
}
//event listeners
loginForm.addEventListener("submit",validateForm)

toggle.addEventListener("click", function(){
	document.body.classList.toggle("dark-mode")
	if(document.body.classList.contains("dark-mode")){
		toggle.textContent = "Light Mode"
		localStorage.setItem("theme", "dark")
	}else{
		toggle.textContent ="Dark mode"
		localStorage.setItem("theme", "light")
	}
})

//form validation
function validateForm(event){
	event.preventDefault()
	let email = document.getElementById("email2")
	let emailError = document.getElementById("email-error")
	let password = document.getElementById("password2")
	let passwordError = document.getElementById("password-error")
	let isValid = true

    //email validation
	if (!email.checkValidity()){
		event.preventDefault()
		emailError.textContent = email.validationMessage
		isValid = false
		makeInvalid(email)
	} else{
		makeValid(email)
	}

    //password validation
	if (!password.checkValidity()){
		event.preventDefault()
		passwordError.textContent = password.validationMessage
		isValid = false
		makeInvalid(password)
	} else{
		makeValid(password)

	}
	if (password.value.length < 3){
		event.preventDefault()
		passwordError.textContent = "Please lengthen password to more than 3 characters"
		isValid = false
		makeInvalid(password)
	} else{
		passwordError.textContent = ""
		makeValid(password)
	}

    //loader and redirect when form input is valid
	if (isValid == true){
		loginForm.style.display = "none"
		loader.style.display = "block"
		setTimeout(function(){
			loader.style.display = "none"
            welcomeMessage.textContent = "Welcome, "+email.value
            welcomeMessage.style.display = "block"
            setTimeout(function(){
                window.location.href = "blog.html"
            },1000)
			
		}, 1000)
	}
}
//helper functions
function makeValid(element){
	element.classList.remove("is-invalid")
	element.classList.add("is-valid")
}
function makeInvalid(element){
	element.classList.remove("is-valid")
	element.classList.add("is-invalid")
}
