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
                    <li><router-link to="/Login">Logout</router-link></li>
                </ul>
            </nav>
            <img src="../assets/image/profile_icon.png" id="profileIcon" alt="Icon of profile">
        </div>
        <div class="search-box">
            <input type="text" class="input-search" placeholder="Search for someone">
        </div>
    </header>

    <main class="container">

        <h1>
            <CountDownClock></CountDownClock>
        </h1>

        <h2>
            <RandomTopic @timerExpired="this.PostNewCurrentTopic(this.RandomNumberGenerator())"></RandomTopic>
        </h2>
        
        <br>
        <br>
        <section class="post">
            <!-- Story Submission Form -->
            <form @submit.prevent="sumbitStory">
                <label for="title">Story Title:</label>
                <input v-model="title" type="text" id="title" required>
                <br>
                <br>
                <label for="content">Your Story:</label>
                <textarea v-model="content" id="content" required></textarea>
                <br>
                <br>
                <button type="submit" class="submitStoryButton">Submit</button>
            </form>
        </section>
        
    </main>
   
    <footer class="footer">
        <div class="copyright">
            &copy; by StoryStreak
        </div>
    </footer>
</body>
</template>

<script>
import "../assets/css/front.css"
import CountDownClock from "./CountDownClock.vue";
import RandomTopic from "./RandomTopic.vue";
import axios from 'axios';

export default {
    name: 'HomePage',
    data() {
        return {
            title: '',
            content: '',
            datum: new Date().toLocaleDateString('en-GB'),
            localUsername: '',
            id: null,
            
            randomTopic: '',
            topicID: this.RandomNumberGenerator(),
            currentTopic: null,
        };
    },
    created() { // Get username
    // Access the username from the query parameter
        this.localUsername = this.$route.query.username;
        console.log('Username is:', this.localUsername);
        this.getUserIdByUsername();

    },
    async mounted() {
        try {
        this.currentTopic = await this.GetCurrentTopic();
        this.getDataByID(this.currentTopic);
        // this.$on("timerExpired", () => {
        // console.log("timerExpired event received");
        // this.PostNewCurrentTopic(CurrentTopic(this.RandomNumberGenerator()));
        // });
        } catch (error) {
        console.error('Error in mounted:', error);
        }
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
            return test.id
            } else {
            console.error('Error getting userId. Status:', response.status);
            }
        } catch (error) {
            console.error('Error getting userId:', error);
        }
        },
        //Get Topic id 
        getDataByID(currentTopic) {
        // Use the topicID to construct the URL
        const url = `https://matijseraly.be/api/topics/id?topicId=${currentTopic}`;

        fetch(url)
            .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
            })
            .then(data => {
            // Access the topic with the given ID (e.g., topic ID 25)
            const topic = data[currentTopic - 1];
            if (topic) {
                this.randomTopic = topic.topic;
            } else {
                console.error(`Topic with ID ${currentTopic} not found in the API response.`);
            }
            })
            .catch(error => {
            // Handle any errors here
            console.error('Error:', error);
            });
        },
        RandomNumberGenerator() {
        return Math.floor(Math.random() * (101 - 2)) + 2;
        },
        PostNewCurrentTopic(topicID)
        {
        fetch("https://matijseraly.be/api/topics/current?topicId=" + topicID, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(response => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            
        });
        },
        async GetCurrentTopic() {
        try {
            const response = await fetch('https://matijseraly.be/api/topics/current');
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            const currentTopic = data.topicId;
            console.log("TopicID: ",currentTopic);
            return currentTopic;
            
        } catch (error) {
            console.error('Error fetching current topic:', error);
            throw error; // Rethrow the error to be caught in the mounted method
        }
        }, 
         // Subbmit story
        async sumbitStory() {
            
                // Get the userId using the method you defined
                const userId = await this.getUserIdByUsername();
                console.log("1: ", userId)
                // Get the current topicId using the method you defined
                const topicId = await this.GetCurrentTopic();
                console.log("2: ", topicId)
                const storyData = {
                    title: this.title,
                    content: this.content,
                    datum: this.datum,
                    idtest: userId.toString(),
                    topictest: topicId.toString(),
                };

                console.log(storyData);
                fetch(`https://matijseraly.be/api/stories?title=${this.title}&content=${this.content}&datum=${this.datum}&userId=${storyData.idtest}&topicId=${storyData.topictest}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                }).then(response => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    
                });

            // Reset the form fields
            this.title = '';
            this.content = '';
            this.datum = new Date().toLocaleDateString('en-GB');
        }
    },
    components: { CountDownClock, RandomTopic },
}
</script>