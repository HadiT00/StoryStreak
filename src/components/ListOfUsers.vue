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
                        <li><router-link to="/About">About us</router-link></li>
                        <li><router-link to="/ContactPage">Contact</router-link></li>
                        <li><a href="/MyAccount">My Account</a></li>
                        <li><a href="#" @click="logout">Logout</a></li>
                    </ul>
                </nav>
                <img src="../assets/image/profile_icon.png" id="profileIcon" alt="Icon of profile">
            </div>
            <div class="search-box">
                <input type="text" class="input-search" placeholder="Search for someone">
                <a class="SearchButton" @click="getInputtedUser()">Search</a>
            </div>
        </header>
        <h1>List of users matching: {{ inputtedUserStorage }}</h1>
        <div v-for="username in users" :key="username" id="listofusers">
            <div class="user-item">
                <ul>
                    <li>
                        {{ username }}
                        <button @click="addUser(username)" v-if="!friendsList.includes(username)">Add user</button>
                        <span v-else>Already friends</span>
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
            users: [],
            inputUser: "",
            inputtedUserStorage: "",
            userID: localStorage.getItem('userId'),
            id_of_inputted_user: "",
            friendsList: [],
            friendsListTrueFalse: []
        };
    },
    mounted() {
        this.PlaceUsersInList()
        this.PlaceFriendsInList()
        this.inputtedUserStorage = localStorage.getItem('searchedUser');
    },
    created() {
        this.localUsername = localStorage.getItem('username');
        console.log('Logged in as:', this.localUsername);
        this.checkAuthentication();
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
                    if(username !== null && username.toLowerCase().includes(this.inputtedUserStorage.toLowerCase())) {
                        this.users.push(username);
                    }
                }  
                console.log("Displayed users:" + this.users);
            })
            .catch(error => {
                // Handle any errors here
                console.error('Error:', error);
            });
        },
        PlaceFriendsInList() {
        const url = `https://matijseraly.be/api/followernames?userId=${this.userID}`;
        fetch(url)
            .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
            })
            .then(data => {
                for (let i = 0; i < data.length; i++)
                {
                    if  (data[i].username !== null)
                    {
                        this.friendsList.push(data[i].username)
                    }
                }
                console.log("Current friends of user:" + this.friendsList)
            })
            .catch(error => {
            // Handle any errors here
            console.error('Error:', error);
            });
        },
        addUser(name) {  
            const url = `https://matijseraly.be/api/user/username?username=${name}`;

            fetch(url)
                .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
                })
                .then(data => {
                    this.id_of_inputted_user = data[Object.keys(data)[0]].id;
                    fetch(`https://matijseraly.be/api/follows?followingUserId=${this.userID}&followedUserId=${this.id_of_inputted_user}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    }).then(response => {
                        location.reload();
                        return response.json();
                    });
                })
                .catch(error => {
                // Handle any errors here
                console.error('Error:', error);
            });
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
        getInputtedUser() {
            this.inputUser = document.querySelector('.input-search').value;
            if (this.inputUser !== "") {
                localStorage.setItem('searchedUser', this.inputUser);
                location.reload()
            } else {
                alert("Please enter a valid user");
            }
        },
    },
}
</script>