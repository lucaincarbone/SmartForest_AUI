<template>
  <div class="controls-box">
    <div id="showbutton" class="showbutton" @click="controlmanager()"><p id="textbutton" class="textbutton">Pick tablet</p></div>
    <div id="remote-container" class="remote-container">
    <div class="remote">
        <div class="cell"><TileControls id="weather" imageURL="/_nuxt/assets/appliances/bad-weather.png" name="Bad weather"/></div>
        <div class="cell"><TileControls id="airconditioner" imageURL="/_nuxt/assets/appliances/air-conditioner.png" name="Air conditioner"/></div>
        <div class="cell"><TileControls id="coffee" imageURL="/_nuxt/assets/appliances/coffee-machine.png" name="Coffee machine"/></div>
        <div class="cell"><TileControls id="cooker" imageURL="/_nuxt/assets/appliances/cooker.png" name="Induction cooker"/></div>
        <div class="cell"><TileControls id="dishwasher" imageURL="/_nuxt/assets/appliances/dishwasher.png" name="Dishwasher"/></div>
        <div class="cell"><TileControls id="dryer" imageURL="/_nuxt/assets/appliances/dryer.png" name="Clothes dryer"/></div>
        <div class="cell"><TileControls id="boiler" imageURL="/_nuxt/assets/appliances/heater.png" name="Heat boiler"/></div>
        <div class="cell"><TileControls id="oven" imageURL="/_nuxt/assets/appliances/oven.png" name="Oven"/></div>
        <div class="cell"><TileControls id="wahsingmachine" imageURL="/_nuxt/assets/appliances/washing-machine.png" name="Washing machine"/></div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeControls: true,
    }
  },
  methods: {
    hideControls() {
      console.log("Hiding contorls...");
      document.getElementById("textbutton").innerText = "Pick tablet";

      var tablet = document.getElementById("remote-container");

      var id = setInterval(frame, 5);
      var percentage = 100;

      function frame() {
        if (percentage == 0) {
          tablet.style.pointerEvents = "none";
          clearInterval(id);
        } else {
          percentage--
          tablet.style.opacity = percentage + "%";
        }
      }
      this.activeControls = false;
    },
    showControls() {
      console.log("Showing contorls...");
      document.getElementById("textbutton").innerText = "Hide tablet";

      var tablet = document.getElementById("remote-container");

      var id = setInterval(frame, 5);
      var percentage = 0;

      function frame() {
        if (percentage == 100) {
          tablet.style.pointerEvents = "all";
          clearInterval(id);
        } else {
          percentage++
          tablet.style.opacity = percentage + "%";
        }
      }
      this.activeControls = true;
    },
    controlmanager() {
      if(this.activeControls){
        this.hideControls();
      } else {
        this.showControls();
      }
    }
  }
}
</script>

<style scoped>
p{
  font-size: 1em;
  font-weight: 600;
  line-height: 40px;
  color: black;
}
.showbutton {
  background-color: white;
  border-radius: 20px;
  width: 140px;
  height: 40px;
  margin: auto;
  left: 0;
  right: 0;
  text-align: center;
  align-content: center;
  padding: 0;
}
.controls-box {
  position: absolute;
  z-index: 100;
  width: 1080px;
  top: 0;
  padding-top: 1em;
}

.remote-container {
    position: relative;
    z-index: 100;
    width: 650px;
    height: 500px;
    margin: auto;
    background-image: url("../assets/appliances/tablet.png");
    background-size:cover;
    display: flex;
}
.remote {
    position: relative;
    /* width: 500px; */
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: grid;

    /* gap: 1em; */
    grid-template-columns: 1fr 1fr 1fr;
}

.cell {
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

</style>