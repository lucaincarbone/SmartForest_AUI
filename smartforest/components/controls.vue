<template>
  <div>
    <div class="remote-container">
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

}
</script>

<style scoped>

.remote-container {
    position: absolute;
    z-index: 100;
    width: 650px;
    height: 500px;
    margin: auto;
    top: 3em;
    left: 0;
    right: 0;
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