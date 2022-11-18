<template>
  <div class="tree-container">
    <img src="../assets/dynamics/lev2.png" alt="" class="tree floating-base pos_1_1">
    <img src="../assets/dynamics/lev1.png" alt="" class="tree floating-base pos_1_2">
    <img src="../assets/dynamics/lev3.png" alt="" class="tree floating-base pos_1_3">
    <img src="../assets/dynamics/lev3.png" alt="" class="tree floating-base pos_1_4">
    <img src="../assets/dynamics/lev1.png" alt="" class="tree floating-base pos_1_5">
    <img src="../assets/dynamics/lev2.png" alt="" class="tree floating-base pos_1_6">
    <img src="../assets/dynamics/lev3.png" alt="" class="tree floating-base pos_6_1">
    <img src="../assets/dynamics/lev2.png" alt="" class="tree floating-base pos_6_2">
    <img src="../assets/dynamics/lev1.png" alt="" class="tree floating-base pos_6_3">
    <img src="../assets/dynamics/lev3.png" alt="" class="tree floating-base pos_6_4">
    <img src="../assets/dynamics/lev3.png" alt="" class="tree floating-base pos_6_5">
    <img src="../assets/dynamics/lev2.png" alt="" class="tree floating-base pos_6_6">
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.tree-container {
    width: 1080px;
    height: 1920px;
    position: absolute;
}
.tree {
    position: absolute;
    height: 100px;
    width: auto;
    z-index: 103;
    display: flex;
    filter: drop-shadow(2px 0px 1px rgba(34, 34, 34, 0.7));
}

.pos_1_1 {
    bottom: 500px;
    left: 100px;
}
.pos_1_2 {
    bottom: 545px;
    left: 180px;
}
.pos_1_3 {
    bottom: 590px;
    left: 260px;
}
.pos_1_4 {
    bottom: 635px;
    left: 340px;
}
.pos_1_5 {
    bottom: 680px;
    left: 420px;
}
.pos_1_6 {
    bottom: 725px;
    left: 500px;
}

.pos_6_1 {
    bottom: 265px; /*-235px*/
    left: 490px; /*+390px */
}
.pos_6_2 {
    bottom: 310px;
    left: 570px;
}
.pos_6_3 {
    bottom: 355px;
    left: 650px;
}
.pos_6_4 {
    bottom: 400px;
    left: 730px;
}
.pos_6_5 {
    bottom: 445px;
    left: 810px;
}
.pos_6_6 {
    bottom: 490px;
    left: 890px;
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

</style>