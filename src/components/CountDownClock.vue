<template>
    <div>
      <div class="clock">{{ timeRemaining }}</div>
    </div>
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
    updateClock() {
        const now = new Date();
        const belgiumTimezoneOffset = 0; // Belgium is UTC+2
        now.setHours(now.getHours() + belgiumTimezoneOffset);
        const hours = 23 - now.getHours();
        const minutes = 59 - now.getMinutes();
        const seconds = 59 - now.getSeconds();
        this.timeRemaining = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    },
}
};
</script>

<style scoped>
.clock {
font-size: 24px;
}
</style>
  