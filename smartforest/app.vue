<script>
import Forest from "./components/Forest.vue";
import WeatherWidget from "./components/WeatherWidget.vue";
import VoiceDetectionWidget from "./components/VoiceDetectionWidget.vue";
import Trees from "./components/Trees.vue";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
</script>

<template>
  
  <div class="bg">
    <AnswerBox/>
    <!-- <VoiceDetectionWidget/> -->
    <Trees/>
    <!-- <WeatherWidget/> -->
    <Forest />
  </div>
</template>

<style scoped>
.bg {
  background-color: black;
  width: 1080px;
  height: 1920px;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
}
iframe {
  position: absolute;
  top: 0;
}
</style>
