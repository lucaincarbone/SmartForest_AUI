<template>
  <div>
    <div class="container">
      <img src="../assets/CLOUDS.png" alt="" class="clouds floating-clouds" />
      <img class="ground" src="../assets/GROUND.png" alt="" />
      <img class="base floating-base" src="../assets/LINES_BASE.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.container {
  position: relative;
  height: 1000px;
  width: 1080px;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;

  background: rgb(0, 170, 255);
  background: linear-gradient(
    180deg,
    rgba(0, 170, 255, 1) 0%,
    rgba(0, 192, 255, 1) 23%,
    rgba(159, 241, 255, 1) 49%,
    rgba(255, 255, 255, 1) 100%
  );
  border-top-left-radius: 200px;
  border-top-right-radius: 200px;
}
.ground {
  position: absolute;
  width: 1080px;
  bottom: 0;
}
.base {
  position: relative;
  justify-content: center;
  display: flex;
  width: 1000px;
  margin: 0 auto;
  bottom: 7em;
}
.clouds {
  position: absolute;
  z-index: 100;
  width: 1080px;
  margin-bottom: 17em;
}

.floating-base {
  animation-name: floating-base;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  margin-top: 5px;
}

@keyframes floating-base {
  0% {
    transform: translate(0, 0px);
  }
  50% {
    transform: translate(0, 10px);
  }
  100% {
    transform: translate(0, -0px);
  }
}
.floating-clouds {
  animation-name: floating-clouds;
  animation-duration: 5s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  /* margin-left: 30px; */
  margin-top: 5px;
}

@keyframes floating-clouds {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(20px, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>
