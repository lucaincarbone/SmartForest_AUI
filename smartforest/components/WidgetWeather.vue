<template>
  <div class="weather-container">
    <div class="weather-box">
      <div class="date-box grid-container">
        <img class="sun" src="../assets/sun.png" alt="">
        <p class="time-weather">{{ time }}</p>
        <p class="date-weather">{{ date }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // TODO: How to live update?
      //time: new Date().toLocaleString("it", {hour: '2-digit', minute: '2-digit'}),
      time: "",
      date:
        new Date().getDate() +
        "/" +
        new Date().getMonth() +
        "/" +
        new Date().getFullYear(),
    };
  },
  methods: {
    updateTime: function () {
      this.time = new Date().toLocaleString("it", {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
  mounted() {
    setInterval(() => {
      this.updateTime();
    }, 1000);
  },
};
</script>

<style>
.weather-container {
  width: 1080px;
  position: absolute;
  z-index: 101;
  margin-bottom: 62em;
}
.weather-box {
  background: white;
  border-top-right-radius: 300px;
  border-bottom-right-radius: 300px;
  width: 300px;
  /* height: 100px; */
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.296);
  align-items: center;
}
.time-weather {
  color: black;
  font-weight: 600;
  font-size: 2.5em;
  grid-area: time;
}
.date-weather {
  color: black;
  font-size: 1.5em;
  grid-area: date;
}
.date-box {
  position: relative;
}
.sun {
  grid-area: sun;
  height: 80px;
  margin: auto;
}

p {
  padding: 0;
  margin: 0;
}

.grid-container {
  display: grid;
  grid-template-areas:
    "sun time"
    "sun date";
}
</style>
