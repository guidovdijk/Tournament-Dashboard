<template>
  <div class="countdown">
    <div class="block">
      <p class="digit">{{ days | two_digits }}</p>
      <p class="text">Days</p>
    </div>
    <div class="block">
      <p class="digit">{{ hours | two_digits }}</p>
      <p class="text">Hours</p>
    </div>
    <div class="block">
      <p class="digit">{{ minutes | two_digits }}</p>
      <p class="text">Minutes</p>
    </div>
    <div class="block">
      <p class="digit">{{ seconds | two_digits }}</p>
      <p class="text">Seconds</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Countdown",

  mounted() {
    window.setInterval(() => {
        this.now = Math.trunc((new Date()).getTime() / 1000);
    },1000);
  },
  props: {
    date: {
      type: Date
    }
  },
  data() {
    return {
      now: Math.trunc((new Date()).getTime() / 1000)
    }
  },
  computed: {
    dateInMilliseconds() {
      return Math.trunc(Date.parse(this.date) / 1000)
    },
    seconds() {
      return (this.dateInMilliseconds - this.now) % 60;
    },
    minutes() {
      return Math.trunc((this.dateInMilliseconds - this.now) / 60) % 60;
    },
    hours() {
      return Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60) % 24;
    },
    days() {
      return Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60 / 24);
    }
  },
  filters: {
    two_digits: function(value){
      if (value < 0) {
        return '00';
      }
      if (value.toString().length <= 1) {
        return `0${value}`;
      }
      return value;
    }
  }
}
</script>