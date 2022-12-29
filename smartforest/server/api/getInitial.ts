import { Model } from "../Model";

let model = Model.Instance
export default defineEventHandler(() => {
    let answer ={changes:""}
    answer.changes=model.initialBoardJson
    return answer;
})


  