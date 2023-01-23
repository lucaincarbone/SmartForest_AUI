<template>
  <div class="controls-box">
    <div id="showbutton" class="showbutton" @click="controlmanager()"><p id="textbutton" class="textbutton">Pick tablet</p></div>
    <div id="remote-container" class="remote-container">
    <div class="remote">
      <div class="status tile">
        <div class="infobox">
          <p class="info">Meteo:{{ meteo }}</p>
          <p class="info">Battery:{{ battery }}</p>
          <p class="info">PV:{{ pv }}</p>
          <p class="info">Clean cons.:{{ cleanCons }}</p>
          <p class="info">Dirty cons.:{{ dirtyCons }}</p></div>
      </div>
        <!-- <div class="cell"><TileControls id="simulation" imageURL="/_nuxt/assets/appliances/bad-weather.png" name="Bad weather"/></div> -->
        <div class="cell"><TileControls id="airconditioner" imageURL="/_nuxt/assets/appliances/air-conditioner.png" name="Air conditioner"/></div>
        <div class="cell"><TileControls id="dehumidifier" imageURL="/_nuxt/assets/appliances/dehumidifier.png" name="Dehumidifier"/></div>
        <div class="cell"><TileControls id="cooker" imageURL="/_nuxt/assets/appliances/cooker.png" name="Induction cooker"/></div>
        <div class="cell"><TileControls id="dishwasher" imageURL="/_nuxt/assets/appliances/dishwasher.png" name="Dishwasher"/></div>
        <div class="cell"><TileControls id="dryer" imageURL="/_nuxt/assets/appliances/dryer.png" name="Clothes dryer"/></div>
        <div class="cell"><TileControls id="boiler" imageURL="/_nuxt/assets/appliances/heater.png" name="Heat boiler"/></div>
        <div class="cell"><TileControls id="oven" imageURL="/_nuxt/assets/appliances/oven.png" name="Oven"/></div>
        <div class="cell"><TileControls id="washingmachine" imageURL="/_nuxt/assets/appliances/washing-machine.png" name="Washing machine"/></div>
    </div>
    <div class="startsimulation-container"><div class="simulation-button" @click="simulate()"><p class="simulatetext">SIMULATE</p></div></div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeControls: false,
      meteo: 0,
      battery: 0,
      pv: 0,
      cleanCons: 0,
      dirtyCons: 0,
    }
  },
  mounted(){
    this.simulate()
  },
  methods: {
    async simulate(){
      console.log("simulating...");
      let response = await fetch("https://smart-home-api-2j4i.onrender.com/home/simulate")
        .then((response) => response.json())
        .then((data)=>{
          this.meteo = data["meteo"];
          this.battery = data["battery"];
          this.pv = data["panel"];
          this.cleanCons = data["greenEnergyTotal"];
          this.dirtyCons = data["notGreenEnergyTotal"];
        });


    },
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
.textbutton{
  font-size: 1em;
  font-weight: 600;
  line-height: 40px;
  color: whitesmoke;
}
.showbutton {
  background: #4e4e4e;
  background: linear-gradient(180deg, #4e4e4e 0%, #000000 100%);
  cursor: pointer;

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
    /* display: flex; */

    opacity: 0;
    pointer-events: none;
}
.remote {
    position: relative;
    width: 600px;
    margin: auto;
    top: 1em;
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

.status {
    height: 140px;
    width: 200px;
    display: flex;
}

.tile {
    height: 100px;
    width: 150px;
    border-radius: 20px;
    background: #FEE140;
    background: linear-gradient(90deg, #FEE140 0%, #FA709A 100%);
    opacity: 90%;


    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    backdrop-filter: blur(6px);
    box-shadow: 3px 3px 5px 1px rgba(0, 0, 0, 0.25);

    /* display: flex; */
}
.info {
  font-size: 0.75em;
  font-weight: 600;
  line-height: 1.25em;
  margin: 0;
  padding: 0;
  color: black;
  text-shadow: 0px 0px 5px rgba(255, 255, 255, 1);
}
.infobox{
  height: fit-content;
  width: 120px;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
}
.startsimulation-container{
  width: 200px;
  height: 55px;
  margin: auto;
  top: 1em;
  bottom: 0;
  display: flex;

}
.simulation-button{
  cursor: pointer;
  width: 150px;
  height: 40px;
  
  margin: auto;
  border-radius: 200px;
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.2);
  background: #4158D0;
  background: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
}
.simulation-button:hover{
  
  background: #0093E9;
  background: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);

}
.simulatetext{
  height: 40px;
  text-align: center;
  margin: auto;
  top: 0;
  bottom: 0;
  line-height: 40px;
  font-size: 1.25em;
  font-weight: 500;
  color: whitesmoke;
  text-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
}

</style>