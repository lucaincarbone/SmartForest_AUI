<script>
import Forest from "./components/Forest.vue";
import WeatherWidget from "./components/WeatherWidget.vue";
import VoiceDetectionWidget from "./components/VoiceDetectionWidget.vue";
import Trees from "./components/Trees.vue";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  methods: {
    mirrorOn() {
      document.getElementById("mirror-off").style.visibility = "hidden"
      document.getElementById("mirror-off").style.pointerEvents = "none";
    }
  }
}
</script>

<template>  
    <div class="bg">
      <!-- <img class="bgimg" src="./assets/dynamics/other/background-display.jpg" alt=""> -->
      <div id="mirror-off" class="mirror-off" @click="mirrorOn()">
        <!-- <img class="bgimg" src="./assets/dynamics/other/background-display.jpg" alt=""> -->
      </div>
      <Controls/>
      <AnswerBox/>
      <PowerStatusWidget/>
      <Trees/>
      <!-- <WeatherWidget/> -->
      <Forest />
      <div id="notification-box" class="notification-box">
        <Notification id="notification-1" idcont="cont-1" idtime="time-1"/>
        <Notification id="notification-2" idcont="cont-2" idtime="time-2"/>
        <Notification id="notification-3" idcont="cont-3" idtime="time-3"/>
        <Notification id="notification-4" idcont="cont-4" idtime="time-4"/>
        <Notification id="notification-5" idcont="cont-5" idtime="time-5"/>
      </div>
  </div>
</template>

<style scoped>
.notification-box {
  position: absolute;
  /* background-color: red; */
  width: 1080px;
  /* height: 100px; */
  /* margin: auto; */
  top: 1058px;
  z-index: 1000;
}
.mirror-off{
  visibility: hidden;
  /* visibility: visible; */
  z-index: 10000;
  background-color: black;
  top: 0;
  position: absolute;
  width: 1080px;
  height: 1920px;
}

.bg {
  background-color: black;  
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  width: 1080px;
  height: 1920px;
}
iframe {
  position: absolute;
  top: 0;
}
.bgimg{
  opacity: 50%;
  position: absolute;
  z-index: 0;
  width: 1080px;
  height: 1920px;
}
</style>
