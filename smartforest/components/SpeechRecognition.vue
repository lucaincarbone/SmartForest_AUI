<template>
  <div class="voice">
    <div class="speech-to-txt" @click="startSpeechToTxt">START</div>
    <p>{{ transcription_ }}</p>
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
  methods: {
    startSpeechToTxt() {
        console.log("STARTING...");
      // initialisation of voicereco

      window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new window.SpeechRecognition();
      recognition.lang = this.lang_;
      recognition.interimResults = true;

      // event current voice reco word
      recognition.addEventListener("result", (event) => {
        var text = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        this.runtimeTranscription_ = text;
      });
      // end of transcription
      recognition.addEventListener("end", () => {
        if(this.runtimeTranscription_.toString().includes("hello")){
            this.transcription_.push(this.runtimeTranscription_);
            $fetch('/api/submit', { method: 'post', body: { phrase: this.runtimeTranscription_.toString() } })

        }
        this.runtimeTranscription_ = "";
        // CLICK AND LISTEN, THEN STOP
        // recognition.stop();
        // ALWAYS LISTENING
        recognition.start();
      });
      recognition.start();
    },
  },
};
</script>

<style scoped>
 .voice {
    background: white;
    padding: 1em;
}
.speech-to-txt {
    background: green;
}

</style>
