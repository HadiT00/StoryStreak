<template>
  <div>
    <div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<div class="login100-pic js-tilt" data-tilt>
					<img src="../assets/image/StoryStreak_Logo_Trans.png" alt="IMG">
				</div>

				<form class="login100-form validate-form" @submit.prevent="login">
					<span class="login100-form-title">
						Member Login
					</span>

					<div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input class="input100" type="text" name="username" v-model="username" placeholder="Username">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>

					<div class="wrap-input100 validate-input" data-validate = "Password is required">
						<input class="input100" type="password" name="password" v-model="password" placeholder="Password">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					
					<div class="container-login100-form-btn">
						<button class="login100-form-btn" type="submit">
							Login
						</button>
					</div>

					<div class="text-center p-t-136">
						<a class="txt2" href="###">
							<router-link to="/Register">Create your Account</router-link>
							<i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
						</a>
					</div>
				</form>
			</div>
		</div>
	</div>
  </div>
</template>

<script>
import "../assets/css/login.css"
import "../assets/css/util.css"
import axios from 'axios';

export default {
  name: 'LoginPage',
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
		const registeraccount = {
			username: this.username,
			password: this.password,
	};
	console.log(registeraccount);

	try {
		const existingUserResponse = await axios.get(`https://matijseraly.be/api/user?username=${this.username}&password=${this.password}`);
		const correctUser = existingUserResponse.data;

		if (correctUser === "user not found") {
			// User doesn't exist, proceed with registration
			console.log("Username not found")
			alert("Username or Password are incorrect")
		} else {
			console.log("welkom")
			this.$router.push('/');
		}
	} catch (error) {
		console.error('Error:', error);
	}
	},
		
  },
};
</script>