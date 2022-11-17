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
      time: "00:00",
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
  margin-bottom: 890px;
  /* bottom: 910px; */
}
.weather-box {
  background: white;
  border-top-right-radius: 3em;
  border-bottom-right-radius: 3em;
  width: 250px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.296);
}
.time-weather {
  color: black;
  font-weight: 500;
  font-size: 2.5em;
  grid-area: time;
  left: 0;
  right: 0;
  margin: 0 auto;
}
.date-weather {
  color: black;
  font-size: 1.5em;
  grid-area: date;

  left: 0;
  right: 0;
  margin: 0 auto;
}
.date-box {
  position: relative;
}
.sun {
  grid-area: sun;
  height: 80px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}

.grid-container {
  display: grid;
  grid-template-areas:
    "time sun"
    "date sun";
}
</style>
