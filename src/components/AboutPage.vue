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
    </body>
    <h1>Welcome to StoryStreak</h1>
    <h2>Your Daily Story Adventure Begins Here</h2>
    <section id="about">
        <br>
        <h2>About Us</h2>
        <p>
            At StoryStreak, we believe that every story is a journey waiting to be shared. Founded by three dedicated last-year students, our platform is driven by a passion for storytelling and a commitment to user security. We understand the importance of safeguarding your personal information, and we've built StoryStreak with your privacy in mind.
        </p>

        <p>
            Our founders are not just developers; they are storytellers, dreamers, and above all, motivated individuals with a vision to create a unique space for daily storytelling. As we embark on this journey together, we invite you to explore the world of StoryStreak and make every day a new chapter in your story.
        </p>
    </section>
    <br>
    <section id="functionality">
        <h2>Our Functionality</h2>
        <p>
            StoryStreak is not just a platform; it's a community of storytellers. Our core functionality revolves around the idea of sharing stories based on random topics selected by the site every 24 hours. This unique challenge ensures that each day brings a new perspective and a fresh narrative to your storytelling experience.
        </p>

        <p>
            Connect with friends, share your daily stories, and explore the diverse narratives of those around you. Our user-friendly interface makes it easy to add friends, view their stories, and engage in a vibrant storytelling community. Join us in making storytelling a daily ritual, and let every story contribute to the rich tapestry of StoryStreak.
        </p>
    </section>
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
    
    name: 'AboutPage',
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