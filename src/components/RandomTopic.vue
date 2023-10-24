<template>
    <div>
      <h3>Today's topic:</h3>
      <h2>{{ this.randomTopic }}</h2>
    </div>
  </template>

<script>
export default {
  data() {
    return {
      randomTopic: null,
      topicID: this.RandomNumberGenerator(),
    };
  },
  mounted() {
    this.getDataByID(this.topicID)
    this.PostNewCurrentTopic(this.topicID)
    console.log(this.RandomNumberGenerator())
  },
  methods: {
    getDataByID(topicID) {
      fetch('https://matijseraly.be/api/topics/id?topicId=' + topicID)
        .then(response => {
          if (!response.ok) {
            throw new Error("HTTP error! Status: ${response.status}");
          }
          return response.json();
        })
        .then((data) => {
          // Handle the response data here
          console.log(data[this.topicID - 1].topic);
          this.randomTopic = data[this.topicID - 1].topic;
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
    }
  },
};
</script>