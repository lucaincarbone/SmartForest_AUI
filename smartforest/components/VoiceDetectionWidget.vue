<template>
  <div class="vd-container">
    <div class="vd-flex">
      <div class="vd-grid-container">
        <img src="../assets/sirigif.gif" alt="" class="vd-icon" />
        <p class="vd-text">Hey, Forest!</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.vd-container {
  position: absolute;
  z-index: 101;
  justify-content: center;
  bottom: 910px;
  width: 1080px;
}

.vd-text {
  color: black;
  text-align: left;
  font-size: 1.2em;
  font-weight: 600;
  margin: auto;
  top: 0;
  bottom: 0;
  grid-area: sentence;
}
.vd-icon {
  height: 40px;
  margin: auto;
  top: 0;
  bottom: 0;
  border-radius: 1000px;
  grid-area: mic;
}
.vd-grid-container {
  position: relative;
  display: inline-grid;
  grid-template-areas: "mic sentence";
  column-gap: 1em;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 100px;
  background-color: white;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.296);
  padding: 0.5em 1em;
  left: 0;
  right: 0;
  margin: 0 auto;
}
.vd-flex {
  display: flex;
}
</style>
