<template>
  <div class="vd-container floating">
    <div class="vd-flex">
      <div class="vd-grid-container" @click="askMeSomething()">
        <img src="../assets/sirigif.gif" alt="" class="vd-icon"/>
        <div id="reg-detection" class="reg-detection"></div>
        <p id="flora-txt" class="vd-text">{{ runtimeTranscription_ }}</p>
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
      answerFromCA_: "",
      numOfClicks: 0,
      positions: "",
      highlightedTreesIds: [],
      groupTimeoutID: 0,
      firstTextBoxID: 0,
      secondTextBoxID: 0,
    };
  },

  async mounted() {
    this.runtimeTranscription_ = "Tap to ask Flora";
    // this.plantTree(); // fetch to another api to get the JSON
    // this.answerFromCA_ = await $fetch("/api/test", {
    //   method: "get",
    // });
    // If we want to keep updated, we need to refresh also the server. So run again npm run dev.
    const {data: answerFromCA_} = await useFetch("/api/getInitial");
    this.answerFromCA_ = answerFromCA_.value;
    this.updateFrontEnd();
  },
  methods: {
    displayNotifications(notifications) {
      console.log(notifications);
      var index = 1;
      notifications.forEach((notification) => {
        document.getElementById(
            "notification-" + index.toString()
        ).textContent = notification.event;
        document.getElementById("time-" + index.toString()).textContent =
            notification.time;
        if (notification.good) {
          document.getElementById(
              "notification-" + index.toString()
          ).style.color = "green";
        } else {
          document.getElementById(
              "notification-" + index.toString()
          ).style.color = "rgb(200, 0, 0)";
        }
        document.getElementById("cont-" + index.toString()).style.visibility =
            "visible";
        document
            .getElementById("cont-" + index.toString())
            .animate([{opacity: "0%"}, {opacity: "100%"}], {
              duration: 250,
              fill: "forwards",
            });
        index++;
      });
      setTimeout(() => {
        for (var i = 1; i <= 5; i++) {
          document
              .getElementById("cont-" + i.toString())
              .animate([{opacity: "100%"}, {opacity: "0%"}], {
                duration: 250,
                fill: "forwards",
              });
          document.getElementById("cont-" + i.toString()).style.visibility =
              "hidden";
        }
      }, 10000);
    },
    showTreeExperience(tree) {
      let posToSpawn =
          tree._position._x.toString() + "-" + tree._position._y.toString();
      let exp = tree._experience.toString();
      tree = document.getElementById(posToSpawn);
      tree.classList.remove("groupable");
      if (exp > 0 && exp <= 300) {
        tree.classList.add("low-exp");
      } else if (exp > 300 && exp <= 700) {
        tree.classList.add("mid-exp");
      } else if (exp > 700 && exp < 1000) {
        tree.classList.add("high-exp");
      } else if (exp == 1000) {
        tree.classList.add("max-exp");
      }
      setTimeout(() => {
        tree.classList.remove("low-exp");
        tree.classList.remove("mid-exp");
        tree.classList.remove("high-exp");
        tree.classList.remove("max-exp");
      }, 10000);
    },
    async clickEvent(e) {
      let id = e.target.id;
      console.log("click " + id);
      let num = this.numOfClicks;
      console.log(num);
      if (this.numOfClicks < 2) {
        this.positions = this.positions + id + "-";
        this.numOfClicks++;
        return;
      }
      this.positions = this.positions + id;
      console.log("Positions: " + this.positions);
      let answer = await $fetch("/api/click", {
        method: "post",
        body: {id: this.positions},
      });
      this.positions = "";
      this.numOfClicks = 0;
      if (answer.success) {
        this.highlightedTreesIds.forEach((treeID) => {
          let tree = document.getElementById(treeID);
          tree.classList.remove("groupable");
          tree.removeEventListener("click", this.clickEvent);
          this.updateTreesAfterGroup(answer.data);
        });
      } else {
        if (this.groupTimeoutID != null) {
          console.log("removing old timer");
          clearTimeout(this.groupTimeoutID);
        }
        this.groupTimeoutID = setTimeout(this.testTimeout, 30000);
        console.log("group failed");
      }
      this.answerFromCA_ = answer;
      //If group was done succesfully already abort grouping action
      console.log("Setting response");
      this.changeAnswerTextBox();
      /*Write here all methods to be called to control game logic on frontend! */
      this.updateFrontEnd();
      /** */
      await this.play();
    },
    askMeSomething() {
      document.getElementById("reg-detection").style.visibility = "visible";
      // Init Voice Recognition
      window.SpeechRecognition =
          window.SpeechRecognition || window.webkitSpeechRecognition;

      const recognition = new window.SpeechRecognition();
      recognition.lang = this.lang_;
      recognition.interimResults = true;

      // Sentence-Matching Event Triggered
      recognition.addEventListener("result", (event) => {
        this.runtimeTranscription_ = Array.from(event.results)
            .map((result) => result[0])
            .map((result) => result.transcript)
            .join("");
      });
      // End of Sentence Event Triggered
      recognition.addEventListener("end", async () => {
        console.log(this.runtimeTranscription_.toString());
        // FIXME: Uncomment below if you want to capture audio when the user says Flora
        //if (this.runtimeTranscription_.toString().includes("Flora")) {
        this.transcription_.push(this.runtimeTranscription_);
        this.answerFromCA_ = await $fetch("/api/submit", {
          method: "post",
          body: {phrase: this.runtimeTranscription_.toString()},
        });
        //}
        // this.runtimeTranscription_ = "Hello, Flora!";
        // CLICK AND LISTEN, THEN STOP
        recognition.stop();
        document.getElementById("reg-detection").style.visibility = "hidden";
        // ALWAYS LISTENING
        // recognition.start();
        this.changeAnswerTextBox();
        /*Write here all methods to be called to control game logic on frontend! */
        this.updateFrontEnd();
        /** */
        await this.play();
      });
      recognition.start();
    },
    changeAnswerTextBox() {
      document.getElementById("answer-txt").textContent =
          this.answerFromCA_.queryResult.fulfillmentText.toString();
      document.getElementById("answer-container").style.visibility = "visible";
      document.getElementById("answer-container").style.transition = "opacity";
      document
          .getElementById("answer-container")
          .animate([{opacity: "0%"}, {opacity: "100%"}], {
            duration: 500,
            fill: "forwards",
          });
      clearTimeout(this.firstTextBoxID);
      clearTimeout(this.secondTextBoxID);
      this.firstTextBoxID = setTimeout(() => {
        document
            .getElementById("answer-container")
            .animate([{opacity: "100%"}, {opacity: "0%"}], {
              duration: 20000,
              fill: "forwards",
            });
      }, 10000);
      this.secondTextBoxID = setTimeout(() => {
        document.getElementById("answer-container").style.visibility = "hidden";
        document.getElementById("flora-txt").textContent = "Tap to ask Flora";
      }, 30000);
    },
    async play() {
      window.speechSynthesis.cancel();
      var voices = window.speechSynthesis.getVoices();
      var utterThis = new SpeechSynthesisUtterance();
      utterThis.text =
          this.answerFromCA_.queryResult.fulfillmentText.toString();
      utterThis.voice = voices[2];
      utterThis.pitch = 1;
      utterThis.lang = "en";
      window.speechSynthesis.speak(utterThis);
    },
    updateFrontEnd() {
      let self = this;
      // DA QUI SONO NEL JSON DEL SERVER, .trees, .leaves, .experience
      if (this.answerFromCA_.switchOff) {
        document.getElementById("mirror-off").style.visibility = "visible";
        document.getElementById("mirror-off").style.pointerEvents = "all";
      } else {
        if (this.answerFromCA_.notifications != null) {
          this.displayNotifications(this.answerFromCA_.notifications);
        }
        if (this.answerFromCA_.allTrees != null) {
          this.answerFromCA_.allTrees.forEach(function (tree) {
            self.showTreeExperience(tree);
          });
        }
        // document.getElementById("mirror-off").style.visibility = "hidden"
        if (this.answerFromCA_.changes != null) {
          if (this.answerFromCA_.changes.last_notification != null) {
            document.getElementById("tips").textContent = JSON.stringify(this.answerFromCA_.changes.last_notification);
          } else {
            document.getElementById("tips").textContent = "🌱 No new notifications. 🌱";
          }
          if (this.answerFromCA_.changes.hide != null) {
            this.hideTrees(this.answerFromCA_.changes.hide);
          }
          if (this.answerFromCA_.changes.trees != null) {
            console.log("Updating trees...");
            this.plantTree(this.answerFromCA_.changes.trees);
          }
          if (this.answerFromCA_.changes.leaves != null) {
            console.log("Updating leaves...");
            this.updateLeaves(this.answerFromCA_.changes.leaves);
          }
          if (this.answerFromCA_.changes.group != null) {
            this.activateGroup(this.answerFromCA_.changes.group);
          }
        }
      }
    },
    plantTree(trees) {
      this.positions = "";
      this.numOfClicks = 0;
      this.highlightedTreesIds = [];
      trees.forEach((tree) => {
        let posToSpawn =
            tree._position._x.toString() + "-" + tree._position._y.toString();
        let levelToSpawn = "lev" + tree._level.toString();
        tree = document.getElementById(posToSpawn);
        tree.classList.remove("groupable");
        tree.src = "/_nuxt/assets/dynamics/trees/" + levelToSpawn + ".png";
        tree.removeEventListener("click", this.clickEvent);
        tree.animate([{opacity: "0%"}, {opacity: "100%"}], {
          duration: 500,
          fill: "forwards",
        });
      });
    },
    hideTrees(trees) {
      trees.forEach((tree) => {
        let posToSpawn =
            tree._position._x.toString() + "-" + tree._position._y.toString();
        tree = document.getElementById(posToSpawn);
        tree.src = "/_nuxt/assets/dynamics/trees/empty.png";
        tree.classList.remove("groupable");
        tree.removeEventListener("click", this.clickEvent);
      });
    },
    updateLeaves(leaves) {
      let amount = leaves;
      document.getElementById("leaves-num").textContent = amount.toString();
    },
    async testTimeout() {
      //If group was done succesfully already abort grouping action
      if (this.highlightedTreesIds.length > 0) {
        console.log("time has ended");
        this.runtimeTranscription_ = "Exit";
        this.answerFromCA_ = await $fetch("/api/submit", {
          method: "post",
          body: {phrase: this.runtimeTranscription_.toString()},
        });
        this.changeAnswerTextBox();
        /*Write here all methods to be called to control game logic on frontend! */
        this.updateFrontEnd();
        /** */
        await this.play();
      } else console.log("time out but action was completed");
    },
    activateGroup(group) {
      //self is needed as addEventListener changes context and loses this
      var self = this;
      //if a group action started a timer is set for automatic exit if a timer was there replace it
      if (group.length > 0) {
        if (this.groupTimeoutID != null) {
          console.log("removing old timer");
          clearTimeout(this.groupTimeoutID);
        }
        this.groupTimeoutID = setTimeout(this.testTimeout, 30000);
      }
      group.forEach(function (tree) {
        let treeId =
            tree._position._x.toString() + "-" + tree._position._y.toString();
        console.log("activating click for tree: " + treeId);
        self.highlightedTreesIds.push(treeId.toString());
        console.log(self.highlightedTreesIds);
        document.getElementById(treeId).classList.add("groupable");
        document
            .getElementById(treeId)
            .addEventListener("click", self.clickEvent);
      });
    },

    /**
     * Called after a successful tree group
     * Disable click and visual effect on the three grouped trees
     * Then plant the new higher level one
     */
    updateTreesAfterGroup: function (answer) {
      //first remove all 3 plants(also disable click and group highlight)
      answer.removed.forEach((tree) => {
        let posToSpawn =
            tree._position._x.toString() + "-" + tree._position._y.toString();
        tree = document.getElementById(posToSpawn);
        // tree.classList.remove("groupable");
        tree.src = "/_nuxt/assets/dynamics/trees/empty.png";
        //This line removes all event listeners from the tree (It is needed for the end of grouping action)
        //tree.replaceWith(tree.cloneNode(true));
      });
      //then plant the new higher level tree
      this.plantTree(answer.trees);
      if (answer.leaves != null) {
        this.updateLeaves(answer.leaves);
      }

      if (answer.last_notification != null) {
        document.getElementById("tips").textContent = answer.last_notification;
      } else {
        document.getElementById("tips").textContent = "🌱 No new notifications. 🌱";
      }
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

.reg-detection {
  grid-area: regdetection;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: red;
  visibility: hidden;
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
  grid-template-areas: "mic sentence regdetection";
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
  cursor: pointer;
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

.answer-container {
  z-index: 999;
  position: absolute;
  top: 0;
}
</style>
