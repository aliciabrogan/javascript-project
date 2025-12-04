let toggle = document.getElementById("darkModeToggle")
if (localStorage.getItem("theme")==="dark"){
	document.body.classList.add("dark-mode")
	toggle.textContent = "Light Mode"
} else{
	document.body.classList.remove("dark-mode")
	toggle.textContent = "Dark Mode"
}


toggle.addEventListener("click", function(){
	document.body.classList.toggle("dark-mode")
	if (document.body.classList.contains("dark-mode")){
		toggle.textContent = "Light Mode"
	}else{
		toggle.textContent ="Dark mode"
	}
})

let submit = document.getElementById("post")



let name1 = document.getElementById("name")
let subject = document.getElementById("subject")
let postContent = document.getElementById("blog-post")
let nameError = document.getElementById("name-error")
let subjectError = document.getElementById("subject-error")

let postsContainer = document.getElementById("user-posts")
let box = document.getElementById("user-box")

postsContainer.innerHTML = ""

submit.addEventListener("click", function(){
	event.preventDefault()
	let shouldValidate = true
	if (name1.value == "" || subject.value == ""){
		event.preventDefault()
		shouldValidate = false
		alert("Name and/or subject field(s) cannot be blank")
	}
	if (name1.value !== "" && subject.value !== ""){
		if (!postContent.checkValidity()){
			event.preventDefault()
			shouldValidate = false
			alert("Invalid post content: Post must be between 20 and 150 characters")
		}
	}
	if (name1.value.length <4){
		nameError.textContent = "Name length must be 4 or more characters"
		shouldValidate = false
	}
	if (subject.value.length <8){
		subjectError.textContent = "Subject length must be 8 or more character"
		shouldValidate = false
	}

	
	if (shouldValidate == true){
		let listItem = document.createElement("li")
    	let spanName =document.createElement("span")
    	let spanSubject =document.createElement("span")
		let spanUserPost =document.createElement("p")
		let dateOfPost = document.createElement("p")
    	date = new Date()
    	date = new Date()
		options={
			year: "numeric",
			month: "long",
			day: "numeric",
		}
		dateOfPost.textContent = ("Posted " + date.toLocaleDateString("en-GB", options))
		spanName.textContent = name1.value
		spanSubject.textContent = subject.value
		spanUserPost.textContent = postContent.value

		listItem.classList.add("user-post")
		spanName.classList.add("user-name")
		spanSubject.classList.add("user-subject")
		spanUserPost.classList.add("user-message")
		dateOfPost.classList.add("date")

		listItem.appendChild(spanName)
		listItem.appendChild(dateOfPost)
		listItem.appendChild(spanSubject)
		listItem.appendChild(spanUserPost)
		postsContainer.insertBefore(listItem, postsContainer.firstChild)
		listItem.addEventListener('click', handlePostClick)

		box.style.display="block"


		name1.value = ''
		subject.value=''
		postContent.value=''
	}
})

//print function for blog posts
function handlePostClick(event) {
	const individualPost = event.currentTarget;
	const postContent = individualPost.cloneNode(true);

	const printWindow = window.open('', '_blank');
	printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Print Blog Post</title>
        <style>
        body {
            font-family: Arial, sans-serif;
            background: #fdf0f8;
            color: #333;
            margin: 30px;
        }
        .user-post {
			list-style-type: none;
            border: 2px solid pink;
            padding: 15px;
            border-radius: 10px;
            background-color: white;
            max-width: 600px;
            margin: 0 auto;
			word-wrap: break-word;
			overflow-wrap: break word;
			white-space: pre-wrap;
        }
        @media print {
            button { display: none; }
        }
        </style>
    </head>
    <body>
        ${postContent.outerHTML}
    </body>
    </html>
	`);

	printWindow.document.close();

	printWindow.onload = function () {
    printWindow.focus();
    printWindow.print();
	};
}

// const posts = document.querySelectorAll('.user-post');
// posts.forEach(post => {
// 	post.addEventListener('click', handlePostClick);
// });
