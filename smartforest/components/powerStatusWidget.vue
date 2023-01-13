<template>
  <div class="psw-container">
    <div class="psw-widget">
      <!-- <p class="title">You are going great!</p> -->
      <img src="../assets/dynamics/power.webp" alt="" class="image" />
      <div class="current">
        <div class="status">
            <div id="circle" class="circle" @click="toggleCircle(50)"></div>
        </div>
      </div>
    </div>
    <div class="energytips">
        <p class="tips">You are doing great!</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toggleCircle(value){
      var normalized = (value*270)/100
      console.log("Circle toggled");
      var circle = document.getElementById("circle");
      var id = setInterval(frame, 5);
      var percentage = 0;

      function frame() {
        if (percentage == normalized) {
          clearInterval(id);
        } else {
          percentage++
          circle.style.left = percentage + "px";
        }
      }
    }
  }
};
</script>

<style scoped>
.psw-container {
  z-index: 120;
  position: absolute;
  left: 60px;
}
.psw-widget {
  position: relative;
  background: white;
  width: 400px;
  height: 60px;
  border-radius: 80px;

  bottom: 40px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  display: grid;
  grid-template-areas:
    "image current current current"
    "image current current current"
    "image current current current"
    "image current current current";
}

.circle {
    /* background: black; */
    border: 3px;
    border-color: black;
    border-style: solid;
    height: 20px;
    width: 30px;
    border-radius: 100px;
    position: relative;
    padding: 0;
    font-size: 1.5em;
    left: 0px;
}

.image {
  margin: auto;
  grid-area: image;
  height: 40px;
  left: 0;
  right: 0;
  background-color: greenyellow;
  border-radius: 100px;
}
.title {
  text-align: center;
}
.current {
  grid-area: current;
  margin: auto;
  bottom: 0;
}

p {
  padding: 0;
  margin: 0;
}
.status {
  width: 300px;
  height: 20px;

  background: rgb(255, 0, 0);
  background: linear-gradient(
    90deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 172, 0, 1) 40%,
    rgba(251, 255, 0, 1) 70%,
    rgba(7, 255, 0, 1) 100%
  );
  border-radius: 100px;
  /* border-color: black;
  border: 1px;
  border-style: solid; */
}

.energytips {
    position: relative;
    width: 400px;
    /* height: 120px; */
    bottom: 30px;
    background: white;
    border-radius: 40px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}

.tips {
    font-size: 1em;
    padding: 1em;
    margin: auto;
    bottom: 0;
    top: 0;
    font-weight: 300;
    /* height: 120px; */
}
</style>
