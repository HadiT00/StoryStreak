<template>
    <body>
      <header class="header">
          <div class="container">
              <router-link to="/" >
                  <img src="../assets/image/StoryStreak_Logo.png" id="logo" alt="Logo">
              </router-link>
              <h1>StoryStreak</h1>
              <nav class="nav">
                  <ul>
                        <li><router-link to="/">Home</router-link></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><router-link to="/MyAccount">My Account</router-link></li>
                        <li><a @click="logout">Logout</a></li>
                  </ul>
              </nav>
              <img src="../assets/image/profile_icon.png" id="profileIcon" alt="Icon of profile">
          </div>
          <div class="search-box">
              <input type="text" class="input-search" placeholder="Search for someone">
              <a class="SearchButton" @click="getInputtedUser()">Search</a>
          </div>
      </header>

      <br><br>

      <!-- Buttons for navigating to the pages -->
        <div>
            <button class="navigation-button" @click="toggleShowStories">
            {{ showStories ? 'Hide' : 'Show' }} My Stories
            </button>

            <!-- Display stories only if showStories is true -->
        <div v-if="showStories">
            <div v-if="this.stories !== 'story not found'">
                <h2>Your Stories</h2>
                <ul>
                    <li v-for="story in stories" :key="story.id">
                    <h3>Title: {{ story.title }}</h3>
                    <p>Content: {{ story.content }}</p>
                    <br>
                    <p>----------------------------------------------------------</p>
                    </li>
                </ul>
            </div>
        </div>
            <!-- Button to get followed users -->
            <button class="navigation-button" @click="toggleFollowedUsers">
            {{ showFollowedUsers ? 'Hide' : 'Get' }} Followed Users
            </button>

            <!-- Display followed users -->
            <div v-if="showFollowedUsers && followedUsers.length > 0">
            <h2>People You Follow</h2>
            <ul class="list_of_followed">
                <li v-for="user in followedUsers" :key="user.id">
                    {{ user.username }}
                    <button @click="removeUser(user.username)">Remove user</button>
                    <br>
                    <br>
                </li>
            </ul>
            </div>
        </div>

      <br><br>

      <footer class="footer">
          <div class="copyright">
              &copy; by StoryStreak
          </div>
      </footer>
  </body>
</template>

<script>
import "../assets/css/front.css"
import axios from 'axios';

export default {
    
    name: 'MyAccount',
    data() {
        return {
            stories: [],
            showStories: false,
            followedUsers: [],
            showFollowedUsers: false,
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
        async showMyStories() {
        try {
            // Get the user ID from local storage
            const userId = localStorage.getItem('userId');

            // Make API request to get stories by user ID
            const response = await axios.get(`https://matijseraly.be/api/stories?userId=${userId}`);

            if (response.status === 200) {
            // Update the 'stories' data property with the fetched stories
            this.stories = response.data;

            // You can log or manipulate 'this.stories' as needed
            console.log('My Stories:', this.stories);
            } else {
            console.error('Error fetching stories. Status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching stories:', error);
        }
        },
        toggleShowStories() {
            this.showStories = !this.showStories;

            // Fetch stories if showStories is true and stories array is empty
            if (this.showStories && this.stories.length === 0) {
                this.showMyStories();
            }
        },
        async getFollowedUsers() {
        try {
            // Get the user ID from local storage
            const userId = localStorage.getItem('userId');

            // Make API request to get followed users by user ID
            const response = await axios.get(`https://matijseraly.be/api/followernames?userId=${userId}`);

            if (response.status === 200) {
            // Update the 'followedUsers' data property with the fetched users
            this.followedUsers = response.data;

            // You can log or manipulate 'this.followedUsers' as needed
            console.log('Followed Users:', this.followedUsers);
            } else {
            console.error('Error fetching followed users. Status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching followed users:', error);
        }
        },
        async toggleFollowedUsers() {
        this.showFollowedUsers = !this.showFollowedUsers;

        // Fetch followed users if showFollowedUsers is true and followedUsers array is empty
        if (this.showFollowedUsers && this.followedUsers.length === 0) {
            await this.getFollowedUsers();
        }
        },
        removeUser(userName)
        {
            console.log(userName)
        }
    },
}
</script>
