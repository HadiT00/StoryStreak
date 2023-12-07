<template>
    <div>
      <h3>Today's topic:</h3>
      <h2>{{ randomTopic }}</h2>
    </div>
  </template>

<script>
export default {
  data() {
    return {
      randomTopic: '',
      topicID: this.RandomNumberGenerator(),
      currentTopic: null,
    };
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
  methods: {
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
        //console.log(currentTopic);
        return currentTopic;
        
      } catch (error) {
        console.error('Error fetching current topic:', error);
        throw error; // Rethrow the error to be caught in the mounted method
      }
    },
  },
};
</script>