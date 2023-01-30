<template>
  <div id="rules-container" class="rules-container">
    <div class="rules-box">
        <img src="../assets/dynamics/other/rules.png" alt="">
        <div class="button" @click="hideRules()">Close</div>
    </div>
  </div>
</template>

<script>
export default {
    methods: {
        hideRules() {
      document.getElementById("rules-container").style.visibility = "hidden";
    }
    }
}
</script>

<style scoped>
.rules-container {
    position: absolute;
    width: 1080px;
    height: 1920px;
    visibility: hidden;
    z-index: 1000;
}
.rules-box {
    position: relative;
    /* height: 960px; */
    width: 800px;
    margin: auto;
    top: 150px;
    bottom: 0;
    /* background-color: blue; */
}
img {
object-fit: fill;
/* height: 960px; */
width: 800px;
}
.button {
    width: 150px;
    height: 50px;
    background-color: rgb(197, 0, 0);
    margin: auto;
    border-radius: 100px;
    text-align: center;
  line-height: 50px;
  font-size: 1.5em;
  font-weight: 400;
  color: white;
  /* border: 1px solid grey; */
  cursor: pointer;
  box-shadow: 3px 3px 5px 1px rgba(0, 0, 0, 0.25);
}
</style>