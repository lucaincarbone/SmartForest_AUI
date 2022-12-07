<template>
  <div class="vd-container floating">
    <div class="vd-flex">
      <div class="vd-grid-container">
        <img src="../assets/sirigif.gif" @click="askMeSomething()" alt="" class="vd-icon"/>
        <p class="vd-text">{{runtimeTranscription_}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "speech_to_text",
  data() {
    return {
      runtimeTranscription_: "",
      transcription_: [],
      lang_: "en-US",
    };
  },
  mounted() {
    this.runtimeTranscription_ = "Tap to ask Flora"
  },
  methods: {
    askMeSomething() {

      // Init Voice Recognition
      window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new window.SpeechRecognition();
      recognition.lang = this.lang_;
      recognition.interimResults = true;

      // Sentence-Matching Event Triggered
      recognition.addEventListener("result", (event) => {
        var text = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        this.runtimeTranscription_ = text;
      });
      // End of Sentence Event Triggered
      recognition.addEventListener("end", () => {
        console.log(this.runtimeTranscription_.toString());
        if(this.runtimeTranscription_.toString().includes("flora")){
            this.transcription_.push(this.runtimeTranscription_);
            $fetch('/api/submit', { method: 'post', body: { phrase: this.runtimeTranscription_.toString() } })

        }
        // this.runtimeTranscription_ = "Hello, Flora!";
        // CLICK AND LISTEN, THEN STOP
        recognition.stop();
        // ALWAYS LISTENING
        // recognition.start();
      });
      recognition.start();
    },
  },
};

</script>

<style scoped>
.vd-container {
  position: absolute;
  z-index: 999;
  justify-content: center;
  top: 2em;
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

.vd-runtime {
  grid-area: response;
}
.vd-grid-container {
  position: relative;
  display: inline-grid;
  grid-template-areas: 
  "mic sentence";
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

.floating {
  animation-name: floating;
  animation-duration: 5s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  margin-top: 5px;
}

@keyframes floating {
  0% {
    transform: translate(0, 0px);
  }
  50% {
    transform: translate(0, 3px);
  }
  100% {
    transform: translate(0, -0px);
  }
}
</style>
