<template>
  <div id="answer-container" class="answer-container">
    <div class="answer-box">
      <p id="answer-txt" class="answer-txt">{{ answerFromCA_ }}</p>
    </div>
    <div class="button" @click="closeAnswerBox()"><p class="ok">OK</p></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      answerFromCA_: "",
    };
  },
  mounted() {},
  methods: {
    closeAnswerBox() {
      document.getElementById('answer-container').style.visibility = 'hidden';
      document.getElementById('flora-txt').textContent = 'Tap to ask Flora'
    }
  }
};
</script>

<style scoped>
.answer-container {
  margin: 5em 0;
  visibility: hidden;
}

.answer-box {
  background: white;
  display: flex;
  height: 200px;
  width: 800px;
  margin: auto;
  top: 0;
  bottom: 0;
  border-radius: 50px;
}
.answer-txt {
  padding: 1em;
  margin: auto;
  top: 0;
  bottom: 0;
  font-size: 1em;
  color: black;
}
.button {
  background: green;
  width: 150px;
  height: 50px;
  margin: 1em auto;
  top: 0;
  bottom: 0;
  border-radius: 100px;
  align-items: center;
}
.ok {
  text-align: center;
  font-size: 1.2em;
  font-weight: 600;
  color: white;
  line-height: 50px;
}
p {
  margin-bottom: 0;
}
</style>
