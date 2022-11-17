<template>
  <div class="vd-container">
    <div class="vd-box">
      <img src="../assets/sirigif.gif" alt="" class="vd-icon" />
      <p class="vd-text">Hey, Forest!</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.vd-container {
  /* width: 1080px; */
  position: absolute;
  z-index: 101;
  margin: auto;
  width: 1080px;
  bottom: 910px;
}
.vd-box {
  background-color: white;
  border-radius: 100px;
  max-width: 300px;
  height: 50px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.296);
}
.vd-text {
  color: black;
  text-align: left;
  font-size: 1.2em;
  font-weight: 600;
  display: inline-flex;
}
.vd-icon {
  height: 40px;
  width: auto;
  margin: auto;
  border-radius: 1000px;
  display: inline-flex;
}
</style>
