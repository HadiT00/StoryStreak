<template>
    <div>
        <div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<div class="login100-pic js-tilt" data-tilt>
					<img src="../assets/image/StoryStreak_Logo_Trans.png" alt="IMG">
				</div>

				<form class="login100-form validate-form">
					<span class="login100-form-title">
						Member Register
					</span>

					<div class="wrap-input100 validate-input" data-validate = "Valid Username is required">
						<input class="input100" type="text" name="email" placeholder="Username">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>

                    <div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input class="input100" type="text" name="email" placeholder="Email">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>

					<div class="wrap-input100 validate-input" data-validate = "Password is required">
						<input class="input100" type="password" name="pass" placeholder="Password">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					
					<div class="container-login100-form-btn">
						<button class="login100-form-btn">
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
	</div>
    </div>
</template>
  
<script>
import "../assets/css/front.css"
import "../assets/css/login.css"
import "../assets/css/util.css"
export default {
name: 'RegisterPage',
data() {
    return {
        comments: [],
        newcomments: ""
    };
},

methods: {
    addComment() {
        if (this.newComment.trim() !== '') {
            this.comments.push(this.newComment);
            this.newComment = '';
        }
    }
}
}
</script>