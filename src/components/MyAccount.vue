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
                        <li><a href="#">About</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">My Account</a></li>
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
</script>
