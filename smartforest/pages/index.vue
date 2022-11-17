<template>
  <div class="bg">
    <VoiceDetectionWidget/>
    <WidgetWeather/>
    <Forest />
  </div>
</template>

<script>
import Forest from "./components/Forest.vue";
import WidgetWeather from "./components/WidgetWeather.vue";
import VoiceDetectionWidget from "./components/VoiceDetectionWidget.vue";

export default {
  name: 'IndexPage'
}
</script>

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
