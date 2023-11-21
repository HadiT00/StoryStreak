<template>
    <div>
      <div class="clock">{{ timeRemaining }}</div>
    </div>
    <!-- TESTING -->
</template>

<script>
export default {
data() {
    return {
    timeRemaining: "00:00:00",
    };
},
mounted() {
    this.updateClock();
    setInterval(this.updateClock, 1000);
},
methods: {
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
    updateClock() {
        const now = new Date();
        const belgiumTimezoneOffset = 0; // Belgium is UTC+2
        now.setHours(now.getHours() + belgiumTimezoneOffset);
        const hours = 23 - now.getHours();
        const minutes = 59 - now.getMinutes();
        const seconds = 59 - now.getSeconds();
        this.timeRemaining = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        if(hours === 0 && minutes === 0 && seconds === 0)
        {
            console.log("Emitting timerExpired event");
            this.$emit("timerExpired");
            this.PostNewCurrentTopic(this.RandomNumberGenerator());
            setTimeout(() => {
                window.location.reload();
            }, 5);
        }
    },
}
};
</script>

<style scoped>
.clock {
font-size: 24px;
}
</style>
  