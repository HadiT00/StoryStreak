<template>
    <div>
      <header class="header">
        <div class="container">
          
        <img src="../assets/image/StoryStreak_Logo.png" id="logo" alt="Logo" />
          
          <h1>StoryStreak</h1>
          <nav class="nav">
            <ul>
              <li><router-link to="/Register">No account? -> Register</router-link></li>
            </ul>
          </nav>
        </div>
      </header>
  
      <div class="box">
        <h1 id="title">Log in</h1>
  
        <br />
        <label for="Username" id="user">Username</label>
        <br />
        <br />
        <input
          v-model="username"
          type="username"
          required
          id="Username"
          name="Username"
          placeholder="Username"
        />
        <br />
        <br />
        <label for="Password" id="pass">Password</label>
        <br />
        <br />
        <input
          v-model="password"
          type="password"
          required
          id="Password"
          name="Password"
          placeholder="Password"
        />
        <br />
        <br />
        <br />
        <button @click="login" id="Log-in_button">Log In</button>
        <br />
        <br />
        <br />
      </div>
      <br />
      <br />
      <br />
      <footer class="footer">
        <div class="copyright">&copy; by StoryStreak</div>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoginPage',
    data() {
      return {
        username: "",
        password: "",
      };
    },
    methods: {
      login() {
        // Add your login logic here
        // Access username and password using this.username and this.password
      },
    },
  };
  </script>