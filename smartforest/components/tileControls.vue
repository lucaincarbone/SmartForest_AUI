<template>
  <div class="container">
    <div :id="id" class="tile" @click="toggleSwitch(id)">
        <img class="img" :src="imageURL" alt="">
        <p class="name">{{ name }}</p>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            isOn: false,
        }
    },
    mounted(){
        this.initialize(this.id)
    },
    props: {
        imageURL: String,
        name: String,
        id: String

    },
    methods: {
        initialize(id){
            fetch("https://smart-home-api-2j4i.onrender.com/appliances/name=" + id)
                .then((response) => response.json())
                .then((data)=>{
                    this.isOn = data["isOn"];
                    if(this.isOn) document.getElementById(id).style.background = "rgba(0, 200, 255, 0.7)";
                    else document.getElementById(id).style.background = "rgba(255, 255, 255, 0.70)";
                });
        },
        toggleSwitch(id){
            if(this.isOn){
                this.switchOff(id);
                this.isOn=!this.isOn;
            }
            else {
                this.switchOn(id);
                this.isOn=!this.isOn;
            }
        },
        switchOn(id){
            console.log("Switching ON " + id)
            document.getElementById(id).style.background = "rgba(0, 200, 255, 0.7)";
            fetch("https://smart-home-api-2j4i.onrender.com/appliances/turnOn/name=" + id);
        },
        switchOff(id){
            console.log("Switching OFF " + id)
            document.getElementById(id).style.background = "rgba(255, 255, 255, 0.70)";
            fetch("https://smart-home-api-2j4i.onrender.com/appliances/turnOff/name=" + id);
        }
    }
}
</script>

<style scoped>
.container {
    height: 140px;
    width: 200px;
    display: flex;
}
.tile {
    height: 100px;
    width: 150px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.6);
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    backdrop-filter: blur(6px);
    box-shadow: 3px 3px 5px 1px rgba(0, 0, 0, 0.25);

    display: grid;
}

.tile:hover{
    transition: width 0.1s ease-in-out, height 0.1s ease-in-out;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    width: 160px;
    height: 110px;
    cursor: pointer;
}
.img {
    padding: 0.3em;
    width: 60px;
    height: 60px;
    margin: auto;
    left: 0;
    right: 0;
}

.name {
    margin: auto;
    left: 0;
    right: 0;
    text-align: center;

    font-size: 0.9em;
    font-weight: 700;
}
</style>