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
                    <li><input id="search" type="search" placeholder="Search for someone" aria-label="Look up a user"><button>Search</button></li>
                    <li><router-link to="/Login">Login</router-link></li>
                </ul>
            </nav>
            <img src="../assets/image/profile_icon.png" id="profileIcon" alt="Icon of profile">
        </div>
    </header>

    <main class="container">

        <h1>
            <CountDownClock></CountDownClock>
        </h1>

        <h2>
            <RandomTopic></RandomTopic>
        </h2>

        <section class="post">
            <textarea name="welcomeMessage" rows="20" cols="155">
            </textarea>
        </section>

        <button>
            Submit Story
        </button>

        <br>
        <br>

        <section class="post">
            <h2 class="verhaalTitel">SpongeBob</h2>
            <p class="verhaal">
                Are you ready, kids? Aye, aye, captain! I can't hear you! Aye, aye, captain! Oooooooooohhhh... Who lives in a pineapple under the sea? SpongeBob SquarePants! Absorbent and yellow and porous is he. SpongeBob SquarePants! If nautical nonsense, be something you wish.
                SpongeBob SquarePants! Then drop on the deck and flop like a fish!
                SpongeBob SquarePants! Ready? SpongeBob SquarePants! SpongeBob SquarePants! SpongeBob SquarePants! SpongeBob SquarePaaaaaaants!
            </p>
            <div class="schrijverInfo">
                Posted by <span class="schrijver">Hadi</span> on <span class="datum">9 oktober 2023</span>
            </div>
            <div class="comments">
                <h3>Comments</h3>
                <div class="comment">
                    <span class="commenter">Wim:</span>
                    <p>SPONGEBOOOOB</p>
                </div>
                <button class="likeButton">Like</button>            
            </div>
        </section>

        <section class="post">
            <h2 class="verhaalTitel">Kont</h2>
            <p class="verhaal">
                Ik heb 1 2 3 4 5 6 7 8 9 10 Kontjes op een rij Kkkontjes maakt mij blij
            </p>
            <div class="schrijverInfo">
                Posted by <span class="schrijver">Lars</span> on <span class="datum">9 oktober 2023</span>
            </div>
        </section>

        <section class="post">
            <h2 class="verhaalTitel">Master</h2>
            <p class="verhaal">
                Smoke weed everyday 
            </p>
            <div class="schrijverInfo">
                Posted by <span class="schrijver">Matijs</span> on <span class="datum">9 oktober 2023</span>
            </div>

            <div id="app">
                <div v-for="(comment, index) in comments" :key="index" class="comment">
                    {{ comment }}
                </div>
                <input v-model="newComment" @keyup.enter="addComment" placeholder="Add a comment...">
                <button @click="addComment">Add Comment</button>
            </div>
            
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
export default {
    name: 'HomePage',
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
        },
    },
    components: { CountDownClock, RandomTopic }
}
</script>