import { Model } from "../Model";
import { Position } from "../Position";
import {Machine} from "../state_machine/Machine"

const machine = Machine.Instance;

let model = Model.Instance
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    let id: string = body.id;
    let splitted = id.split("-", 6); 
    console.log(splitted)
    let pos1 = new Position(+splitted[0],+splitted[1])
    let pos2 = new Position(+splitted[2],+splitted[3])
    let pos3 = new Position(+splitted[4],+splitted[5])
    if(model.groupTrees([pos1,pos2,pos3])){
        let answer = model.JsonWithChanges
        model.ResetJsonWithChanges()
        await machine.prepareResponse("!Grouping succesfull!")
        return answer
    }
    let answer = model.JsonWithChanges
    model.ResetJsonWithChanges()
    return answer;
})
