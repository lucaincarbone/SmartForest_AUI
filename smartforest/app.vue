<script setup>

import Forest from "./components/Forest.vue";
import WidgetWeather from "./components/WidgetWeather.vue";
import VoiceDetectionWidget from "./components/VoiceDetectionWidget.vue";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

</script>

<template>
  <div class="bg">
    <VoiceDetectionWidget/>
    <WidgetWeather/>
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
</style>
