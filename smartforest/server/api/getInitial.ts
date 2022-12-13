import { Model } from "../Model";

let model = Model.Instance
export default defineEventHandler(() => {
    let answer ={changes:""}
    answer.changes=model.initialBoardJson
    return answer;
})

function GenerateRandomJson() {
    return{ changes:{
        leaves: 140,
        globalExperience: 69,
        trees: [
          {
            _position: {
              _x: 1,
              _y: 1
            },
            _level: 1,
            experience: 50
          }
        ]
      }
    }
}

  