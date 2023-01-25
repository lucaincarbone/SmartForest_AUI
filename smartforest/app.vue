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
      <img class="bgimg" src="./assets/dynamics/other/background-display.jpg" alt="">
      <div id="mirror-off" class="mirror-off" @click="mirrorOn()">
        <img class="bgimg" src="./assets/dynamics/other/background-display.jpg" alt="">
      </div>
      <Controls/>
      <AnswerBox/>
      <PowerStatusWidget/>
      <Trees/>
      <!-- <WeatherWidget/> -->
      <Forest />
  </div>
</template>

<style scoped>
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
