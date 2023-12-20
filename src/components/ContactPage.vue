<template>
    <body>
        <header class="header">
            <div class="container">
                <router-link to="/">
                    <img src="../assets/image/StoryStreak_Logo.png" id="logo" alt="Logo">
                </router-link>
                <h1>StoryStreak</h1>
                <nav class="nav">
                    <ul>
                        <li><router-link to="/">Home</router-link></li>
                        <li><router-link to="/AboutPage">About Us</router-link></li>
                        <li><router-link to="/ContactPage">Contact</router-link></li>
                        <li><router-link to="/MyAccount">My Account</router-link></li>
                        <li><a href="#" @click="logout">Logout</a></li>
                    </ul>
                </nav>
                <img src="../assets/image/profile_icon.png" id="profileIcon" alt="Icon of profile">
            </div>
            <div class="search-box">
                <input type="text" class="input-search" placeholder="Search for someone">
                <button class="SearchButton" @click="getInputtedUser()">Search</button>
            </div>
        </header>
        <h1>Having trouble?</h1>
        <h2>Contact the StoryStreak team!</h2>
        <img id="imgSSTeam" src="../assets/image/TheStoryStreakTeam.png" alt="The StoryStreak Team">
        <div class="contact_text">
            <h3>Beautiful picture of our 3 founders</h3>
        </div>
        <div class="right_side_info">
            <h3>
                Lars Nolf
                <br>
                r0889284@outlook.com
            </h3>
            <br>
            <h3>
                Matijs Eraly
                <br>
                r0710990@outlook.com
            </h3>
            <br>
            <h3>
                Hadi Toamah
                <br>
                r0893498@outlook.com
            </h3>
            <br>
        </div>
    </body>
    <footer class="footer">
        <div class="copyright">
            &copy; by StoryStreak
        </div>
    </footer>
</template>

<script>
import "../assets/css/front.css"
import axios from 'axios';

export default {
    
    name: 'ContactPage',
    data() {
        return {
            stories: [],
            showStories: false,
            followedUsers: [],
            showFollowedUsers: false,
            userID: localStorage.getItem('userId')
        };
    },
    created() { // Get username
        // Access the username from the query parameter
        this.localUsername = localStorage.getItem('username');
        console.log('Username is:', this.localUsername);
        this.getUserIdByUsername();

        // Call the checkAuthentication function when the component is created
        this.checkAuthentication();

    },
    methods: { // Get user id
        async getUserIdByUsername() {
          try {
            const response = await axios.get(`https://matijseraly.be/api/user/username?username=${this.localUsername}`);
            if (response.status === 200) {
            // Access the 'id' property from the response data
            const data = response.data;
            const key = Object.keys(data)[0];
            const test = data[key];
            // Now you have the userId, you can use it as needed
            console.log('User ID:', test.id);
            localStorage.setItem('userId', test.id);
            return test.id
            } else {
            console.error('Error getting userId. Status:', response.status);
            }
        } catch (error) {
            console.error('Error getting userId:', error);
        }
        },
        getInputtedUser() {
            this.inputUser = document.querySelector('.input-search').value;
            if (this.inputUser !== "") {
                localStorage.setItem('searchedUser', this.inputUser);
                this.$router.push('/ListOfUsers');
            } else {
                alert("Please enter a valid user");
            }
        },
        checkAuthentication() {
            // Check if the username is undefined in local storage
            const username = localStorage.getItem('username');

            if (username === undefined || username === null) {
            // If username is undefined, navigate to the login page
            this.$router.push('/Login');
            }
        },
        logout() {
            // Clear user information from local storage
            localStorage.removeItem('username');
            localStorage.removeItem('userId');

            // Navigate to the login page
            this.$router.push('/Login');
        },
    },
}
</script>