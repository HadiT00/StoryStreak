<template>
<body>
    <header class="header">
        <div class="container">
            
        <img src="../assets/image/StoryStreak_Logo.png" id="logo" alt="Logo">
            
            <h1>StoryStreak</h1>
            <nav class="nav">
                <ul>
                    <li><router-link to="/Login">Already got an account? -> Login</router-link></li>
                </ul>
            </nav>
        </div>
    </header>        
    
    <div class="box">
        <h1 id="title">
            Register
        </h1>

        <form action="php" method="post">
            <label for="Email" id="mail">
            E-mail
            </label>
            <br>
            <br>
            <input type="email" required id="Email" name="Email" placeholder="E-mail">
            <br>
            <br>
            <label for="username" id="user" required>
                Username
            </label>
            <br>
            <br>
            <input type="text" id="username" name="username" placeholder="Your username" required>
            <br>
            <br>
            <label for="Password" id="pass">
                Password
            </label>
            <br>
            <br>
            <input type="password" id="Password" name="Password" placeholder="Password" required>
            <br>
            <br>
            <router-link to="./loginPage.html">
                <input id="registerButton" type="submit" value="Register">
            </router-link>
        </form>
        <br>
    </div>
    <br>
    <br>
    <br>
    <footer class="footer">
        <div class="copyright">
            &copy; by StoryStreak
        </div>
    </footer>

</body>

</template>
  
  <script>
  import "../assets/css/front.css"
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