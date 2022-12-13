<template>
  <div class="counter-container">
    <div class="grid-container">
        <div class="img-container">
            <img src="../assets/dynamics/leaf.png" alt="" class="leaf-img">
        </div>
        <p id="leaves-num" class="leaves-num"></p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.counter-container {
    position: absolute;
    width: 1080px;
}
.grid-container {
    position: relative;
    display: grid;
    background-color: white;
    border-top-left-radius: 10em;
    border-bottom-left-radius: 10em;
    width: 210px;
    height: 100px;
    margin-left: auto;
    margin-right: 0;
    margin-bottom: 40px;

    grid-template-areas: 
    "img num";
    column-gap: 0em;
    row-gap: 0;
}

.leaf-img {
    height: 100px;
    width: auto;
    margin: auto;
    padding: 0;
    left: 0;
    right: 0;

}
.leaves-num {
    grid-area: num;
    padding: 0;
    margin: auto;
    font-size: 2.5em;
    font-weight: 600;
}
.img-container {
    display: flex;
    grid-area: img;
    width: 30px;
}


</style>