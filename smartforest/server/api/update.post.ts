import {Machine} from "../state_machine/Machine"
const machine = Machine.Instance;

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    let currentGrade:number = body.currentGrade
    let totalGrade:number = body.totalGrade
    console.log("total: "+totalGrade);
    console.log("current: "+currentGrade);
    return machine.updateGameStateGrade(totalGrade,currentGrade)
})
