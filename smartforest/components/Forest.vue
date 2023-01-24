<template>
  <div>
    <div id="bg" class="forest-container">
      <VoiceDetectionWidget/>
      <img id="cloudsId" src="../assets/dynamics/clouds/clouds_happy.png" alt="" class="clouds floating-clouds"/>
      <img class="ground" src="../assets/GROUND.png" alt=""/>
      <img class="base floating-base" src="../assets/LINES_BASE.png" alt=""/>
      <!-- <div class="experience-bar">
        <p id="currentnum" class="experience-text"></p>
        <div id="current" class="current-bar">
        </div>
      </div> -->
      <LeavesCounter/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      percentage: 0,
      isSunny: true, // USELESS VALUE
    };
  },


  //TODO remove this test api interaction
  async setup() {
    // const { data: testData } = await useFetch('/api/state')
    // console.log(testData.value.title);
  },


  methods: {
    loadBar: function () {
      var div = document.getElementById("current");
      if (this.percentage == 200) {
        this.percentage = 0;
      } else {
        this.percentage += 10;
      }

      if (this.percentage <= 75) {
        div.style.backgroundColor = "red";
      } else if (this.percentage <= 150 && this.percentage > 75) {
        div.style.backgroundColor = "yellow";
      } else if (this.percentage <= 200 && this.percentage > 150) {
        div.style.backgroundColor = "rgb(0, 183, 0)";
      }
      div.style.width = this.percentage + "px";
      document.getElementById("currentnum").textContent = this.percentage / 2 + "/100";
    },
    changeBackground: function() { // DO NOT CALL THIS FUNCTION, IT IS USELESS RIGHT HERE
      var bg = document.getElementById("bg");
      var clouds = document.getElementById("cloudsId");
      // FROM STORMY TO SUNNY
      if(!this.isSunny) {
        clouds.src = "/_nuxt/assets/dynamics/clouds/clouds_happy.png";
        clouds.style.width = "800px";
        bg.style.background = `linear-gradient(
      180deg,
      rgba(0, 170, 255, 1) 0%,
      rgba(0, 192, 255, 1) 23%,
      rgba(159, 241, 255, 1) 49%,
      rgba(255, 255, 255, 1) 100%` 
      }
      // FROM SUNNY TO STORMY
      else {
        clouds.src = "/_nuxt/assets/dynamics/clouds/clouds_sad.png";
        clouds.style.width = "700px";
        bg.style.background = `linear-gradient(
      180deg,
      rgb(255, 106, 0) 0%,
      rgb(209, 133, 1) 23%,
      rgb(255, 218, 159) 49%,
      rgba(255, 255, 255, 1) 100%)` 
      }
      this.isSunny = !this.isSunny;
    }
  },
  mounted() {
  },
};
</script>

<style scoped>
.forest-container {
  position: relative;
  height: 1000px;
  width: 1080px;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;

  /* background: rgb(0, 170, 255); */
  background: linear-gradient(
      180deg,
      rgba(0, 170, 255, 1) 0%,
      rgba(0, 192, 255, 1) 23%,
      rgba(159, 241, 255, 1) 49%,
      rgba(255, 255, 255, 1) 100%
  );
  /* background: linear-gradient(
      180deg,
      rgb(255, 106, 0) 0%,
      rgb(209, 133, 1) 23%,
      rgb(255, 218, 159) 49%,
      rgba(255, 255, 255, 1) 100%
  ); */
  border-top-left-radius: 200px;
  border-top-right-radius: 200px;
}

.ground {
  position: absolute;
  width: 1080px;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
}

.base {
  position: relative;
  justify-content: center;
  display: flex;
  width: 1000px;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: 7em;
}

.clouds {
  position: absolute;
  z-index: 100;
  height: auto;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 800px;
  bottom: 25em;
}

.floating-base {
  animation-name: floating-base;
  animation-duration: 20s;
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
  animation-duration: 20s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
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

.experience-bar {
  position: absolute;
  background-color: white;
  width: 200px;
  height: 30px;
  border-radius: 1em;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: 80px;
}

.current-bar {
  position: absolute;
  /* background-color: rgb(0, 183, 0); */
  /* width: 187px; */
  max-width: 200px;
  height: 30px;
  border-radius: 1em;
  left: 0;
  right: 0;
  bottom: 0;
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
}

.experience-text {
  position: absolute;
  text-align: center;
  left: 0;
  right: 0;
  margin: auto 0;
  line-height: 30px;
  font-weight: 3em;
  color: black;
  z-index: 102;
  font-weight: 600;
}
</style>
