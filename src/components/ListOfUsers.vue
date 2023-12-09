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
                <a class="SearchButton"><router-link to="/ListOfUsers">Search</router-link></a>
            </div>
        </header>
        <h1>List of users matching: TESTING</h1>
        <!-- <ul v-for="username in users" :key="username" id="listofusers">
            <li>{{ username }}</li>             
            <button>ADD USER</button>
        </ul> -->
        <div v-for="username in users" :key="username" id="listofusers">
            <div class="user-item">
                <ul>
                    <li>
                        {{ username }}
                        <button @click="addUser(username)">Add user</button>
                    </li>
                </ul>
            </div>
        </div>
    </body>
</template>

<script>
export default {
    name: 'ListOfUsers',
    data() {
        return {
            users: []
        };
    },
    mounted() {
        this.PlaceUsersInList()
    },
    created() {
        this.localUsername = this.$route.query.username;
        console.log('Logged in as:', this.localUsername);
    },
    methods: {
        PlaceUsersInList() {
            // Use the topicID to construct the URL
            const url = `https://matijseraly.be/api/user/all`;

            fetch(url)
            .then(response => {
                if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    const username = data[i].username;
                    if(username !== null) {
                        this.users.push(username);
                    }
                }  
                console.log(this.users)
            })
            .catch(error => {
                // Handle any errors here
                console.error('Error:', error);
            });
        },
        addUser(name) {        
            console.log(name);
        },
    },
}
</script>