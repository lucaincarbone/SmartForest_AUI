<script setup>

import Forest from "./components/Forest.vue";
import WeatherWidget from "./components/WeatherWidget.vue";
import VoiceDetectionWidget from "./components/VoiceDetectionWidget.vue";
import Trees from "./components/Trees.vue";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

</script>

<template>
  <div class="bg">
    <div><iframe
    allow="microphone;"
    width="1080"
    height="300"
    z-index="110"
    src="https://console.dialogflow.com/api-client/demo/embedded/9a54017d-1247-4058-86e8-6a41e8212c8f">
</iframe></div>
    <!-- <VoiceDetectionWidget/> -->
    <Trees/>
    <WeatherWidget/>
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
