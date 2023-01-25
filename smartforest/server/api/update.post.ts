import { Model } from "../Model";

let model = Model.Instance

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    let currentGrade:number = body.currentGrade
    let totalGrade:number = body.totalGrade
    console.log("total: "+totalGrade);
    console.log("current: "+currentGrade);
    model.updateGameStateGrade(totalGrade,currentGrade)
    let answer = model.JsonWithChanges
    model.ResetJsonWithChanges();
    return answer
})
