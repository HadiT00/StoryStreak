<template>
    <div>
        <div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<div class="login100-pic js-tilt" data-tilt>
					<img src="../assets/image/StoryStreak_Logo_Trans.png" alt="IMG">
				</div>

				<form class="login100-form validate-form" @submit.prevent="registerUser">
					<span class="login100-form-title">
						Member Register
					</span>

					<div class="wrap-input100 validate-input" data-validate = "Valid Username is required">
						<input class="input100" type="text" name="username" id="username" v-model="username"  placeholder="Username">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>

                    <div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input class="input100" type="text" name="mail" id="mail" v-model="mail" placeholder="Email">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>

					<div class="wrap-input100 validate-input" data-validate = "Password is required">
						<input class="input100" type="password" name="password" id="password" v-model="password" placeholder="Password">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					
					<div class="container-login100-form-btn">
						<button class="login100-form-btn" type="submit">
							Create Account
						</button>
					</div>

					<div class="text-center p-t-136">
						<a class="txt2">
                            Already have an account?
							<router-link to="/Login">Go to Login</router-link>
							<i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
						</a>
					</div>
				</form>
			</div>
		</div>
		<div class="popup" id="popup">
			<img src="../assets/image/404-tick.png" id="image_check_mark">
			<br>
			<br>
			<h2>Thank You!</h2>
			<br>
			<p>We have sent a verification to your mail!</p>
			<br>
			<input type="text" class="input-search_2" placeholder="Enter code here">
			<button type="button" id="button2fa" @click="checkCode()">Check code</button>
		</div>
	</div>
    </div>
</template>
  
<script>
import "../assets/css/front.css"
import "../assets/css/login.css"
import "../assets/css/util.css"
import axios from 'axios';

export default {
name: 'RegisterPage',
data() {
    return {
        comments: [],
        newcomments: "",
		codeInput: "",
		registeraccount: {
            username: "",
            password: "",
            mail: ""
        }
    };
},

methods: {
    addComment() {
        if (this.newComment.trim() !== '') {
            this.comments.push(this.newComment);
            this.newComment = '';
        }
    },
	openPopup() {
		let popup = document.getElementById('popup');

		popup.classList.add("open-popup");
	},
	closePopup() {
		let popup = document.getElementById('popup');
		popup.classList.remove("open-popup");
	},
	async registerUser() {
		
		this.registeraccount = {
			username: this.username,
			password: this.password,
			mail: this.mail
		};
	console.log(this.registeraccount);

	try {
		const existingUserResponse = await axios.get(`https://matijseraly.be/api/user/username?username=${this.username}`);
		const existingUser = existingUserResponse.data;

		if (existingUser === "user not found") {
			// User doesn't exist, proceed with registration
			// 2FA Validation
			if (this.username !== undefined && this.password !== undefined && this.mail !== undefined)
			{
				const url = `https://matijseraly.be/api/mail?mail=${this.mail}&name=${this.username}`;

				fetch(url)
					.then(response => {
					if (!response.ok) {
						throw new Error(`HTTP error! Status: ${response.status}`);
					}
					return response.json();
					})
					.then(data => {
						console.log(data);
					})
					.catch(error => {
					// Handle any errors here
					console.error('Error:', error);
					});

				let popup = document.getElementById('popup');
				popup.classList.add("open-popup");
			}
			else
			{
				alert("Please fill in all the register fields")
			}
		}
		else {
			console.log("User already exists");
			alert('User already exists')
		}
	} catch (error) {
		console.error('Error:', error);
	}
	},
	checkCode()
	{
		this.codeInput = document.querySelector('.input-search_2').value;
		if (this.codeInput !== "") {
			
			const url = `https://matijseraly.be/api/codecheck?code=${this.codeInput}`;

			fetch(url)
				.then(response => {
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.json();
				})
				.then(data => {
					if	(data.message == "Activation code is valid")
					{
						const response = axios.post('https://matijseraly.be/api/user', this.registeraccount);
						console.log('Response:', response.data);
						this.$router.push('/login');
					}
					else
					{
						alert("Code is invalid");
					}
				})
				.catch(error => {
				// Handle any errors here
				console.error('Error:', error);
				});
			console.log("good code")
		} else {
			alert("No code was given");
		}
	}
}
}
</script>